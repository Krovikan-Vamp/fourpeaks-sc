import { Nav, NavDropdown, Button, Container, Card, Alert, CardGroup, Modal, Form } from 'react-bootstrap';
import { logout, CheckUser, AdminAppBar } from './AdminAppbar.jsx';
import { useState } from 'react'


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


const CreateUser = () => {

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}
const Viewuser = () => {
    return (<></>)
}
const UpdateUser = () => {
    return (<></>)
}
const DeleteUser = () => {
    return (<></>)
}
const pageElms = {
    create: {
        name: 'Create',
        header: 'Create new user'
    },
    view: {
        name: 'View'
    },
    update: {
        name: 'Update'
    },
    delete: {
        name: 'Delete'
    }
}
const LandingPage = () => {
    // Check that user is logged in
    CheckUser();

    const [show, setShow] = useState(false);

    var hook;
    const handleShow = (props) => {
        setShow(true);
        console.log(hook)
        // Switch/case for modal props
        switch (props.title) {
            case 'Create':
                console.log(`showing create!`);
                sessionStorage.setItem('modalProps', JSON.stringify(pageElms.create));
                break;
            case 'View':
                console.log(`You clicked the view one!`);
                sessionStorage.setItem('modalProps', JSON.stringify(pageElms.view));
                break;
            default:
                break;
        }
    }
    const handleClose = () => setShow(false);

    // Manipulate + instantiate data
    const userCredential = getCookie('userCredential')
    const userInfo = JSON.parse(userCredential).user;

    // Breadcrumbs
    var pathRef = window.location.pathname;
    pathRef = pathRef.split('/')
    // pathRef = pathRef.shift()
    pathRef.shift();
    pathRef.unshift('home')

    const mInfo = JSON.parse(sessionStorage.getItem('modalProps'));

    function renderSwitch(props) {
        switch (props) {
            case 'Create':
                return <CreateUser />;
            case 'View':
                return <Viewuser />;
            case 'Update':
                return <UpdateUser />;
            case 'Delete':  
                return <DeleteUser />;
            default:
                return;
        }
        
    }
    return (<>
        {/* I really need to make a breadcrumbs element 🧐 */}
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

        {/* item modals */}
        <Modal id='create-id' show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{mInfo.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body id='modal-body-hook'>
                {renderSwitch(mInfo.name)}
            </Modal.Body>

        </Modal>
        <Container id='content-page' fluid>
            {/* ===================== LEFT ===================== */}
            <Card className='content-left' id='content-left'>
                <h5>Admin Toolbox</h5>
                <Nav>
                    <Nav.Link href='/users/info/analytics' style={{ width: '100%' }} hidden={userInfo.email !== 'zaxdev59@gmail.com' ? true : false} disabled={userInfo.email !== 'zaxdev59@gmail.com' ? true : false}>Analytics</Nav.Link>
                    <Nav.Link href='/users/info/stats' style={{ width: '100%' }} disabled={userInfo.emailVerified ? false : true}>Physician Info</Nav.Link>
                    <NavDropdown id='toolbox' title='User Manager'>
                        <NavDropdown.Item href='' onClick={() => handleShow({ title: 'Create' })}>
                            Create
                        </NavDropdown.Item>
                        <NavDropdown.Item href='' onClick={() => handleShow({ title: 'View' })}>
                            View
                        </NavDropdown.Item>
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
                            <Card.Link href='/users/info/analytics'><Button>Learn more</Button></Card.Link>
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