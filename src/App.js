import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/frontend/Home";
import Men from "./components/frontend/Men";
import Kid from "./components/frontend/Kid";
import Women from "./components/frontend/Women";
import Services from "./components/frontend/Services";
import About from "./components/everywhere/About";
import Contact from "./components/frontend/Contact";

import Layout from "./components/everywhere/Layout";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/css/style.css";
import Login from "./components/backened/Login";
import Dashboard from "./components/backened/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequiredAuth from "./components/everywhere/RequiredAuth";

function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/men" element={<Layout><Men /></Layout>} />
        <Route path="/kid" element={<Layout><Kid /></Layout>} />
        <Route path="/women" element={<Layout><Women /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/dashboard" element={
          //protected route
          <RequiredAuth>
            <Layout><Dashboard /></Layout>
            
          </RequiredAuth>
          }/>

      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-center" />
   </>
  );
}

export default App;