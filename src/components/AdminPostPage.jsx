import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'daisyui/dist/full.css'; // Import DaisyUI styles

const AdminPostPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('sumit-token')) {
      window.location.href = '/login';
    }
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://server-vpao.onrender.com/getposts');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data); // Initialize with all posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      try {
        const response = await fetch(`https://server-vpao.onrender.com/delpost/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error deleting post:', errorData);
          alert('Error deleting post. Please try again later.');
        } else {
          setPosts(posts.filter(post => post._id !== id));
          setFilteredPosts(filteredPosts.filter(post => post._id !== id));
          alert('Post deleted successfully.');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post. Please try again later.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-base-200">
      <h1 className="text-3xl font-bold mb-6">Manage Posts</h1>
      
      {/* Search Bar */}
      <div className="mb-4 w-full max-w-lg">
        <input
          type="text"
          placeholder="Search posts..."
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full min-w-[800px]">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr key={post._id} className='divide-y'>
                  <td className="text-center">
                    <img src={post.image} alt={post.title} className="w-20 h-16 object-cover rounded-md" />
                  </td>
                  <td>{post.title}</td>
                  <td>{post.subtitle}</td>
                  <td>
                    <Link to={`/editpost/${post._id}`} className="btn btn-sm btn-primary mr-2">Edit</Link>
                    <button 
                      className="btn btn-sm btn-error mt-1"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No posts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPostPage;
