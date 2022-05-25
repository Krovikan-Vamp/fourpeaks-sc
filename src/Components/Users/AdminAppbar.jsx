import { Nav, Navbar, Button, Offcanvas, Container } from 'react-bootstrap';
import { getCookie, setCookie } from './LandingPage';
import { Outlet } from 'react-router-dom';

const logout = () => {
    sessionStorage.removeItem('userCredential')
    // Delete the cookie somehow
    setCookie('userCredential', '', 0)
    window.location.pathname = '/';
}

function CheckUser() {
    // Try to parse the cookie and use information
    try {
        let temp = JSON.parse(getCookie(`userCredential`))
        temp.user.email = null
    } catch (SyntaxError) {
        alert(`Not logged in!`)
        window.location.pathname = `/login`
    }
    return null
}

const AdminAppBar = () => {
    CheckUser() // No Need to have this here if it's in the component?


    const userInfo = JSON.parse(getCookie('userCredential')).user;
    // console.log(userInfo)

    return (<>
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
                        </Nav>
                        <br />
                        <br />
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            <hr /><hr /><hr /><hr />
        </Navbar>
        <Outlet />
    </>)
}

export { AdminAppBar, logout, CheckUser }