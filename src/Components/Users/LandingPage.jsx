import { Nav, NavDropdown, Button } from 'react-bootstrap';

function logout() {
    sessionStorage.removeItem('userCredential')
    // Delete the cookie somehow
    setCookie('userCredential', '', 0)
    window.location.reload()
}

// Use this down the road when you feel like it
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
const LandingPage = () => {
    const userCredential = getCookie('userCredential')
    const userInfo = JSON.parse(userCredential).user;

    return (<div id="landing-page">
        <h4 id='welcome-user'>Welcome, {userInfo.email}!<Button id='logout' onClick={logout}>Log out</Button></h4>
        <Nav variant="pills" id='landing-links' className='flex-column'>
            <Nav.Item>
                <Nav.Link href="/users/info/stats">Physician Phone and Fax Numbers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/users/info/analytics">Analytics</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/users/admin/users">Manage Users</Nav.Link>
            </Nav.Item>
            <hr />
            <Nav.Item>
                <NavDropdown id='landing-dropper' title="Change Patient Information">
                    <NavDropdown.Item href="/admin/paperwork">Paperwork</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/services">Services</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/testimonials">Testimonials</NavDropdown.Item>
                </NavDropdown>
            </Nav.Item>
        </Nav>
    </div>)


}

export { LandingPage, getCookie, setCookie };