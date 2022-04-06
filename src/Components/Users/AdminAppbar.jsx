import { Nav, Navbar, NavDropdown, Form, FormControl, Button, Offcanvas, Container } from 'react-bootstrap';
import { getCookie, setCookie } from './LandingPage';
import { Outlet } from 'react-router-dom';

const logout = () => {
    sessionStorage.removeItem('userCredential')
    // Delete the cookie somehow
    setCookie('userCredential', '', 0)
    window.location.pathname = '/';
}

const CheckUser = async () => {
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
    if (userCookie === undefined) {
        window.location.pathname = '/login'
    } else {
        return null;
    }
}

const AdminAppBar = async () => {
    await CheckUser()


    const user_information = JSON.parse(getCookie('userCredential')).user;
    console.log(user_information)

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
                        <Nav className="justify-content-end flex-grow-1 pe-3" id='admin-nav-cont'>
                            <Container id='admin-nav-top'>
                                <h6>Welcome, <br />{user_information.providerData[0].displayName === '' ? user_information.user.email : user_information.providerData[0].displayName}</h6>
                                <Button onClick={logout} variant='primary' id='nav-logout-btn'>Logout</Button>
                            </Container>
                            <Nav.Link href="/users/landing">Home</Nav.Link>
                            <Nav.Link href="/users/info/stats">Physician Phone &amp; Fax Info</Nav.Link>
                            <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown className='child-dropdown' title="For Zack" id="offcanvasNavbarDropdown" disabled>
                                    <NavDropdown.Item href='#'>Something else here</NavDropdown.Item>
                                </NavDropdown>
                            </NavDropdown>
                        </Nav>
                        <br />
                        <br />
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                disabled
                            />
                            <Button variant="outline-success" disabled>Search</Button>
                        </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            <hr /><hr /><hr /><hr />
        </Navbar>
        <Outlet />
    </>)
}

export { AdminAppBar, logout, CheckUser }