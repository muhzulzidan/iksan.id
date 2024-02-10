import Link from "next/link"

type CategoriesProps = {
  categories: string[]; // expects an array of category names
};



const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <span className="ml-1">

      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href={"/"} className="inline-flex items-center text-sm font-medium text-stone-700 hover:text-secondary2 dark:text-stone-400 dark:hover:text-white">
              <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 text-stone-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <Link href={"/blogs/"} className="ml-1 text-sm font-medium text-stone-700 hover:text-secondary2 md:ml-2 dark:text-stone-400 dark:hover:text-white">Blogs</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 text-stone-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="ml-1 text-sm font-medium text-stone-500 md:ml-2 dark:text-stone-400">{Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category: any, index: number) => (
                  <span key={index} className="ml-1">
                    {category}
                  </span>
                ))
              ) : (
                <span className="ml-1">{Array.isArray(categories) && categories.length > 0 ? categories[0] : ''}</span>
              )}</span>
            </div>
          </li>
        </ol>
      </nav>

      
    </span>
  )
}


export default Categories;