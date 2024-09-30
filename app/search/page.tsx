// /app/search/page.tsx

import { getBlogs, getKelas, getMetaDefault, getProducts, getTemplates, getTtemplateCategory } from '@/lib/contentful';
import SearchClient from './SearchClient';
import { Product, WithContext } from 'schema-dts';

const Search = async () => {
    const templates = await getTemplates() as unknown as Template[];
    const products = await getProducts() as unknown as any[];
    const templateCategory = await getTtemplateCategory() as unknown as TemplateCategory[];
    const allPosts = await getBlogs();
    const kelas: any[] = await getKelas();
    const comingSoonKelas = kelas.filter((k: Kelas) => k.comingSoon);
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];

    const title = metaDefault?.title || 'Default Title';
    const description = metaDefault?.description || 'Default Description';
    const imageUrl = metaDefault?.image?.fields?.file?.url || '/default-image.jpg';
    const jsonLd: WithContext<Product> = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${title}`,
        image: imageUrl,
        description: `${description}`,
    };

    return (
        <SearchClient
            templates={templates}
            products={products}
            templateCategory={templateCategory}
            blogs={allPosts}
            kelas={kelas}
        />
    );
};

export default Search;