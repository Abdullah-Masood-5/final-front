import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Navbar from './Components/Navbar';
import Tasks from "./Components/Tasks";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/hostdashboard" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
