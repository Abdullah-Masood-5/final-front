import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Navbar from './Components/Navbar';
import Tasks from "./Components/Tasks";
import HostBookings from "./Components/view_tasks";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Tasks" element={<Tasks />} />
                <Route path="/host/bookings" element={<HostBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
