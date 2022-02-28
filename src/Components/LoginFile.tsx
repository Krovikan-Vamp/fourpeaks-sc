import '../firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const LoginPage: Object = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, "zaxdev59@gmail.com", "password").then((credential) => {
        const user = credential.user;
        console.log(`Logged in as`, user)
    }).catch((err) => {
        const errCode = err.code;
        const errMsg = err.message;
    })

    return (
        <></>
    )
}

export default LoginPage