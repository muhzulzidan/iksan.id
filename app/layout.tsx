import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import Script from "next/script";

const kanakira = localFont({
  src: './images/fonts/Kanakira/Kanakira-BoldInktrap.woff2',
  variable: '--font-Kanakira-BoldInktrap',
  display: 'swap'
});
const kanakiraItalic = localFont({
  src: './images/fonts/Kanakira/Kanakira-BoldInktrapItalic.woff2',
  variable: '--font-Kanakira-BoldInktrapItalic',
  display: 'swap'
});
const kanakiraHeavy = localFont({
  src: './images/fonts/Kanakira/Kanakira-HeavyInktrap.woff2',
  variable: '--font-Kanakira-HeavyInktrap',
  display: 'swap'
});
const kanakiraHeavyItalic = localFont({
  src: './images/fonts/Kanakira/Kanakira-HeavyInktrapItalic.woff2',
  variable: '--font-Kanakira-HeavyInktrapItalic',
  display: 'swap'
});
const mabryBold = localFont({
  src: './images/fonts/Mabry/MabryPro-Bold.ttf',
  variable: '--font-MabryPro-Bold',
  display: 'swap'
});
const mabryBoldItalic = localFont({
  src: './images/fonts/Mabry/MabryPro-BoldItalic.ttf',
  variable: '--font-MabryPro-BoldItalic',
  display: 'swap'
});
const mabryItalic = localFont({
  src: './images/fonts/Mabry/MabryPro-Italic.ttf',
  variable: '--font-MabryPro-Italic',
  display: 'swap'
});
const mabryLight = localFont({
  src: './images/fonts/Mabry/MabryPro-Light.ttf',
  variable: '--font-MabryPro-Light',
  display: 'swap'
});
const mabryLightItalic = localFont({
  src: './images/fonts/Mabry/MabryPro-LightItalic.ttf',
  variable: '--font-MabryPro-LightItalic',
  display: 'swap'
});
const mabryRegular = localFont({
  src: './images/fonts/Mabry/MabryPro-Regular.ttf',
  variable: '--font-MabryPro-Regular',
  display: 'swap'
});

interface LayoutProps {
  children: React.ReactNode;
  metaDefault: Metadata; // Assuming Metadata is the correct type for metaDefault
}

export default function RootLayout({
  children,
  metaDefault, // Add metaDefault to the props
}: LayoutProps) {
  return (
    <html lang="en">
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-N9385Q8YHE`}
      />
      <Script
        strategy="afterInteractive"
        id="gtag-config"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N9385Q8YHE', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Script
        strategy="afterInteractive"
        id="gtm-script"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T87SBL9R');
          `,
        }}
      />
      <Script
        id="gtm-body"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T87SBL9R"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
          `,
        }}
      />
      <body className={`
      ${mabryRegular.variable} 
      ${kanakira.variable}
      ${kanakiraItalic.variable}
      ${kanakiraHeavy.variable}
      ${kanakiraHeavyItalic.variable}
      ${mabryBold.variable}
      ${mabryBoldItalic.variable}
      ${mabryItalic.variable}
      ${mabryLight.variable}
      ${mabryLightItalic.variable}
      ${mabryLightItalic.variable}
      `} >
        {children}
      </body>
    </html>
  );
}
