import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Tasks.css";
const Tasks_view = () => {
  const [listings, setListings] = useState([]);
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

  return (
    <div className="tasks-container">
      {listings.map((listing) => (
        <div key={listing._id}>
          <p >
            <strong>Name:</strong> {listing.title}
          </p>
          <p>
            <strong>Description:</strong> {listing.description}
          </p>
          <p>
            <strong>Due Date:</strong> {listing.due_date}
          </p>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default Tasks_view;
