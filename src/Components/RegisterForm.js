import { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../firebase-config'


export default function RegisterForm() {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('')
    
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('')
    
    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            console.log(user)
        } catch (error) {
            console.log(error.message)
            alert('User creation failed!')
            
        }
    };
    const login = async () => { };
    const logout = async () => { };





    return (
        <Form onSubmit={register}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={e => {
                    setRegisterEmail(e.target.value)
                }} placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={e => {
                    setRegisterPassword(e.target.value)
                }} placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" onClick={register}>
                Submit
            </Button>
        </Form>
    )
}