import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import "daisyui/dist/full.css"; // Import DaisyUI styles
import Loader from "./Loader"; // Assuming you have a Loader component

// Register Quill Image Uploader
Quill.register("modules/imageUploader", ImageUploader);

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }, { align: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
  imageUploader: {
    upload: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "innovest");
      formData.append("cloud_name", "djain");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/djain/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.url; // Return the URL of the uploaded image
    },
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "color",
  "background",
  "align",
];

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    subtitle: "",
    image: "",
    description: "",
    category: "",
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false); // New state for image upload

  useEffect(() => {
    if (!localStorage.getItem("sumit-token")) {
      window.location.href = "/login";
    }
    console.log("Fetching post data...");
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://server-vpao.onrender.com/getposts/${id}`
        );
        const data = await response.json();
        console.log("Fetched post data:", data);
        setPost(data);
        setPreviewUrl(data.image);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setIsUploadingImage(true); // Set to true when starting the upload

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "innovest");
        formData.append("cloud_name", "djain");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/djain/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        setPost({
          ...post,
          image: data.url,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again later.");
      } finally {
        setIsUploadingImage(false); // Set to false when upload is finished
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      title: post.title,
      subtitle: post.subtitle,
      description: post.description,
      category: post.category,
      image: post.image,
    };

    try {
      const response = await fetch(
        `https://server-vpao.onrender.com/updatepost/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating post:", errorData);
        alert("Error updating post. Please try again later.");
      } else {
        alert("Post updated successfully!");
        navigate("/adminposts");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-base-200">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <div className="max-w-3xl mx-auto bg-base-100 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              type="text"
              className="input input-bordered w-full"
              value={post.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              name="subtitle"
              type="text"
              className="input input-bordered w-full"
              value={post.subtitle}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              className="select select-bordered w-full"
              value={post.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Coding Problems">Coding Problems</option>
              <option value="Tech Fact">Tech Fact</option>
              <option value="Learnings">Learnings</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <ReactQuill
              value={post.description}
              onChange={(value) => setPost({ ...post, description: value })}
              modules={modules}
              formats={formats}
              className="posttext"
              theme="snow"
              placeholder="Write your description..."
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium mb-1 mr-4">Image</label>
            {previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md mb-2"
                />
                {isUploadingImage && (
                  <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 bg-gray-200 rounded-md">
                    <Loader /> {/* Display loader */}
                  </div>
                )}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full max-w-xs ml-4"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader /> : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
