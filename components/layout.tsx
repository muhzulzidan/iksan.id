import React from 'react'; // Import React
import Footer from './footer';
// import Meta from './meta';
import { CMS_NAME, HOME_OG_IMAGE_URL } from '@/lib/constants'
import dynamic from 'next/dynamic';


const DynamicHeader = dynamic(() => import('./header'), {
  loading: () => <p>Loading...</p>,
});

// Add a type for the props
type LayoutProps = {
  children: React.ReactNode;
  metaDefault: any; // You should also provide a specific type for metaDefault if possible
};


export default function Layout({ children, metaDefault }: LayoutProps) {

  return (
    <>
   
      
      <div>
        <DynamicHeader />
        <main className=''>{children}</main>
      </div>
      <Footer metaDefault={metaDefault} />
    </>
  );
}
