import React, { useState, useEffect } from 'react';
import 'daisyui/dist/full.css'; // Import DaisyUI styles

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('sumit-token')) {
      window.location.href = '/login';
    }
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://server-vpao.onrender.com/getcontacts');
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setIsDeleting(true);
      try {
        const response = await fetch(`https://server-vpao.onrender.com/delcontact/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error deleting contact:', errorData);
          alert('Error deleting contact. Please try again later.');
        } else {
          setContacts(contacts.filter(contact => contact._id !== id));
          alert('Contact deleted successfully.');
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Error deleting contact. Please try again later.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      {contacts.length === 0 ? (
        <p>No contacts available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.message}</td>
                  <td>
                    <button
                      className={`btn btn-error ${isDeleting ? 'loading' : ''}`}
                      onClick={() => handleDelete(contact._id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
