import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/HostDashboard.css";
const Tasks = () => {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/docs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setListings(res.data);
    };

    fetchListings();
  }, []);

  return (
    <div className="host-dashboard-container">
      {listings.map((listing) => (
        <div key={listing._id}>
          <p className="profile-username">
            <strong>Name:</strong> {listing.title}
          </p>
          <p className="profile-username">
            <strong>Description:</strong> {listing.description}
          </p>
          <p className="profile-username">
            <strong>Due Date:</strong> {listing.due_date}
          </p>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
