import { Nav, NavDropdown, Button, Container, Card } from 'react-bootstrap';
import { logout, CheckUser } from './AdminAppbar.jsx';



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
    CheckUser();


    const userCredential = getCookie('userCredential')
    const userInfo = JSON.parse(userCredential).user;
    console.log(userInfo);

    return (
        <Container id='content-page' fluid>
            {/* ===================== LEFT ===================== */}
            <Card className='content-left' id='content-left'>
                <h5>Admin Toolbox</h5>
                <Nav>
                    <Nav.Link href='/users/info/analytics' style={{ width: '100%' }} hidden={userInfo.email !== 'zaxdev59@gmail.com' ? true : false} disabled={userInfo.email !== 'zaxdev59@gmail.com' ? true : false}>Analytics</Nav.Link>
                    <Nav.Link href='/users/info/stats' style={{ width: '100%' }}>Physician Info</Nav.Link>
                    <NavDropdown id='toolbox' title='User Manager'>
                        <NavDropdown.Item href=''>Create</NavDropdown.Item>
                        <NavDropdown.Item href=''>View</NavDropdown.Item>
                        <NavDropdown.Item href=''>Update</NavDropdown.Item>
                        <NavDropdown.Item href=''>Delete</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Card>
            {/* ===================== RIGHT ===================== */}
            <Card id='user-landing-right' className='content-right' >
                {/* className='content-right' */}
                <div>
                    <h4>Welcome, {userInfo.providerData[0].displayName === null ? userInfo.email : userInfo.providerData[0].displayName} {userInfo.emailVerified === true ? (<abbr id='emailVerify-check' title='Email verified'>✔</abbr>) : (<abbr id='emailVerify-check' title='Email not verified'>❌</abbr>)}</h4>
                    <Button onClick={logout} variant='primary' id='landing-logout-btn'>Logout</Button>
                </div>
                <hr />
                <Card.Body>
                    <p>In this are you are able to <abbr title="If you're a manager">manage</abbr> users and change site information. User's that are not managers can view the collected information from Speckles if they need to get other physicians' phone and fax numbers.</p>
                </Card.Body>
            </Card>
        </Container>

    )


}

export { LandingPage, getCookie, setCookie };