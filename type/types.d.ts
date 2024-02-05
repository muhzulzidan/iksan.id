// types.d.ts or twoColumnLayoutTypes.d.ts
interface PostAuthor {
    name: string;
    firstName: string;
    lastName: string;
    avatar: {
        url: string;
    };
}

interface PostNode {
    slug: string;
    title?: string;
    excerpt?: string;
    date?: string;
    author?: PostAuthor;
    featuredImage?: {
        node: {
            sourceUrl: string;
        };
    };
    categories?: {
        edges: Array<{
            node: {
                name: string;
            };
        }>;
    };
}

interface PostsData {
    edges: PostNode[];
}
 interface Blog {
    node: {
        slug: string;
        title: string;
        date: string; // Assuming date is a string, adjust as necessary
        featuredImage: {
            node: {
                sourceUrl: string;
            };
        };
        categories: {
            edges: Array<{
                node: {
                    name: string;
                };
            }>;
        };
    };
}
interface Insight {
    // Assuming structure, adjust according to actual data
    id: number;
    title: string;
    excerpt: string;
    date: string;
}

interface LatestVideo {
    id: number;
    title: string;
    url: string;
}

interface HomepageData {
    ttile: any;
    headingSection3?: ReactNode; // Optional
    descriptionSection3?: ReactNode; // Optional
    hero?: {
        fields?: {
            file: {
                url: string;
            };
            title: string;
        };
    };
    h2?: string;
    title?: string;
    description?: string;
    linksPrimary?: {
        fields: {
            links: string;
            title: string;
        };
    };
    linksSecondary?: {
        fields: {
            links: string;
            title: string;
        };
    };
    logos?: any[]; // Adjust according to the actual structure
    greatUpgrade?: any[]; // Adjust according to the actual structure
}

interface TwoColumnLayoutProps {
    data?: any; // Define more specifically if possible
    blogs: Blog[];
    insights?: Insight[]; // Assuming insights has a similar structure or adjust as necessary
}

interface Template {
    image: any;
    description: ReactNode;
    price: ReactNode;
    url: string; // Assuming each template has a URL
    title?: string;
    fields?: {
        title: string;
        description: string;
        price: number;
        image: {
            slug: string | undefined;
            fields: {
                title: string;
                file: {
                    url: string;
                };
                slug?: string;
            };
        };
        url: string;
    };
}

interface ImageField {
    title: string;
    file: { url: string };
    slug?: string;
}


interface TemplateField {
    title: string;
    description: string;
    price: number;
    image: {
        slug?: string;
        fields: {
            title: string;
            file: { url: string; };
            slug?: string;
        };
    };
    url: string;
}

interface Template {
    fields: TemplateField;
}

interface PageTitle {
    slug: string;
    title: string;
    description: string;
}

interface TemplateCategory {
    slug: string;
    title: string;
    templates: Template[];
}


interface TemplatePopular {
    template: any;
    fields: TemplateField;
}


// Assuming templatePopular is an array of objects where each object contains a `template` property
type TemplatePopularArray = TemplatePopular[];

interface RawTemplate {
    fields?: {
        image?: {
            fields?: {
                file?: {
                    url?: string;
                };
            };
        };
        description?: string;
        price?: number;
        url?: string;
        title?: string;
    };
}
interface TemplatesClientProps {
    templates: Template[];
    pageTitles: PageTitle[];
    templateCategory: TemplateCategory[];
    templatePopular: TemplatePopular[]; // Now correctly an array of TemplatePopular
    metaDefault: any; // Assuming you have a specific type for this elsewhere
}