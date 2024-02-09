"use client"

import React, { useState } from 'react';
import { ChevronDown, Search } from "react-bootstrap-icons";
import PostPreview from './post-preview';

interface Post {
  node: {
    title: string;
    featuredImage: string;
    date: string;
    author: string;
    slug: string;
    excerpt: string;
    categories: {
      edges: [
        {
          node: {
            name: string;
          };
        }
      ];
    };
  };
}

interface MoreStoriesProps {
  posts: Post[];
  more: boolean,
}

const MoreStories: React.FC<MoreStoriesProps> = ({ posts, more }) => {
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(posts);
  const [initialVisiblePosts, setInitialVisiblePosts] = useState(6);
  const [postsToLoad, setPostsToLoad] = useState(3);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowDropdown(false);
    filterPosts(category, searchQuery);
  };

  const categories = Array.from(
    new Set(posts.map((post) => post.node.categories.edges[0]?.node.name))
  ).filter(Boolean);

  const filterPosts = (category: string, query: string) => {
    const filteredPosts = posts.filter((post) => {
      const categoryMatch =
        selectedCategory === 'Select Category' ||
        post.node.categories.edges[0]?.node.name === selectedCategory;
      const searchMatch = post.node.title.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && searchMatch;
    });
    setSearchResults(filteredPosts);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory('Select Category');
    const query = e.target.value;
    setSearchQuery(query);
    filterPosts(selectedCategory, query);
  };

  // console.log(searchResults)

  return (
    <section className={`flex flex-col-reverse md:flex-row md:px-6 mx-auto max-w-screen-lg `}>

      <div className={`mb-32 ${more ? "w-full " : "w-full md:w-11/12  pl-4 pr-4"}`}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6  '>
          {searchResults.slice(0, initialVisiblePosts).map(({ node }) => (
            <PostPreview
              key={node.slug}
              title={node.title}
              coverImage={node.featuredImage}
              date={node.date}
              author={node.author}
              slug={node.slug}
              excerpt={node.excerpt}
              category={node.categories.edges[0]?.node.name}
            />
          ))}
       </div>
        <button
          className='bg-secondary2 hover:bg-secondary3 hover:text-stone-950 px-4 py-2 rounded-lg text-stone-50 w-fit mt-24'
          onClick={() => setInitialVisiblePosts(prev => prev + postsToLoad)}
        >
          Load More
        </button>
      </div>
      
      {more ?

        <>

        </>
        :
        <>
          <div className="relative w-full p-4 pb-12 md:p-0 md:w-3/12 ">
            <h3 className='mb-4'>
              Categories
            </h3>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="inline-flex items-center w-full px-4 py-3 text-sm font-medium text-gray-500 border-0 bg-stone-200  hover:bg-gray-200 focus:outline-none rounded-lg justify-between "
            >
              {selectedCategory}
              <ChevronDown width={15} height={20} />
            </button>
            {showDropdown && (
              <div className="absolute mt-0 space-y-2 bg-stone-200 border border-gray-300 rounded-lg  w-full z-10">
                <button
                  onClick={() => handleCategorySelect('Select Category')}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  Semua
                </button>
                {categories.map((category: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleCategorySelect(category)}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-4 relative z-0">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search"
                className="w-full py-3 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-opacity-50 bg-stone-200 text-stone-300 focus:outline-0 focus:ring-secondary2  focus:border-stone-50 focus:text-gray-950"
              />
              <Search className="absolute top-3 left-4 text-gray-400" />
            </div>
          </div>
        </>
      }


    </section>
  );
};  

export default MoreStories;
