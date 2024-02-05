import Head from 'next/head'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '../lib/constants'


export default function Meta({ metaDefault}) {
  // Check if metaDefault exists and has at least one item
  const shouldUseMeta = metaDefault && metaDefault.length > 0;

  // Use the first item from metaDefault if it exists
  const metaFirst = shouldUseMeta ? metaDefault[0] : {};
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <title>{`${metaFirst.title || ''} ${CMS_NAME}`}</title>
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`${metaFirst.description || ''} ${CMS_NAME}.`}
      />
      {shouldUseMeta && metaFirst.image && (
        <meta property="og:image" content={`https://${metaFirst.image.fields.file.url}`} />
      )}
    </Head>
  )
}
