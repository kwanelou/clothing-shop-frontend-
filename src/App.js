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
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./components/css/style.css";
import Login from "./components/backened/Login";
import Dashboard from "./components/backened/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequiredAuth from "./components/everywhere/RequiredAuth";
import {default as Showservices} from "./components/backened/services/Show";
import {default as Createservices} from "./components/backened/services/Create";
import {default as Editservices} from "./components/backened/services/Edit";
import {default as MenPage} from "./components/backened/menPage/Show";
import {default as CreateMenPage} from "./components/backened/menPage/Create";
import {default as EditMenPage} from "./components/backened/menPage/Edit";
import {default as Womenpage} from "./components/backened/womenpage/Show";
import {default as CreateWomen} from "./components/backened/womenpage/Create";
import {default as EditWomen} from "./components/backened/womenpage/Edit";
import {default as Showkids} from "./components/backened/kidsPage/Show";
import {default as Createkids} from "./components/backened/kidsPage/Create";
import {default as Editkids} from "./components/backened/kidsPage/Edit";
import Register from "./components/backened/Register";
import Profile from "./components/frontend/ProfileUser";
import ShowOrders from "./components/backened/ShowOrders";
import MyOrders from "./components/backened/Myorders";
import ForgotPassword from "./components/backened/ForgotPassword";
import Cart from "./components/everywhere/Usercart";
import AdminOrders from "./components/backened/AdminOrders";
import Checkout from "./components/everywhere/Checkout";



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
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/myorder" element={<Layout><MyOrders /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/checkout" element={<Checkout />} />
        
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/dashboard" element={
          //protected route
          <RequiredAuth>
            <Layout><Dashboard /></Layout>
            
          </RequiredAuth>
          }/>
        <Route path="/showService" element={
          //protected route
          <RequiredAuth>
            <Layout><Showservices /></Layout>
            
          </RequiredAuth>
          }/>
        <Route path="/createService" element={
          //protected route
          <RequiredAuth>
            <Layout><Createservices /></Layout>
            
          </RequiredAuth>
          }/>
        <Route path="/editService/:id" element={
          //protected route
          <RequiredAuth>
            <Layout><Editservices /></Layout>
            
          </RequiredAuth>
          }/>
        <Route path="/menPage" element={
          //protected route
          <RequiredAuth>
            <Layout><MenPage /></Layout>
            
          </RequiredAuth>
          }/>
        <Route path="/CreatemenPage" element={
          //protected route
          <RequiredAuth>
            <Layout><CreateMenPage /></Layout>
            
          </RequiredAuth>
          }/>
        <Route path="/editMen/:id" element={
          //protected route
          <RequiredAuth>
            <Layout><EditMenPage /></Layout>
            
          </RequiredAuth>
          }/>
          <Route path="/womenpage" element={
          //protected route
          <RequiredAuth>
            <Layout><Womenpage /></Layout>
            
          </RequiredAuth>
          }/><Route path="/createWomen" element={
          //protected route
          <RequiredAuth>
            <Layout><CreateWomen /></Layout>
            
          </RequiredAuth>
          }/>
          <Route path="/editWomen/:id" element={
          //protected route
          <RequiredAuth>
            <Layout><EditWomen /></Layout>
            
          </RequiredAuth>
          }/>
          <Route path="/showKids" element={
          //protected route
          <RequiredAuth>
            <Layout><Showkids /></Layout>
            
          </RequiredAuth>
          }/>
          <Route path="/createKids" element={
          //protected route
          <RequiredAuth>
            <Layout><Createkids /></Layout>
            
          </RequiredAuth>
          }/>
          <Route path="/editkids/:id" element={
          //protected route
          <RequiredAuth>
            <Layout><Editkids /></Layout>
            
          </RequiredAuth>
          }/>
          <Route path="/showorders" element={
          //protected route
          <RequiredAuth>
            <Layout><ShowOrders /></Layout>
            
          </RequiredAuth>
          }/>
          <Route path="/adminorders" element={
          //protected route
          <RequiredAuth>
            <Layout><AdminOrders /></Layout>
            
          </RequiredAuth>
          }/>

      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-center" />
   </>
  );
}

export default App;