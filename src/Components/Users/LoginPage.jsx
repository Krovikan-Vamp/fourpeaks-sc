import { Alert, Form, Button } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { getCookie, setCookie } from './LandingPage';

let spanInfo = null;

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
                console.log(userCredential)  
                if (!userCredential.user.emailVerified) {
                    getCookie('verificationEmail') === undefined ? sendEmailVerification(auth.currentUser) : document.querySelector('#spanInfo').textContent = 'Email not verified, check your email.';
                    setCookie('verificationEmail', new Date().getTime(), 1)

                    document.querySelector('#spanInfo').classList.remove("is-hidden")
                    return false;
                } else {
                    // alert('Please check your email for verification');
                }


                try {
                    const stringInfo = JSON.stringify(userCredential);
                    sessionStorage.setItem('userCredential', stringInfo);
                    setCookie('userCredential', stringInfo, 14);
                    window.location.pathname = '/users/landing';
                } catch (QuotaExceededError) {
                    alert('You need to allow Session Storage to log in')
                }
            })
            .catch((error) => {
                error.code.indexOf('wrong-password') !== -1 ? document.querySelector('#spanInfo').textContent = 'The email or password you provided incorrect!' : alert(`Something went wrong!`, error.code);
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
            <Alert className='is-hidden' variant='warning' id='spanInfo' dismissible />
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