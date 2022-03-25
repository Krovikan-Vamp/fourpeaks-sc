import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment, useState } from "react";
import { Modal, Button } from 'react-bootstrap'
import Footer from './Components/Footer.js'
import { Alert } from "react-bootstrap";
import AppBar from './Components/appbar.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import CarouselBanner from "./Components/Carousel.js";
import OSCBanner from "./Components/osc-banner.js";
import HomeCards from './Components/HomeCards.js';
import DbFetch from "./Components/db_test";
import Surgeons from "./Components/Surgeons.js";
import Services from "./Components/Services.js";
import Anesthesiologists from "./Components/Anesthesia.js";
import Contact from "./Components/Contact.jsx";
import Paperwork from './Components/Paperwork.js'
import Testimonials from "./Components/Testimonials.js";
import Suggestions from "./Components/Users/suggestions.tsx";
import Cookies from './Components/cks.js';
import {LoginForm} from './Components/Users/LoginPage.jsx';
import { LandingPage } from "./Components/Users/LandingPage.jsx";
import Collections from './Components/Users/Collections.jsx'
import { CheckUser } from "./Components/Users/CheckUser.jsx";

function App() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  return (
    <Router>
      <Cookies />
      <Alert id='covid-banner' variant='danger'>
        <Button id='modal-button' variant='danger' onClick={handleShow}>COVID-19</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>A Message from Four Peaks</Modal.Title>
          </Modal.Header>
          <Modal.Body>Four Peaks Surgery Center actively monitors CDC Guidelines and practices for the Covid-19 pandemic, please remember to bring your mask while you're with us. Please call us immediately if you are experiencing symptoms before/near your scheduled surgery.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Got it, thanks!
            </Button>
          </Modal.Footer>
        </Modal>
      </Alert>
      <AppBar />

      {/* ROUTES START */}
      <Routes>
        <Route path='/' element={<><CarouselBanner /><HomeCards /><OSCBanner /></>} />
        {/* Informational paths */}
        <Route path='/about' element={<DbFetch />} />
        <Route path='/about/surgeons' element={<Surgeons />} />
        <Route path='/about/services' element={<Services />} />
        <Route path='/about/anesthesia' element={<Anesthesiologists />} />
        <Route path='/patients/paperwork' element={<Paperwork />} />
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path='/contact' element={<Contact />} />

        {/* Staff stuff */}
        {/* <CheckUser /> */}
        <Route path='/users/login' element={<LoginForm />} />
        <Route path='/users/landing' element={<><CheckUser /><LandingPage /></>} />
        
        {/* Staff Information */}
        <Route path='/users/info/stats' element={<><CheckUser /><Suggestions /></>} />

        {/* For Zack */}
        <Route path='/users/info/analytics' element={<><CheckUser /><Collections /></>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
