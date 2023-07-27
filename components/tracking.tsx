
import Script from "next/script";
import { inDevEnvironment } from "@/utils/dev";

const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

const trackingCodes = () => {
    return (
        <>
            <Script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js" />
            <link rel="stylesheet" href="https://unpkg.com/transition-style" />

            <meta name="referrer" content="no-referrer-when-downgrade" />
            {/* Google Tag Manager - Global base code */}
            {
            !inDevEnvironment ?
            <>
                <Script
                id="gtag-base"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer', '${GTM_ID}');
                    `,
                }}
                />
                <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-218110255-1" />
                <Script
                id="gtag-base-campaign-paid"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'UA-218110255-1');
                    `,
                }}
                />
            </>
            : null
            }

            {/* Hotjar - base code */}
            {
            !inDevEnvironment ?
            <>
                <Script
                id="hotjar-base"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    (function(h,o,t,j,a,r){
                        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                        h._hjSettings={hjid:2854836,hjsv:6};
                        a=o.getElementsByTagName('head')[0];
                        r=o.createElement('script');r.async=1;
                        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                        a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                    `,
                }}
                />
                <script>
                {`(function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:2854836,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
                </script>
            </>
            : null
            }
            {/* Hotjar - base code end */}
            {/*<!-- Twitter universal website tag code -->*/}
            {
            !inDevEnvironment ?
            <>
                <Script
                id="hotjar-base"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
                    },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
                    a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
                    // Insert Twitter Pixel ID and Standard Event data below
                    twq('init','o9gjd');
                    twq('track','PageView');
                    `,
                }}
                />
            </>
            : null
            }        
        </>
    )
}

export default trackingCodes;