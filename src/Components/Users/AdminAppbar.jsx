import { Nav, Navbar, NavDropdown, Form, FormControl, Button, Offcanvas, Container } from 'react-bootstrap';
import { getCookie, setCookie } from './LandingPage';
import { Outlet } from 'react-router-dom';

const logout = () => {
    sessionStorage.removeItem('userCredential')
    // Delete the cookie somehow
    setCookie('userCredential', '', 0)
    window.location.pathname = '/';
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
    if (userCookie === undefined) {
        window.location.pathname = '/login'
    } else {
        return null;
    }
}

const AdminAppBar = () => {
    CheckUser()


    const userInfo = JSON.parse(getCookie('userCredential')).user;
    console.log(userInfo)

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
                        <h6 id='custom-welcome'>Welcome,<br />{userInfo.email}</h6>
                        <Button onClick={logout} variant='primary' id='landing-logout-btn'>Logout</Button>
                        <br /><br />
                        <Nav>
                            <Nav.Link href='/users/landing' hidden={window.location.pathname === '/users/landing' ? true : false}>Home</Nav.Link>
                            <Nav.Link href='/users/info/analytics' style={{ width: '100%' }} hidden={userInfo.email !== 'zaxdev59@gmail.com' ? true : false} disabled={userInfo.email !== 'zaxdev59@gmail.com' ? true : false}>Analytics</Nav.Link>
                            <Nav.Link href='/users/info/stats' style={{ width: '100%' }} disabled={userInfo.emailVerified ? false : true}>Physician Info</Nav.Link>
                            <NavDropdown id='toolbox' title='User Manager'>
                                <NavDropdown.Item href=''>Create</NavDropdown.Item>
                                <NavDropdown.Item href=''>View</NavDropdown.Item>
                                <NavDropdown.Item href=''>Update</NavDropdown.Item>
                                <NavDropdown.Item href=''>Delete</NavDropdown.Item>
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