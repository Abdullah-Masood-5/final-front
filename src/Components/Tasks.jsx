import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/HostDashboard.css";
const Tasks = () => {
  const [listings, setListings] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/listings`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setListings(res.data);
    };

    fetchListings();
  }, []);

  // Set form data for editing a listing
  useEffect(() => {
    if (editId) {
      const listingToEdit = listings.find((listing) => listing._id === editId);
      if (listingToEdit) {
        setFormData({
          title: listingToEdit.title,
          description: listingToEdit.description,
          due_date: listingToEdit.due_date,
        });
      }
    }
  }, [editId, listings]);

  const handleFileChange = (e) => {
    setFormData({ ...formData });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const form = new FormData();

    for (let key in formData) form.append(key, formData[key]);

    if (editId) {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/listings/${editId}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
      // Add a new listing
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/listings`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    setEditId(null);
    setFormData({
      title: "",
      description: "",
      due_date: "",
    });
    // Re-fetch listings after submit to get updated data
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/admin/listings`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setListings(res.data);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/admin/listings/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setListings(listings.filter((listing) => listing._id !== id));
  };

  return (
    <div className="host-dashboard-container">
      <h1 className="host-dashboard-title">Your Listings</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="host-dashboard-form"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="host-dashboard-input"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="host-dashboard-input"
        />
        <label className="booking-page-date">Due date: </label>
        <input type="date" name="due_date" onChange={handleChange} required />
        <button type="submit" className="host-dashboard-button">
          {editId ? "Update Listing" : "Add Listing"}
        </button>
      </form>

      <table className="host-dashboard-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing._id}>
              <td>{listing.title}</td>
              <td>{listing.due_date}</td>
              <td>
                <button
                  onClick={() => setEditId(listing._id)}
                  className="host-dashboard-edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="host-dashboard-delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
