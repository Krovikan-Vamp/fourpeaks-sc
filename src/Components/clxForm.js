import { useState } from 'react';
import { Form } from 'react-bootstrap'
import { app } from '../firebase';

export default function ClearanceForm() {
    const [enteredName, setName] = useState('')
    const [ptName, setPtName] = useState('')
    const [DOS, setDOS] = useState('')
    const [dob, setDOB] = useState('')
    const [proc, setProc] = useState('')

    function handleNameChange(e) {
        setName(e.target.value)
    }
    function handlePtChange(e) {
        setPtName(e.target.value)
    }
    function dosChange(e) {
        setDOS(e.target.value)
    }
    function procChange(e) {
        setProc(e.target.value)
    }
    function dobChange(e) {
        setDOB(e.target.value)
    }

    // console.log(app.firestore().collection('Anesthesia'))
    async function handleSubmit(e) {
        e.preventDefault();
        const clxInput = {}
        console.log(`Event value: `, typeof (e.target.form[0]), e.target.form.length)
        for (let i = 0; i < e.target.form.length - 1; i++) {
            let property = e.target.form[i].id;
            if (property === 'dos') {
                e.target.form[i].value = new Date(e.target.form[i].value);
                clxInput[property] = e.target.form[i].value;
            } else {
                clxInput[property] = e.target.form[i].value;
            }
        }
        // console.log(`Parse this date: `, new Date(Date.parse('10.25.2003')).toLocaleDateString())
        console.log(clxInput)
        await app.firestore().collection('Patient Clearance').doc(`${clxInput.name} (${clxInput.dob})`).set(clxInput);
        // console.log(e.form[0].defaultValue)
    }

    return (
        <Form>
            {/* User's name */}
            <Form.Group controlId='userName'>
                <Form.Label>Your Name</Form.Label>
                <Form.Control type='text' value={enteredName} onChange={handleNameChange} />
            </Form.Group>
            {/* Pt Date of birth */}
            <Form.Group controlId='name'>
                <Form.Label>Patient Name</Form.Label>
                <Form.Control type='text' value={ptName} onChange={handlePtChange} />
            </Form.Group>
            <Form.Group controlId='dos'>
                <Form.Label>Date of service</Form.Label>
                <Form.Control type='text' value={DOS} onChange={dosChange} />
            </Form.Group>
            <Form.Group controlId='proc'>
                <Form.Label>Procedure</Form.Label>
                <Form.Control type='text' value={proc} onChange={procChange} />
            </Form.Group>
            <Form.Group controlId='dob'>
                <Form.Label>Date of birth</Form.Label>
                <Form.Control type='text' value={dob} onChange={dobChange} />
            </Form.Group>
            <Form.Group controlId='ptForms'>
                <Form.Label>Check the following requirements</Form.Label>
                <Form.Control type='text' value={dob} onChange={dobChange} />
            </Form.Group>
            <input type='submit' onClick={handleSubmit} value='Submit' />
        </Form>
    )
}