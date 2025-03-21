import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Carddisplay from "./components/Carddisplay";
import Stat from "./components/Stat";
import Getpost from "./components/Getpost";
import About from './components/About';
import Postdetail from './components/Postdetail';
import Createpost from './components/Createpost';
import Contact from './components/Contact';
import Admin from './components/Admin';
import AdminPostPage from './components/AdminPostPage';
import EditPostPage from './components/EditPostPage';
import AdminContacts from './components/AdminContacts';
import Subscribe from './components/Subscribe';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import TermsAndConditions from './components/TermsAndConditions';
import Error from './components/Error';

export default function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Carddisplay />} />
          <Route path="/stats" element={<Stat />} />
          <Route path="/getpost" element={<Getpost />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:postId" element={<Postdetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/tandc" element={<TermsAndConditions />} />
          

          {/* Admin Routes with ProtectedRoute HOC */}
          <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
          <Route path="/createpost" element={<ProtectedRoute element={<Createpost />} />} />
          <Route path="/adminposts" element={<ProtectedRoute element={<AdminPostPage />} />} />
          <Route path="/editpost/:id" element={<ProtectedRoute element={<EditPostPage />} />} />
          <Route path="/admincontacts" element={<ProtectedRoute element={<AdminContacts />} />} />
      
          <Route path='/*' element={<Error />} />
        </Routes>
      
      </div>
    </Router>
  );
}

