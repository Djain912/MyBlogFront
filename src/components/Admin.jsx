import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'daisyui/dist/full.css'; // Import DaisyUI styles

const Admin = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem('sumit-token')) {
      window.location.href = '/login';
    }
    const fetchData = async () => {
      try {
        // Fetch total posts
        const postsResponse = await fetch('https://server-vpao.onrender.com/totalposts');
        const postsData = await postsResponse.json();
        setTotalPosts(postsData.total);

        // Fetch total contacts
        const contactsResponse = await fetch('https://server-vpao.onrender.com/totalcontacts');
        const contactsData = await contactsResponse.json();
        setTotalContacts(contactsData.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sumit-token');
    window.location.href = '/login';
  }
  return (
    <div className="flex h-screen bg-base-200">
      {/* Sidebar */}
      <div className="w-64 bg-base-300 h-full shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="p-4">
          <ul className="menu p-0">
            <li>
              <Link to="/admin" className="btn btn-ghost w-full justify-start">Dashboard</Link>
            </li>
            <li>
              <Link to="/createpost" className="btn  btn-primary w-full justify-start">Createpost</Link>
            </li>
            <li>
              <Link to="/adminposts" className="btn btn-ghost w-full justify-start">Posts</Link>
              
            </li>
            
            <li>
              <Link to="/admincontacts" className="btn btn-ghost w-full justify-start">Contacts</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex flex-wrap   items-center justify-between p-4 bg-base-100 shadow-md">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div>
            {/* <button className="btn btn-primary mr-2">Profile</button> */}
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
          </div>
        </header>
        <main className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <Link to="/adminposts">
          <div className="card shadow-md bg-base-100">
              <div className="card-body">
                <h2 className="card-title">Total Posts</h2>
                <p>{totalPosts}</p>
              </div>
            </div>
          </Link>
           <Link to="/admincontacts">
           <div className="card shadow-md bg-base-100">
              <div className="card-body">
                <h2 className="card-title">Contacts</h2>
                <p>{totalContacts}</p>
              </div>
            </div>
           </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
