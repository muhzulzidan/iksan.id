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

// Then, define the props that your page component will receive
interface BlogPagesProps {
    post: Post;
    posts: Post[];
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

interface File {
    fields: {
        file: {
            url: string;
        };
    };
}


interface Template {
    isFeatured?: boolean;
    image: any;
    description: ReactNode;
    price: ReactNode;
    url: string; // Assuming each template has a URL
    slug: string; // Assuming each template has a URL
    title: string;
    file?: File[]; 
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

// Define interfaces for your data structures
interface TimelineItem {
    image: {
        fields: {
            file: {
                url: string;
            };
        };
    };
    title: string;
    year: string;
    description: string;
}

interface AboutMe {
    story: string;
}

// Props interface for MyStory component
interface MyStoryProps {
    timelineData: TimelineItem[];
    aboutme: AboutMe[];
    metaDefault: any;
}



interface ProfilClientProps {
    timelineData: TimelineItem[];
    aboutme: AboutMe[]; // This remains an array
    metaDefault: any; // Specify a more concrete type if available
}


// Define the props interface to type-check the data passed into this component
interface Course {
    title: string;
    price: number;
    images: Array<{ title: string; fields: { file: { url: string; } }; slug?: string; }>;
    description: string;
}

interface CoursesClientProps {
    courses: Course[];
    pageTitles: {
        slug: any; title: string; description: string; 
}[];
    metaDefault: any; // Adjust this type based on your actual metaDefault structure
}

// Define props interface
interface Wallpaper {
    title: string;
    image: {
        fields: {
            file: {
                url: string;
            };
        };
    };
    // Include other properties as necessary
}

interface WallpapersClientProps {
    wallpapers: Wallpaper[];
    pageTitles: {
        slug: any; title: string; description: string; 
}[];
    metaDefault: any; // Adjust based on your actual structure
}


interface PressKit {
    presskitlogo: any;
    title: string;
    description: string;
    pressImage: {
        fields: {
            title: string;
            file: {
                url: string;
            };
        };
        slug?: string; // Include this if you use slugs for press images
    };
    url: string; // Assuming there's a URL field in your press kit entries
    // Add other fields from your press kit entries as needed
}

interface PressKitLogo {
    fields: {
        logo: {
            fields: {
                title: string;
                file: {
                    url: string;
                };
            };
            slug?: string; // Include if you use slugs for logos
        };
    };
    // Include other properties if your press kit logos have more fields
}

interface PressKitLogoOrder {
    order: number; // Assuming you have an order field to sort logos
    pressKitLogo: PressKitLogo; // Adjust based on how you reference logos in the order entries
    // Add other fields as needed
}

interface MetaDefault {
    title: string;
    description: string;
    image: {
        fields: {
            file: {
                url: string;
            };
        };
    };
    instagram?: string;
    threads?: string;
    tiktok?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
}


// Assuming the structure of a photo object based on your usage
interface Photo {
    title: string;
    image: {
        fields: {
            file: {
                url: string;
            };
        };
    };
}


interface PhotosClientProps {
    photos: Photo[];
    metaDefault: MetaDefault; // Use the actual structure of your metaDefault
}



interface LinktreeClientProps {
    allPosts: {
        edges: PostEdge[];
    };
    templates: Template[];
    ebooks: Ebook[];
    templateCategory: Category[];
    templatePopular: Popular[];
}


interface GadgetItem {
    title: string;
    link: string;
    categories: string;
    description: string;
    image: {
        fields: {
            file: {
                url: string;
            };
        };
    };
}



interface GadgetClientProps {
    gadget: GadgetItem[];
    pageTitles: PageTitle[];
    metaDefault: MetaDefault; // Adjust based on actual structure
}

interface EventItem {
    slug: string;
    title: string;
    date: string;
    gallery: Array<{
        fields: {
            file: {
                title: string;
                url: string;
                fileName: string; // Optional, based on your data structure
            };
        };
    }>;
}


interface EventsPageProps {
    events: EventItem[];
    metaDefault: MetaDefault;
}
interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    gallery: GalleryItem[];
}

interface EventPageServerProps {
    params: ParsedUrlQuery;
}

interface EventPageClientProps {
    event: Event | null;
    metaDefault: MetaDefault;
}

// Assuming structure of a book object based on your usage in Books component
interface Book {
    title: string;
    desc: string;
    url?: string;
    url_alter?: string;
    image: {
        fields: {
            title: string;
            file: {
                url: string;
            };
        };
        slug?: string;
    };
}

interface Ebook  {
    title: string;
    slug: string;
    description: string;
    oldPrice: number;
    price: number;
    image: {
        fields: {
            title: string;
            file: {
                url: string;
            };
        };
        slug?: string;
    };
    url: string;
};


interface PostClientProps {
    post: Post;
    posts: Post[];
}

interface BusinessInfo {
    title: string;
    description: string;
    services: string;
    websiteUrl: string;
    instagram: string;
    establishmentYear: number;
    location: {
        lat: number;
        lon: number;
    };
    businessImage: Array<{
        fields: {
            file: {
                url: string;
            };
        };
    }>;
}


interface BusinessPageProps {
    businessInfo: BusinessInfo[]; // Since businessInfo is an array

    metaDefault: MetaDefault;
}

interface Node {
    name: string;
}

interface Edge {
    node: Node;
}

interface Categories {
    edges: Edge[];
}

interface PostHeaderProps {
    title: string,
    coverImage: {
        node: {
            sourceUrl: string;
        };
    },
    date: string,
    excerpt: string,
    author: string,
    slug: string,
    category: string
}

interface CustomerDownloadData {
    [x: string]: any;
    id: number;
    userId: string;
    fileName: string;
    downloadDate: string;
    fullname: string;
    email: string;
}
interface CustomerDownloadData {
    link: string;
    download: string;
}