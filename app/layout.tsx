
import { getAllPostsForHome } from "@/lib/api";
import "./globals.css";
import localFont from 'next/font/local'
import Script from "next/script";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"



const CircularBold = localFont({
  src: './images/fonts/Circular/Circular Std Bold.ttf',
  variable: '--font-KomuA',
  display: 'swap'
});
const Circular = localFont({
  src: './images/fonts/Circular/Circular Std Medium.ttf',
  variable: '--font-KomuA',
  display: 'swap'
});
const KomuA = localFont({
  src: './images/fonts/Komu_A.otf',
  variable: '--font-KomuA',
  display: 'swap'
});
const PolySans = localFont({
  src: './images/fonts/PolySans/PolySans Neutral.otf',
  variable: '--font-PolySans',
  display: 'swap'
});
const PolySansItalic = localFont({
  src: './images/fonts/PolySans/PolySans Neutral Italic.otf',
  variable: '--font-PolySans-italic',
  display: 'swap'
});
const PolySansMedian = localFont({
  src: './images/fonts/PolySans/PolySans Median.otf',
  variable: '--font-PolySans-median',
  display: 'swap'
});
const PolySansMedianItalic = localFont({
  src: './images/fonts/PolySans/PolySans Median Italic.otf',
  variable: '--font-PolySans-medianItalic',
  display: 'swap'
});
const PolySansBulky = localFont({
  src: './images/fonts/PolySans/PolySans Bulky.otf',
  variable: '--font-PolySans-Bulky',
  display: 'swap'
});
const PolySansBulkyItalic = localFont({
  src: './images/fonts/PolySans/PolySans Bulky Italic.otf',
  variable: '--font-PolySans-BulkyItalic',
  display: 'swap'
});
const PolySansSlims = localFont({
  src: './images/fonts/PolySans/PolySans Slim.otf',
  variable: '--font-PolySans-slims',
  display: 'swap'
});
const PolySansSlimsItalic = localFont({
  src: './images/fonts/PolySans/PolySans Slim Italic.otf',
  variable: '--font-PolySans-slimsItalic',
  display: 'swap'
});


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
}



export const metadata = {
  applicationName: "Iksan Bangsawan's Blog",
  authors: [{ name: "Iksan Bangsawan" }],
  generator: 'Next.js',
  keywords: ['Iksan Bangsawan', 'instagram', 'creator', 'Entrepreneur', 'Digital Marketing', 'Personal Branding', 'Bisnis', 'Pembicara',],
  referrer: 'origin-when-cross-origin',
  creator: 'Iksan Bangsawan',
  publisher: 'Iksan Bangsawan',
  metadataBase: new URL('https://iksan.id'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: "https://images.ctfassets.net/1612ijcm5jnx/2NLmNoMaqZQxKFNkH5Ke9c/9fccfc9e03057ea4e07b4ffcaa507d9b/kak-iksan-prfl-1.png?w=3840&q=75",
  },
}

export default function RootLayout({
  children,
}: LayoutProps) {
  return (
    <ClerkProvider>

      <html lang="id">
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
        ${Circular.variable}
        ${CircularBold.variable}
        ${KomuA.variable}
        ${PolySans.variable}
        ${PolySansItalic.variable}
        ${PolySansMedian.variable}
        ${PolySansMedianItalic.variable}
        ${PolySansBulky.variable}
        ${PolySansBulkyItalic.variable}
        ${PolySansSlims.variable}
        ${PolySansSlimsItalic.variable}
        `} >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
