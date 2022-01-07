import { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../firebase-config'


export default function LoginForm() {    
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('')
    
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(user)
        } catch (error) {
            console.log(error.message)
            alert('User login failed!')
            
        }
    };
    const logout = async () => { };





    return (
        <Form onSubmit={login}register>
            Hello {auth.currentUser.email}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={e => {
                    setLoginEmail(e.target.value)
                }} placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={e => {
                    setLoginPassword(e.target.value)
                }} placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" onClick={login}>
                Submit
            </Button>
        </Form>
    )
}