import { Navbar, NavDropdown, Container, Nav, Image } from 'react-bootstrap'
// import {Link} from 'react-router-dom'

export default function navbar() {
    return (
        <Navbar id='navbar' expand="lg">
            <Container>
                <Navbar.Brand href="/"><Image src={'/Images/4p_logo.png'} alt='Four Peaks Surgery Center' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav id='nav-real-links' className="me-auto">
                        <Nav.Link href='/'>Home</Nav.Link>
                        {/* For Patients dropdown */}
                        <NavDropdown title="For Patients" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/patients/paperwork">Paperwork</NavDropdown.Item>
                            <NavDropdown.Item href="/about/services">Services</NavDropdown.Item>
                            <NavDropdown.Item href="/testimonials">Testimonials</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4" disabled>One Medical Passport</NavDropdown.Item>
                        </NavDropdown>
                        {/* End of the dropdown  */}
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/about/surgeons">Surgeons</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}