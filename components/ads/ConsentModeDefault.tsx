/**
 * Blocking Consent Mode v2 bootstrap.
 *
 * This must run before any Google tag, so it is rendered as a plain inline
 * script in `<head>` rather than through `next/script`. It sets every signal to
 * `denied` unconditionally; `pushToGtag` in `ConsentProvider` later sends the
 * matching `update` once the visitor (or the certified CMP) decides.
 *
 * `wait_for_update` on the gtag command holds conversion pings for up to 500ms
 * waiting for that decision, so a late grant is still recorded.
 */
const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('set', 'url_passthrough', true);
`;

export default function ConsentModeDefault() {
  return (
    <script
      id="cv-consent-default"
      dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }}
    />
  );
}