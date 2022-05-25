import { Nav, NavDropdown, Button, Container, Card, Alert, CardGroup, Modal, Form, FloatingLabel, Toast, ToastContainer } from 'react-bootstrap';
import { logout, CheckUser, AdminAppBar } from './AdminAppbar.jsx';
import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { app } from '../../firebase.js'
import { DataGrid } from '@mui/x-data-grid'

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
async function userExists(props) {
    let isUser;
    await fetchSignInMethodsForEmail(props.auth, props.email)
        .then((res) => {
            res.length !== 0 ? isUser = true : isUser = false;
        })
        .catch((error) => {
            alert(`${error.code}`)
        });

    return isUser
}

const AddSurvey = () => {
    const [show, setShow] = useState(false)
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    async function createTestimonial(e) {
        e.preventDefault(); // Prevent page reload
        let date = e.target[0].value; // returns the month, year like this -> MM-YYYY
        let comments = e.target[1].value; // string
        date = date.split('-') // Sets `date` to ['MM', 'YYYY']
        date = { month: parseInt(date[1]), year: date[0], full_date: `${months[parseInt(date[1] - 1)]} ${date[0]}` } // date = {month: M, year: YYYY, full_date: "spelledmonth, YYYY"}

        await app.firestore().collection('Testimonials').doc().set({ month: date.month, year: parseInt(date.year), date_M_Y: date.full_date, comment: comments })
            .then(() => {
                setShow(true) // Shows a little badge if success
                e.target[1].value = '' // Clear the prompt
            })
    }
    return (
        <Form onSubmit={createTestimonial} autoComplete='off'>
            <Form.Group className='mb-3'>
                <Form.Label>Procedure or service date:</Form.Label>
                <Form.Control type='month' required />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Enter testimonial:</Form.Label>
                <FloatingLabel label='Patient Comments'>
                    <Form.Control as='textarea' style={{ height: '135px' }} placeholder='Patient Comments' required />
                </FloatingLabel>
            </Form.Group>
            <Button variant='primary' type='submit'>Submit</Button>

            <ToastContainer position='bottom-end'>
                <Toast bg='#d8e1f2' id='success-toast-alert' onClose={() => setShow(false)} show={show} delay={2700} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Testimonial Added</strong>
                        <small>seconds ago</small>
                    </Toast.Header>
                    <Toast.Body style={{ backgroundColor: '#d8e1f2' }}>Woohoo, this upload was successful!</Toast.Body>
                </Toast>
            </ToastContainer>
        </Form>
    )
}

const CreateUserComp = () => {
    async function createUser(e) {
        e.preventDefault();
        const details = {
            email: e.target[0].value,
            password: e.target[1].value,
            adminValue: e.target[2].checked,
            auth: getAuth()
        }
        const userDoesExist = await userExists(details);
        console.log(`${userDoesExist} => "${details.email}"`)

        if (!userDoesExist) {
            await createUserWithEmailAndPassword(details.auth, details.email, details.password)
                .then(async () => {
                    await app.firestore().collection(`Users`).doc(details.email).set({ id: Math.ceil(Math.random() * 100000), email: details.email, password: window.btoa(window.btoa(details.password)), isAdmin: details.adminValue })
                    alert(`Created account for ${details.email} successfully!`)
                });
            if (details.adminValue) {
                await app.firestore().collection(`Admin Users`).doc(details.email).set({ email: details.email });
            }
        } else {
            alert(`Email already in use!`)
        }
        // eslint-disable-next-line
        window.location.pathname = window.location.pathname
    }

    return (
        <Form onSubmit={createUser} autoComplete="off">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share this email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Make user administrator" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}
const ViewUsersComp = () => {
    // Getting the users from Firebase/Firestore collection "Users"
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    //eslint-disable-next-line
    useEffect(async () => {
        await getUsers();
        // if (!loading) console.log(users);
        //eslint-disable-next-line
    }, []);
    async function getUsers() {
        setLoading(true)
        const ref = await app.firestore().collection(`Users`).orderBy('email', 'asc')

        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            });
            setUsers(items);
            setLoading(false);
        })
    }

    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'email', headerName: 'Email Address', minWidth: 450 }
    ]


    // Return some JSX
    if (loading) {
        return (
            <h1>Loading users...</h1>
        )
    }
    return (
        <DataGrid

            autoHeight
            rows={users}
            columns={columns}
            // checkboxSelection
            hideFooter
            getRowClassName={(params) => params.row.isAdmin ? `admin-row-color` : ``}
        >

        </DataGrid>)
}
const UpdateUser = () => {
    return (<></>)
}
// Still needs to be finished 😁
const DeleteUserComp = () => {
    const [show, setShow] = useState(false)
    async function deleteUser(e) {
        // Prevent page refresh :)
        e.preventDefault();
        const annulEmail = e.target[0].value;
        const isExistingUser = await app.firestore().collection('Users').doc(annulEmail).get().then(snap => snap.exists);
        console.log(annulEmail)

        !isExistingUser ? alert(`User does not exist!`) : 
        // Start the delete process
        await app.firestore().collection('Users').doc(annulEmail).delete()
            .then(() => {
                try {
                    app.firestore().collection('Admin Users').doc(annulEmail).delete().then(() => {
                        // Show the toast that it was deleted!
                        setShow(true);
                        e.target[0].value = ``;
                    })
                } catch (err) {
                    console.log(`Something broke`)
                    console.error(err)
                }
            });
        

    }
    return (
        <Form onSubmit={deleteUser} autoComplete="off">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <p style={{ fontStyle: 'italic' }}>Deleting a user here only removes their access to restricted pages, <b>not</b> their login.</p>
                <Form.Label>Annul Email address:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required />
                <Form.Text className="text-muted">
                    Remember to delete user from Firebase
                </Form.Text>
            </Form.Group>
            <Button variant="danger" type="submit">Delete</Button>
            <ToastContainer position='bottom-end'>
                <Toast bg='danger' id='success-toast-alert' onClose={() => setShow(false)} show={show}>
                    <Toast.Header>
                        <strong className="me-auto">User Deleted</strong>
                        <small>seconds ago</small>
                    </Toast.Header>
                    <Toast.Body style={{ backgroundColor: '#F5F5F5' }}>User deleted successfully! Delete their login <a href='https://console.firebase.google.com/project/fourpeaks-sc/authentication/users'>here</a></Toast.Body>
                </Toast>
            </ToastContainer>
        </Form>
    )
}
// Remove above comment
const pageElms = {
    create: {
        name: 'Create',
        header: 'Create new user'
    },
    view: {
        name: 'View',
        header: 'All Users'
    },
    update: {
        name: 'Update'
    },
    delete: {
        name: 'Delete',
        header: 'Remove Users'
    },
    survey: {
        name: 'Survey',
        header: 'Upload Patient Testimonial'
    }
}
const LandingPage = () => {
    // Check that user is logged in
    CheckUser();
    // Manipulate + instantiate data
    const userCredential = getCookie('userCredential')
    const userInfo = JSON.parse(userCredential).user;

    var f;
    // eslint-disable-next-line
    !sessionStorage.getItem('modalProps') ? sessionStorage.setItem('modalProps', JSON.stringify({ base: 'nothing' })) : f = 'hm';
    // eslint-disable-next-line
    sessionStorage.getItem('modalProps') === undefined ? sessionStorage.setItem('modalProps', JSON.stringify({ base: 'nothing' })) : f = 'hm';

    const [show, setShow] = useState(false);

    const handleShow = (props) => {
        setShow(true);

        // Switch-case for modal props
        switch (props.title) {
            case 'Create':
                sessionStorage.setItem('modalProps', JSON.stringify(pageElms.create));
                break;
            case 'View':
                sessionStorage.setItem('modalProps', JSON.stringify(pageElms.view));
                break;
            case 'Delete':
                sessionStorage.setItem('modalProps', JSON.stringify(pageElms.delete));
                break;
            case 'Survey':
                sessionStorage.setItem('modalProps', JSON.stringify(pageElms.survey))
                break;
            default:
                break;
        }
    }
    const handleClose = () => setShow(false);


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
                return <CreateUserComp />;
            case 'View':
                return <ViewUsersComp />;
            case 'Update':
                return <UpdateUser />;
            case 'Delete':
                return <DeleteUserComp />;
            case 'Survey':
                return <AddSurvey />;
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
        <Modal id='toolbox-modal' show={show} onHide={handleClose} centered>
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
                    <Nav.Link href='/users/info/stats' style={{ width: '100%' }}>Physician Info</Nav.Link>
                    <NavDropdown id='toolbox' hidden={''} title='User Manager'>
                        <NavDropdown.Item onClick={() => handleShow({ title: 'Create' })}>Create</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleShow({ title: 'View' })}>View</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleShow({ title: 'Delete' })}>Delete</NavDropdown.Item>
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
                    <CardGroup id='user-landing-cg'>
                        <Card hidden={userInfo.email !== 'zaxdev59@gmail.com' ? true : false}>
                            <Card.Header>Analytics</Card.Header>
                            <Card.Body>View website analytics and manipulate the collected data for whatever you want.</Card.Body>
                            <Card.Link href='/users/info/analytics'><Button>Learn more</Button></Card.Link>
                        </Card>
                        <Card>
                            <Card.Header>Physician Information</Card.Header>
                            <Card.Body>View physician phone and fax information gathered via Speckles, our medical records software.</Card.Body>
                            <Card.Link href='users/info/stats'><Button>View Numbers</Button></Card.Link>
                        </Card>
                        <Card>
                            <Card.Header>Add Patient Survey</Card.Header>
                            <Card.Body>Click to create a new patient survery element to view on the <a href='/testimonials'>testimonials</a> page.</Card.Body>
                            <Card.Link><Button onClick={() => handleShow({ title: 'Survey' })}>Add testimonial</Button></Card.Link>
                        </Card>
                    </CardGroup>
                </Card.Body>
            </Card>
        </Container>

    </>)


}

export { LandingPage, getCookie, setCookie };