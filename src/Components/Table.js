import { Table, Spinner, Button, Modal, Accordion } from 'react-bootstrap';
import { app } from '../firebase.js'
import { useState, useEffect } from 'react'

export default function PatientTable() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    async function getPatients() {
        let collection_ref = await app.firestore().collection('Patient Clearance')
        collection_ref.onSnapshot((qs) => {
            const items = [];
            qs.forEach((doc) => {
                items.push(doc.data())
            });
            setPatients(items);
            setLoading(false);
        })
    }
    useEffect(() => {
        getPatients()
        console.log(patients)
    }, [])
    if (loading) {
        return (
            <>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <span id='warning-text'><br />If this takes too long, try reloading the page.</span>
            </>)

    }

    return (
        <Table id="clx-table" striped bordered hover size="lg" responsive>
            <thead>
                <tr>
                    <th>Patient Name</th>
                    <th>Date of Birth</th>
                    <th>Date of Service</th>
                    <th>Procedure</th>
                    <th>Urologist</th>
                    <th>Physicians</th>
                    <th>Forms</th>
                </tr>
            </thead>
            <tbody>
                {patients.map((pt) => {

                    return (
                        <tr key={pt.ptName}>
                            <td>{pt.ptName}</td>
                            <td>{pt.dateOfBirth}</td>
                            <td>{pt.procedureDate}</td>
                            <td>{pt.procedureName}</td>
                            <td>{pt.anesthesiologistName}</td>
                            <td>
                                <Accordion>
                                    <Accordion.Item className="clx-acc" eventKey={patients.indexOf(pt)}>
                                        <Accordion.Header className='clx-acc'>View</Accordion.Header>
                                        <Accordion.Body className=''>
                                            {pt.drName}<br />
                                            {pt.pNumber}<br />
                                            {pt.fNumber}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </td>
                            <td>
                                <Accordion>
                                    <Accordion.Item className="clx-acc" eventKey={patients.indexOf(pt)}>
                                        <Accordion.Header className='clx-acc'>View</Accordion.Header>
                                        <Accordion.Body className=''>
                                            {pt.forms.map((form) => {return (<p>{form}</p>)})}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}