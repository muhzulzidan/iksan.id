// app/gadget/page.tsx (Server component for fetching data)
import { getgadget, getPageTitles, getMetaDefault } from '@/lib/contentful';
import GadgetClient from './GadgetClients';

 async function GadgetPage() {
     const gadget = await getgadget() as unknown as GadgetItem[]
    const pageTitles = await getPageTitles() as unknown as PageTitle[]
    const metaDefault = await getMetaDefault() as unknown as MetaDefault

    // Pass the fetched data to the page via props
    return (
        <GadgetClient
            gadget={gadget} 
            pageTitles={pageTitles} 
            metaDefault={metaDefault}
        />
    );
}


export default GadgetPage