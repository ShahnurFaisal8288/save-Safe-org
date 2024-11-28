import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">

        <Sidebar />
        <div className="main-panel">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
