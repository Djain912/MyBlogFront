import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Highlighter from "react-highlight-words";

export default function Getpost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://server-vpao.onrender.com/getposts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getFilteredPosts = () => {
    return posts.filter((post) => {
      const matchesFilter = filter ? post.category === filter : true;
      const matchesSearch = searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesFilter && matchesSearch;
    });
  };

  // Get unique categories from posts
  const categories = ["All Categories", ...new Set(posts.map(post => post.category))];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar - Mobile overlay when open, always visible on larger screens */}
      <div 
        className={`fixed md:static inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-30 transition duration-300 ease-in-out bg-gray-800 w-64 overflow-y-auto`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Blog</h2>
            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={toggleSidebar}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">Search</label>
            <input
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          {/* Categories */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">Categories</label>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setFilter(category === "All Categories" ? "" : category)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    (category === "All Categories" && filter === "") || category === filter
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 md:ml-0">
        {/* Mobile header with toggle */}
        <div className="md:hidden bg-gray-800 p-4 sticky top-0 z-20 flex items-center justify-between shadow-md">
          <h1 className="text-xl font-bold">Blog Posts</h1>
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Header (desktop only) */}
        <div className="hidden md:block py-12 text-center">
          <h1 className="text-4xl font-bold">Blog Posts</h1>
          <div className="mt-2 mx-auto w-24 h-1 bg-blue-500"></div>
        </div>

        {/* Content section */}
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredPosts().map((post) => (
                <div key={post.id} className="flex flex-col h-full">
                  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col h-full transition-all duration-300 hover:shadow-blue-500/20 hover:translate-y-px border border-transparent hover:border-blue-500/30">
                    <figure className="overflow-hidden h-48">
                      <img 
                        src={post.image} 
                        alt="Post" 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </figure>
                    <div className="p-6 flex-grow">
                      <h2 className="font-bold text-xl mb-2 text-white line-clamp-2">
                        <Highlighter
                          highlightClassName="bg-blue-500/30 text-white px-1 rounded"
                          searchWords={[searchQuery]}
                          autoEscape={true}
                          textToHighlight={post.title}
                        />
                      </h2>
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        <Highlighter
                          highlightClassName="bg-blue-500/30 text-white px-1 rounded"
                          searchWords={[searchQuery]}
                          autoEscape={true}
                          textToHighlight={post.subtitle}
                        />
                      </p>
                    </div>
                    <div className="px-6 pb-6 mt-auto">
                      <div className="flex items-center justify-between">
                        <div className="px-3 py-1 text-sm bg-blue-600/20 text-blue-400 rounded-full">
                          {post.category}
                        </div>
                        <Link
                          to={`/post/${post._id}`}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 inline-flex items-center"
                        >
                          Read
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty state when no posts match the filter/search */}
          {!loading && getFilteredPosts().length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto flex items-center justify-center bg-blue-600/20 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No posts found</h3>
              <p className="text-gray-400">Try changing your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}