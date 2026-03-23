import Script from 'next/script';

export default function TrackingScripts() {
  return (
    <>
      {/* === Google Ads Tracking === */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11559994946" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-11559994946');
        `}
      </Script>

      {/* === Google AdSense === */}
      <Script
        id="adsense"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9474618204004973"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* === Microsoft Clarity === */}
      <Script id="ms-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "qf7o3i7qau");
        `}
      </Script>

      {/* === Meta Pixel 1 === */}
      <Script id="meta-pixel-1" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '858693652813158');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=858693652813158&ev=PageView&noscript=1" alt="" />
      </noscript>

      {/* === Meta Pixel 2 === */}
      <Script id="meta-pixel-2" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1286322582473254');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1286322582473254&ev=PageView&noscript=1" alt="" />
      </noscript>

      {/* === Banner Ad Configuration === */}
      <Script id="banner-ad-config" strategy="beforeInteractive">
        {`
          window.atOptions = {
              'key' : '64bae3693bb3f6666d392ab4131d93f7',
              'format' : 'iframe',
              'height' : 60,
              'width' : 468,
              'params' : {}
          };
        `}
      </Script>
    </>
  );
}