import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Tasks.css";

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
        `${import.meta.env.VITE_API_BASE_URL}/api/task/docs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setListings(res.data);
    };

    fetchListings();
  }, []);

  useEffect(() => {
    if (editId) {
      const listingToEdit = listings.find((listing) => listing._id === editId);
      if (listingToEdit) {
        setFormData({
          title: listingToEdit.title,
          description: listingToEdit.description,
          due_date: listingToEdit.due_date.split("T")[0], // Format date
        });
      }
    }
  }, [editId, listings]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (editId) {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/task/docs/${editId}`,
        formData,
        config
      );
    } else {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/task/docs`,
        formData,
        config
      );
    }

    setEditId(null);
    setFormData({
      title: "",
      description: "",
      due_date: "",
    });

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/task/docs`,
      config
    );
    setListings(res.data);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/task/docs/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setListings(listings.filter((listing) => listing._id !== id));
  };

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">Your Tasks</h1>
      <form
        onSubmit={handleSubmit}
        className="tasks-form"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="tasks-input"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="tasks-input"
        />
        <label className="booking-page-date">Due Date:</label>
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          required
          className="tasks-input"
        />
        <button type="submit" className="tasks-button">
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <table className="tasks-table">
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
              <td>{listing.due_date.split("T")[0]}</td>
              <td>
                <button
                  onClick={() => setEditId(listing._id)}
                  className="tasks-edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="tasks-delete-button"
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
