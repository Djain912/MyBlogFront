import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUploader from 'quill-image-uploader';
import Loader from './Loader';
import 'daisyui/dist/full.css';  // Import DaisyUI styles

// Register Quill Image Uploader
Quill.register('modules/imageUploader', ImageUploader);

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }, { 'align': [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    [{ 'color': [] }, { 'background': [] }],
    ['clean'],
  ],
  imageUploader: {
    upload: async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'innovest');
      formData.append('cloud_name', 'djain');

      const response = await fetch('https://api.cloudinary.com/v1_1/djain/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.url; // Return the URL of the uploaded image
    },
  },
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'link', 'image',
  'color', 'background',
  'align',
];

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [postImg, setPostImg] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('sumit-token')) {
      window.location.href = '/login';
    }
    if (imgUrl) {
      postUpload();
    }
  }, [imgUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPostImg(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const sharePost = async () => {
    if (!title || !subtitle || !description || !category || !postImg) {
      alert('All fields are required');
      return;
    }
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', postImg);
      formData.append('upload_preset', 'innovest');
      formData.append('cloud_name', 'djain');
  
      const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/djain/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      const cloudinaryData = await cloudinaryResponse.json();
  
      if (!cloudinaryResponse.ok) {
        console.error('Cloudinary upload failed:', cloudinaryData);
        alert('Error uploading image. Please try again later.');
        return;
      }
  
      setImgUrl(cloudinaryData.url || cloudinaryData.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading the image. Please try again later.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const postUpload = async () => {
    try {
      setIsUploading(true);
      const postDataResponse = await fetch('https://server-vpao.onrender.com/createpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          subtitle,
          description,
          category,
          image: imgUrl,
        }),
      });
  
      const responseData = await postDataResponse.json();
  
      if (!postDataResponse.ok) {
        console.error('Post creation failed:', responseData);
        alert('Error creating post. Please try again later.');
        return;
      }
  
      console.log('Post created successfully:', responseData);
      alert('Post Shared Successfully');
  
      // Send notification to all subscribed users
      await fetch('https://server-vpao.onrender.com/sendmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          subtitle,
          description,
          category,
          image: imgUrl,
        }),
      });
    } catch (error) {
      console.error('Error sharing post:', error);
      alert('Error sharing post. Please try again later.');
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          className="input input-bordered"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          className="input input-bordered"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>Select category</option>
          <option value="Coding Problems">Coding Problems</option>
          <option value="Tech Fact">Tech Fact</option>
          <option value="Learnings">Learnings</option>
        </select>
        <ReactQuill
          value={description}
          onChange={setDescription}
          modules={modules}
          formats={formats}
          className="posttext"
          theme="snow"
          placeholder="Write your description..."
        />
        {previewUrl && <img src={previewUrl} alt="Preview" className="w-full h-auto mb-4 rounded-md" />}
        <input type="file" accept="image/*" onChange={handleImageChange} required className="file-input file-input-bordered w-full max-w-xs" />
      </div>
      <button className="btn btn-primary mt-4" onClick={sharePost} disabled={isUploading}>
        {isUploading ? <Loader /> : 'Share Post'}
      </button>
    </div>
  );
}
