import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">

        <Sidebar />
        <div className="main-panel">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
