import { Nav, NavDropdown, Button, Container, Card, Alert, CardGroup } from 'react-bootstrap';
import { logout, CheckUser, AdminAppBar } from './AdminAppbar.jsx';


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
    // Check that user is logged in
    CheckUser();

    // Manipulate + instantiate data
    const userCredential = getCookie('userCredential')
    const userInfo = JSON.parse(userCredential).user;

    // Breadcrumbs
    var pathRef = window.location.pathname;
    pathRef = pathRef.split('/')
    // pathRef = pathRef.shift()
    pathRef.shift();
    pathRef.unshift('home')

    return (<>
        <Alert id='page-title' variant="light">
            {pathRef.map((i) => {
                if (i !== pathRef[pathRef.length - 1]) {
                    return <span key={i} id='main-title-elm'>{i.toLocaleUpperCase()} &#8594; </span>
                } else { // If it's the last element
                    return <span key={i} id='main-title-elm'>{i.toLocaleUpperCase()}</span>
                }
            })}
            {/* <span id='main-title-elm'>{pathRef[pathRef.length - 1].toLocaleUpperCase()}</span> */}
            <div id='related-small' className='sm-nav'>

                <section style={{ width: '100%' }}>
                    <AdminAppBar />
                </section>
            </div>
        </Alert>
        <Container id='content-page' fluid>
            {/* ===================== LEFT ===================== */}
            <Card className='content-left' id='content-left'>
                <h5>Admin Toolbox</h5>
                <Nav>
                    <Nav.Link href='/users/info/analytics' style={{ width: '100%' }} hidden={userInfo.email !== 'zaxdev59@gmail.com' ? true : false} disabled={userInfo.email !== 'zaxdev59@gmail.com' ? true : false}>Analytics</Nav.Link>
                    <Nav.Link href='/users/info/stats' style={{ width: '100%' }} disabled={userInfo.emailVerified ? false : true}>Physician Info</Nav.Link>
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
                    <p>In this are you are able to <abbr title="If you're a manager">manage</abbr> users and change site information. User's that are not managers can view the collected information from Speckles if they need to get other physicians' phone and fax numbers. Please ensure access to this part of the website is limited and only available to trusted associates as it contains possibly sensitive patient/provider information.</p>
                    <CardGroup>
                        <Card hidden={userInfo.email !== 'zaxdev59@gmail.com' ? true : false}>
                            <Card.Header>Analytics</Card.Header>
                            <Card.Body>View website analytics and manipulate the collected data for whatever you want.</Card.Body>
                            <Card.Link  href='/users/info/analytics'><Button>Learn more</Button></Card.Link>
                        </Card>
                        <Card>
                            <Card.Header>Physician Information</Card.Header>
                            <Card.Body>View physician phone and fax information gathered via Speckles, our medical records software.</Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>Thing 3</Card.Header>
                            <Card.Body></Card.Body>
                        </Card>
                    </CardGroup>
                </Card.Body>
            </Card>
        </Container>

    </>)


}

export { LandingPage, getCookie, setCookie };