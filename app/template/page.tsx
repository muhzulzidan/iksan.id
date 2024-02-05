// app/template/page.tsx


import { getTemplates, getTtemplateCategory, getTtemplatePopular, getPageTitles, getMetaDefault } from '../../lib/contentful';
import notion from '../../lib/notion';
import TemplatesClient from './templateclient';



async function Templates () {
    const templates = await getTemplates() as unknown as Template[]; 

    const PageTitles = await getPageTitles() as unknown as PageTitle[];
    const templateCategory = await getTtemplateCategory() as unknown as TemplateCategory[];
    const templatePopular = await getTtemplatePopular() as unknown as TemplatePopular[];
    const metaDefault = await getMetaDefault();

    return (
      <TemplatesClient 
            metaDefault={metaDefault}
            templates={templates}
            pageTitles={PageTitles}
            templateCategory={templateCategory}
            templatePopular={templatePopular}
      />
    );
}


export default Templates