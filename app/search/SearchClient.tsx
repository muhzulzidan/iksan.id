// /app/search/page.tsx
"use client"

import DateComponent from '@/components/date';
import Layout from '@/components/layout';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CalendarDateFill, PersonFill } from 'react-bootstrap-icons';
import ClampLines from 'react-clamp-lines';

interface SearchClientProps {
    templates: Template[];
    products: any[];
    templateCategory: TemplateCategory[];
    blogs: any[];
    kelas: Kelas[];
}

const SearchClient: React.FC<SearchClientProps> = ({ templates, products, templateCategory, blogs, kelas  }) => {

    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    const filterResults = <T extends { title?: string; postTitle?: string }>(items: T[]): T[] => {
        if (!Array.isArray(items)) return [];
        return items.filter(item => {
            const title = item.title || item.postTitle || '';
            return query ? title.toLowerCase().includes(query.toLowerCase()) : false;
        });
    };

    const filteredTemplates = filterResults(templates);
    const filteredProducts = filterResults(products);
    const filteredBlogs = filterResults(blogs);
    // const filteredInsights = filterResults(insights);
    const filteredKelas = filterResults(kelas);

    // console.log(filteredTemplates, filteredProducts, filteredBlogs, filteredInsights, filteredKelas);

    // console.log(templates, products, templateCategory, blogs, insights, );

    console.log(blogs)

    return (
        <Layout>
            <main className='bg-stone-50 text-stone-950  py-12 px-4 '>
                <div className='container max-w-screen-xl mx-auto text-center'>
                    <h1 className='text-3xl font-bold'>Search Results</h1>
                    <p className='text-lg'>Search query: {query}</p>
                    {/* Add logic to display search results based on the query */}
                </div>
                <div className="grid grid-cols-1 gap-4 mt-8">
                    {filteredTemplates.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold">Templates</h2>
                            {filteredTemplates.map((template, index) => (
                                <Link href={`/template/${template.slug}`} key={index} className="p-4 border rounded-md">
                                    <h3 className="text-xl font-bold text-secondary2 hover:underline">{template.title}</h3>
                                    <ClampLines
                                        text={template.description}
                                        id="post-title"
                                        lines={2}
                                        ellipsis="..."
                                        moreText="Expand"
                                        lessText="Collapse"
                                        className="line-clamp-3 "
                                        innerElement="p"
                                    />
                                </Link>
                            ))}
                        </div>
                    )}
                    {filteredProducts.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold">Products</h2>
                            {filteredProducts.map((product, index) => (
                                <div key={index} className="p-4 border rounded-md">
                                    <h3 className="text-xl font-bold">{product.title}</h3>
                                    <p>{product.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {filteredKelas.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold">Kelas</h2>
                            {filteredKelas.map((kelas, index) => (
                                <Link href={`/kelas/${kelas.slug}`} key={index} className="p-4 border rounded-md">
                                    <h3 className="text-xl font-bold text-secondary2 hover:underline">{kelas.title}</h3>
                                    <p>{kelas.description.content.map((content: { value: any; }) => content.value).join(' ')}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                    {filteredBlogs.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold">Blogs</h2>
                            {filteredBlogs.map((blog, index) => (
                                <Link href={`/blogs/${blog.slug}`}  key={index} className="p-4 border rounded-md" >
                                    <h3 className="text-xl font-bold text-secondary2 hover:underline">
                                        {blog.postTitle}
                                    </h3>
                                    <div className="text-sm py-1  mb-2 flex gap-5 text-stone-500 items-center">
                                        <div className="flex gap-2 ">
                                            <CalendarDateFill className="text-stone-400 mt-[.1em]" />
                                            <DateComponent dateString={blog.publishDate} />
                                        </div>
                                        <div className="flex gap-1 ">
                                            <PersonFill className="text-stone-600" />
                                            {"iksan bangsawan"}
                                            {/* <Avatar author={author} /> */}
                                        </div>
                                    </div>
                                    <p>{blog.excerpt}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </Layout>
    );
};

export default SearchClient;