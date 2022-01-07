import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Modal, Button } from 'react-bootstrap'
import Footer from './Components/Footer.js'
import { Alert } from "react-bootstrap";
import AppBar from './Components/appbar.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import CarouselBanner from "./Components/Carousel.js";
import OSCBanner from "./Components/osc-banner.js";
import HomeCards from './Components/HomeCards.js';
// import RegisterForm from "./Components/RegisterForm.js";
// import LoginForm from './Components/LoginFile.js'
import DbFetch from "./Components/db_test";
import Surgeons from "./Components/Surgeons.js";
import Services from "./Components/Services.js";
import Anesthesiologists from "./Components/Anesthesia.js";
import ContactForm from "./Components/Contact.js";
import Paperwork from './Components/Paperwork.js'

function App() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  return (
    <Router>
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
        {/* About */}
        <Route path='/about' element={<DbFetch />} />
        <Route path='/about/surgeons' element={<Surgeons />} />
        <Route path='/about/services' element={<Services />} />
        <Route path='/about/anesthesia' element={<Anesthesiologists />} />

        {/* Patients */}
        <Route path='/patients/paperwork' element={<Paperwork />} />

        <Route path='/contact' element={<ContactForm />} />
        {/* Coming soon... */}
        {/* <Route path='/signup' element={<RegisterForm />} />
        <Route path='/secret' element={<LoginForm />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
