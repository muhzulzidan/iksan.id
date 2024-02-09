// app/links/page.tsx

import { getMetaDefault, getEbooks, getTemplates, getTtemplateCategory, getTtemplatePopular } from '@/lib/contentful';
import { getAllPostsForHome } from '@/lib/api'
import LinktreeClient from './linktreeClient';

export default async function LinktreePage() {

    const allPosts = await getAllPostsForHome(false);
    const ebooks = await getEbooks();
    const templates = await getTemplates() as unknown as Template[]; 
    const templateCategory = await getTtemplateCategory();
    const templatePopular = await getTtemplatePopular();

    return (
        <LinktreeClient
            allPosts={allPosts}
            templates={templates}
            ebooks={ebooks}
            templateCategory={templateCategory}
            templatePopular={templatePopular}
        />
    );
}
