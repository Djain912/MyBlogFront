import React, { useState } from 'react';
import 'daisyui/dist/full.css'; // Import DaisyUI styles

const Contact = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value
    });
  };

  const onContact = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = contact;

    try {
      const response = await fetch('https://server-vpao.onrender.com/contact', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ name, email, phone, message })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed:", errorData);
        setAlert({ show: true, type: "error", message: errorData.message });
        setTimeout(() => setAlert({ show: false, type: "", message: "" }), 2000);
      } else {
        const successData = await response.json();
        console.log(successData);
        setAlert({ show: true, type: "success", message: "Contacted Successfully" });
        setContact({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setAlert({ show: false, type: "", message: "" }), 2000);
      }
    } catch (error) {
      console.error('Error while contacting:', error);
      setAlert({ show: true, type: "error", message: 'An error occurred while sending the message.' });
      setTimeout(() => setAlert({ show: false, type: "", message: "" }), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <form className="space-y-4" onSubmit={onContact}>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full"
              value={contact.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full"
              value={contact.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              name="phone"
              type="text"
              className="input input-bordered w-full"
              value={contact.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              className="textarea textarea-bordered w-full"
              rows={4}
              value={contact.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          {alert.show && alert.type === "error" && (
            <div role="alert" className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{alert.message}</span>
            </div>
          )}
          {alert.show && alert.type === "success" && (
            <div role="alert" className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{alert.message}</span>
            </div>
          )}
          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary w-full">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
