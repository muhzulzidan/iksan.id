import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'

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
