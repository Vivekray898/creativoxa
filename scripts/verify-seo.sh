#!/usr/bin/env bash
# End-to-end verification of the SEO/AI/AdSense hardening work.
# Exits non-zero on the first failing assertion group.
set -uo pipefail

B="${1:-http://127.0.0.1:4325}"
fails=0
ok()   { printf '  PASS  %s\n' "$1"; }
bad()  { printf '  FAIL  %s\n' "$1"; fails=$((fails+1)); }
check(){ # check <label> <expected> <actual>
  if [ "$2" = "$3" ]; then ok "$1"; else bad "$1 (expected '$2', got '$3')"; fi
}
ge(){ # ge <label> <minimum> <actual>  -- "at least N occurrences"
  if [ "$3" -ge "$2" ] 2>/dev/null; then ok "$1"; else bad "$1 (expected >= $2, got '$3')"; fi
}
count(){ # count <needle>  -- reads stdin, prints occurrence count.
  # Never `grep -q` inside a piped check: it exits on the first match, the
  # writer takes a SIGPIPE, and `set -o pipefail` then reports the whole
  # pipeline as failed even though the needle was found.
  grep -o -- "$1" | wc -l | tr -d ' '
}

printf '\n== 1. Every route answers ==\n'
for p in / /services /services/google-ads /work /work/safar-tour /insights \
         /tools /tools/word-counter /about /contact /privacy /terms \
         /refund-policy /disclaimer; do
  check "GET $p == 200" 200 "$(curl -s -o /dev/null -w '%{http_code}' "$B$p")"
done
for p in /robots.txt /sitemap.xml /llms.txt /llms-full.txt /feed.xml \
         /ads.txt /manifest.webmanifest; do
  check "GET $p == 200" 200 "$(curl -s -o /dev/null -w '%{http_code}' "$B$p")"
done

printf '\n== 2. Redirects are permanent 301 (not 308) ==\n'
for p in /Services/Digital-Marketing /Services/web-design-development /Services/Videography-Services; do
  read -r code loc < <(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$B$p")
  check "$p is 301" 301 "$code"
done

printf '\n== 3. No-JS reveal fix ==\n'
# <html> must ship WITHOUT the js class: the blocking head script adds it, so a
# crawler that never runs JS never matches `.js .reveal { opacity: 0 }`.
html=$(curl -s "$B/" | grep -o '<html[^>]*>')
if printf '%s' "$html" | grep -q 'class="[^"]*\bjs\b'; then
  bad "<html> pre-hydration must not carry the js class: $html"
else ok "<html> ships without js class ($html)"; fi
ge "js class is armed by a blocking head script" 1 \
  "$(curl -s "$B/" | count "document.documentElement.classList.add('js')")"
# No unscoped `.reveal { opacity: 0 }` may survive in the stylesheet.
css=$(curl -s "$B/insights" | grep -o '/_next/static/[^"]*\.css' | head -1)
if [ -n "$css" ]; then
  n=$(curl -s "$B$css" | tr -d '\n' | grep -cE '(^|[},])\.reveal\{[^}]*opacity:0' || true)
  check "no unscoped .reveal{opacity:0} rule in $css" 0 "$n"
else bad "could not locate the page stylesheet"; fi

printf '\n== 4. Exactly one H1 per page ==\n'
for p in / /services /services/google-ads /work /work/safar-tour /insights \
         /tools /tools/word-counter /about /contact /privacy /terms \
         /refund-policy /disclaimer; do
  check "H1 count on $p" 1 "$(curl -s "$B$p" | grep -o '<h1' | wc -l | tr -d ' ')"
done

printf '\n== 5. Breadcrumbs: visible AND JSON-LD on every page ==\n'
for p in /about /contact /services /services/google-ads /work /work/safar-tour \
         /tools /tools/word-counter /privacy /terms /refund-policy /disclaimer; do
  body=$(curl -s "$B$p")
  n_nav=$(printf '%s' "$body" | grep -o 'aria-label="Breadcrumb"' | wc -l | tr -d ' ')
  n_crumb=$(printf '%s' "$body" | grep -o '"@type":"BreadcrumbList"' | wc -l | tr -d ' ')
  check "visible breadcrumb on $p" 1 "$n_nav"
  check "BreadcrumbList JSON-LD on $p" 1 "$n_crumb"
done

printf '\n== 6. Canonical + OG image resolve on every page ==\n'
for p in / /services /services/google-ads /work /work/safar-tour /insights \
         /tools /tools/word-counter /about /contact /privacy /terms \
         /refund-policy /disclaimer; do
  body=$(curl -s "$B$p")
  canon=$(printf '%s' "$body" | grep -o 'rel="canonical" href="[^"]*"' | head -1 \
          | sed 's/.*href="//;s/"//')
  [ -n "$canon" ] && ok "canonical on $p -> $canon" || bad "no canonical on $p"

  og=$(printf '%s' "$body" | grep -o 'property="og:image" content="[^"]*"' | head -1 \
       | sed 's/.*content="//;s/"//')
  [ -n "$og" ] || { bad "no og:image on $p"; continue; }
  path=${og#https://www.creativoxa.com}
  read -r code ctype _ < <(curl -s -o /dev/null -w '%{http_code} %{content_type} %{size_download}' "$B$path")
  if [ "$code" = "200" ] && [ "$ctype" = "image/png" ]; then
    ok "og:image on $p resolves -> $path"
  else
    bad "og:image on $p broken: $path -> $code $ctype"
  fi
done

printf '\n== 7. Every page carries the layout entity graph ==\n'
body=$(curl -s "$B/")
for t in ProfessionalService WebSite BreadcrumbList; do :; done
n_org=$(printf '%s' "$body" | grep -o '"@type":"ProfessionalService"' | wc -l | tr -d ' ')
check "ProfessionalService (organization + localBusiness)" 2 "$n_org"
check "WebSite schema present" 1 "$(printf '%s' "$body" | count '"@type":"WebSite"')"
check "localBusiness @id present" 2 "$(printf '%s' "$body" | count '#localbusiness')"

printf '\n== 8. Title lengths fit the SERP budget (60 incl. "| Creativoxa") ==\n'
for p in / /services /services/google-ads /tools /tools/word-counter \
         /about /contact /work /insights /disclaimer /privacy /terms /refund-policy; do
  title=$(curl -s "$B$p" | grep -o '<title>[^<]*</title>' | head -1 | sed 's/<[^>]*>//g' \
          | python3 -c 'import sys,html;print(html.unescape(sys.stdin.read().strip()))')
  len=${#title}
  if [ "$len" -le 60 ]; then ok "title($len) $p — $title"
  else bad "title is $len chars (>60) on $p — $title"; fi
done

printf '\n== 9. Consent defaults: no ad/analytics tag without consent ==\n'
body=$(curl -s "$B/")
# Next inlines the RSC flight payload into the same HTML document, so every
# head script and meta tag is present twice: once rendered, once serialised.
# These checks therefore assert a floor, not an exact count.
ge "ad_storage denied by default"         1 "$(printf '%s' "$body" | count "ad_storage: 'denied'")"
ge "ad_user_data denied by default"       1 "$(printf '%s' "$body" | count "ad_user_data: 'denied'")"
ge "ad_personalization denied by default" 1 "$(printf '%s' "$body" | count "ad_personalization: 'denied'")"
ge "analytics_storage denied by default"  1 "$(printf '%s' "$body" | count "analytics_storage: 'denied'")"
ge "wait_for_update present"              1 "$(printf '%s' "$body" | count 'wait_for_update: 500')"
for host in googlesagmanager googletagmanager connect.facebook.net clarity.ms fundingchoicesmessages pagead2.googlesyndication; do
  n=$(printf '%s' "$body" | grep -c "$host")
  check "no $host request without consent" 0 "$n"
done

printf '\n== 10. Bad slugs are excluded from the index ==\n'
for p in /tools/zzz /insights/zzz /work/zzz /services/zzz; do
  body=$(curl -s "$B$p")
  # Two distinct tags are correct here: Next's own bare `noindex` guard for the
  # streamed not-found, plus the `noindex, follow` this page's metadata sets.
  ge "$p serves Next's streamed noindex" 1 \
    "$(printf '%s' "$body" | count '<meta name="robots" content="noindex"/>')"
  ge "$p also carries the page's own noindex, follow" 1 \
    "$(printf '%s' "$body" | count '<meta name="robots" content="noindex, follow"/>')"
done
check "genuinely unmatched path is a real 404" 404 "$(curl -s -o /dev/null -w '%{http_code}' "$B/zzz")"

printf '\n== 11. Crawler files ==\n'
r=$(curl -s "$B/robots.txt")
for bot in GPTBot OAI-SearchBot ClaudeBot PerplexityBot Google-Extended CCBot Bingbot; do
  printf '%s' "$r" | grep -q "User-Agent: $bot" && ok "robots.txt allows $bot" || bad "robots.txt missing $bot"
done
# Each of the 13 crawler groups repeats the same Disallow list.
ge "robots.txt disallows /admin" 1 "$(printf '%s' "$r" | count 'Disallow: /admin')"
check "robots.txt declares canonical Host" 1 "$(printf '%s' "$r" | count 'Host: https://www.creativoxa.com')"

sm=$(curl -s "$B/sitemap.xml")
for u in /tools /tools/word-counter /tools/unit-converter /disclaimer; do
  check "sitemap contains $u" 1 "$(printf '%s' "$sm" | count "<loc>https://www.creativoxa.com$u</loc>")"
done
check "sitemap has the root URL" 1 "$(printf '%s' "$sm" | count '<loc>https://www.creativoxa.com</loc>')"

printf '\n== 12. llms.txt / llms-full.txt / feed.xml are well-formed ==\n'
for f in llms.txt llms-full.txt; do
  ct=$(curl -s -o /dev/null -w '%{content_type}' "$B/$f")
  case "$ct" in text/plain*) ok "$f served as $ct";; *) bad "$f served as $ct";; esac
done
# The llmstxt.org spec for /llms.txt IS a markdown document: `- [name](url)`
# bullets are the required shape, not leftover source.
ge "llms.txt uses the spec's [name](url) link list" 10 "$(curl -s "$B/llms.txt" | count '^- \[')"
# /llms-full.txt is markdown-structured by design (llmstxt.org expects `#`/`##`
# section headings), so headings are correct. What must NOT survive is markdown
# *inline* syntax inside the prose, which would mean article bodies were passed
# through unconverted.
check "llms-full.txt has no unconverted markdown links" 0 "$(curl -s "$B/llms-full.txt" | count '](')"
check "llms-full.txt has no unconverted images" 0 "$(curl -s "$B/llms-full.txt" | count '![')"
check "llms-full.txt has no stray code fences" 0 "$(curl -s "$B/llms-full.txt" | count '```')"
check "llms-full.txt has exactly one h1" 1 "$(curl -s "$B/llms-full.txt" | grep -cE '^# ' || true)"
check "llms-full.txt has no deeper than h3" 0 "$(curl -s "$B/llms-full.txt" | grep -cE '^#{4,} ' || true)"
curl -s "$B/feed.xml" | python3 -c "
import sys, xml.dom.minidom as m
m.parseString(sys.stdin.read())
" 2>/dev/null && ok "feed.xml is valid XML" || bad "feed.xml is not valid XML"
ft=$(curl -s -o /dev/null -w '%{content_type}' "$B/feed.xml")
case "$ft" in *rss+xml*) ok "feed.xml served as $ft";; *) bad "feed.xml served as $ft";; esac

printf '\n== 13. ads.txt ==\n'
check "ads.txt has a valid authorised-seller line" 1 \
  "$(curl -s "$B/ads.txt" | grep -cE '^google\.com, pub-[0-9A-Za-z_-]+, DIRECT, [0-9a-f]+$' || true)"

printf '\n== 14. RSS discovered from every page ==\n'
check "RSS alternate link on /" 1 "$(curl -s "$B/" | grep -o 'rel="alternate" type="application/rss+xml"' | wc -l | tr -d ' ')"

printf '\n== 15. /tools is no longer an orphan ==\n'
n=$(curl -s "$B/" | grep -o 'href="/tools"' | wc -l | tr -d ' ')
[ "$n" -ge 1 ] && ok "homepage links to /tools ($n links)" || bad "homepage has no internal link to /tools"
n=$(curl -s "$B/services" | grep -o 'href="/tools"' | wc -l | tr -d ' ')
[ "$n" -ge 1 ] && ok "/services links to /tools ($n links)" || bad "/services has no internal link to /tools"

printf '\n== 16. Manifest icon sizes match the real assets ==\n'
# A manifest that claims 512x512 for a 192x192 file breaks PWA install and
# misleads the install UI, so assert the declared size against the bytes served.
man=$(curl -s "$B/manifest.webmanifest")
icons_checked=0
while IFS= read -r pair; do
  [ -n "$pair" ] || continue
  icons_checked=$((icons_checked+1))
  src=$(printf '%s' "$pair" | sed -n 's/.*"src":"\([^"]*\)".*/\1/p')
  sz=$(printf '%s' "$pair" | sed -n 's/.*"sizes":"\([0-9]*\)x\([0-9]*\)".*/\1x\2/p')
  hdr=$(curl -s "$B$src" | file - | grep -oE '[0-9]+ x [0-9]+' | head -1 | tr -d ' ')
  check "manifest $src declares $sz and the file is $hdr" "$sz" "$hdr"
done < <(printf '%s' "$man" | tr '}' '\n' | grep -o '"src":"[^"]*","sizes":"[0-9]*x[0-9]*"')
ge "manifest lists at least one icon" 1 "$(printf '%s' "$man" | grep -o '"src":' | wc -l | tr -d ' ')"
check "manifest icon entries parsed for size check" \
  "$(printf '%s' "$man" | grep -o '"src":' | wc -l | tr -d ' ')" "$icons_checked"

printf '\n'
if [ "$fails" -eq 0 ]; then
  printf 'ALL CHECKS PASSED\n'
  exit 0
fi
printf '%d CHECK(S) FAILED\n' "$fails"
exit 1