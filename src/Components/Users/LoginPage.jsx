import { Form, Button } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

async function login_firebase(e) {
    e.preventDefault(); // Prevent page reload
    const email = e.target[0].value;
    const password = e.target[1].value;
    const auth = getAuth();

    // See if user already exists
    let isUser;
    await fetchSignInMethodsForEmail(auth, email)
        .then((res) => {
            res.length !== 0 ? isUser = true : isUser = false;
        })
        .catch((error) => {
            alert(`${error.code}`)
        });

    if (isUser) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                try {
                    const stringInfo = JSON.stringify(userCredential)
                    sessionStorage.setItem('userCredential', stringInfo);
                    setCookie('userCredential', stringInfo, 14)
                    window.location.pathname = '/users/landing';
                } catch (QuotaExceededError) {
                    alert('You need to allow Session Storage to log in')
                }
                finally {
                    // window.location.pathname = '/'
                }
                // window.location.pathname = '/'
            })
            .catch((error) => {
                error.code.indexOf('wrong-password') !== -1 ? alert('The password you entered is incorrect!') : alert(error.code);
            });

    } else if (!isUser) {
        alert('No account found, contact zack@fourpeakssurgery.com');
        navigator.clipboard.writeText('zack@fourpeakssurgery.com');
    }

    // Don't do this!
    // createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             alert(`Thanks for creating an account!`);
    //             try {
    //                 sessionStorage.setItem('userCredential', JSON.stringify(userCredential))
    //                 window.location.pathname = '/users/landing';
    //             } catch (QuotaExceededError) {
    //                 alert('You need to allow Session Storage to log in')
    //             } finally {
    //                 // window.location.pathname = '/'
    //             }
    //         })
    //         .catch((error) => {
    //             alert(`uh oh!\n${error.code}`)
    //         })

    let isLoggedIn = sessionStorage.getItem('userEmail') > 0;

    if (isLoggedIn) {
        return (
            LoginForm = () => <h1>LOGIN SUCCESS</h1>
        )
    } else {
        return (
            LoginForm = () => <h1>LOGIN FAILED</h1>
        )
    }
}


let LoginForm = () => {
    // "/users/login"
    return (
        <Form onSubmit={login_firebase} id="login_form">
            <h3 id="form-header">Login</h3>
            <hr />
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <Button href='/users/landing' id='homepage-button' variant="primary" type="submit">
                User Home Page
            </Button>
        </Form>
    )
}

export { LoginForm };