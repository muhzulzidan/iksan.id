import React from 'react'; // Import React
import Footer from './footer';
import Meta from './meta';
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
      <Meta metaDefault={metaDefault} />
      <div>
        <DynamicHeader />
        <main className=''>{children}</main>
      </div>
      {/* <LazyLoad offset={100}>
        <Footer metaDefault={metaDefault} />
      </LazyLoad> */}
    </>
  );
}
