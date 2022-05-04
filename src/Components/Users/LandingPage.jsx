import { Nav, NavDropdown, Button, Container, Card, Alert, CardGroup, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
        if (!loading) console.log(users);
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
const DeleteUserComp = () => {
    async function deleteUser(e) {
        // Prevent page refresh :)
        e.preventDefault();

        // Start the delete process
        // const [loading, setLoading] = useState(true);
        let auth = getAuth();


        console.log(auth.currentUser)
    }

    const renderTooltip = (props) => {
        <Tooltip id='something' {...props}>
            Simple tooltip!
        </Tooltip>
    }
    return (
        <Form onSubmit={deleteUser} autoComplete="off">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    Enter the email address of the account to delete
                </Form.Text>
            </Form.Group>
            <OverlayTrigger
                placement='right'
                delay={{ show: 200, hide: 400 }}
                overlay={renderTooltip}
            >
                <Button variant="danger" type="submit">
                    Delete
                </Button>
            </OverlayTrigger>
        </Form>
    )
}
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
    }
}
const LandingPage = () => {
    // Check that user is logged in
    CheckUser();
    var f;
    // eslint-disable-next-line
    !sessionStorage.getItem('modalProps') ? sessionStorage.setItem('modalProps', JSON.stringify({ base: 'nothing' })) : f = 'hm';

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
                return <CreateUserComp />;
            case 'View':
                return <ViewUsersComp />;
            case 'Update':
                return <UpdateUser />;
            case 'Delete':
                return <DeleteUserComp />;
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
                    <Nav.Link href='/users/info/stats' style={{ width: '100%' }} disabled={userInfo.emailVerified ? false : true}>Physician Info</Nav.Link>
                    <NavDropdown id='toolbox' title='User Manager'>
                        <NavDropdown.Item onClick={() => handleShow({ title: 'Create' })}>
                            Create
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleShow({ title: 'View' })}>
                            View
                        </NavDropdown.Item>
                        <NavDropdown.Item href=''>Update</NavDropdown.Item>
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