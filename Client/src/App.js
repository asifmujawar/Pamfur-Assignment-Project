import logo from './logo.svg';
import './App.css';
import Home from './Component/Home';
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import Login from './Component/Login';
import Register from './Component/Register';
import Profile from './Component/Profile';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
