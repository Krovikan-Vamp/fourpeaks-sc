import { Nav, Navbar, NavDropdown, Form, FormControl, Button, Offcanvas, Container } from 'react-bootstrap';
import { getCookie, setCookie } from './LandingPage';
import { Outlet } from 'react-router-dom';

function logout() {
    sessionStorage.removeItem('userCredential')
    // Delete the cookie somehow
    setCookie('userCredential', '', 0)
    window.location.reload()
}

const CheckUser = () => {
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return undefined;
    }
    const userCookie = getCookie('userCredential');
    const userCredential = sessionStorage.getItem('userCredential');
    if (userCredential !== null && userCookie !== undefined) {
        return null;
    } else {
        window.location.pathname = '/login'
    }
}

const AdminAppBar = () => {
    CheckUser()
    const user_information = JSON.parse(getCookie('userCredential'));

    return (<>
        <CheckUser />
        <Navbar bg="light" id='admin-appbar' expand={false}>
            <Container fluid>
                <Navbar.Brand href="#">Administrator Navigation</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Admin Navigation</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Container id='admin-nav-top'>
                                <h6>Welcome, {}</h6>
                                <Button onClick={logout} variant='primary' id='nav-logout-btn'>Logout</Button>
                            </Container>
                            <Nav.Link href="/users/landing">Home</Nav.Link>
                            <Nav.Link href="/users/info/stats">Physician Phone &amp; Fax Info</Nav.Link>
                            <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown title="For Zack" id="offcanvasNavbarDropdown" disabled>
                                    <NavDropdown.Item href='#'>Something else here</NavDropdown.Item>
                                </NavDropdown>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            <hr /><hr /><hr /><hr />
        </Navbar>
        <Outlet />
    </>)
}

export { AdminAppBar }