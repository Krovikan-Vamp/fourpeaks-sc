import { Table, Spinner } from 'react-bootstrap'
import { app } from '../firebase'
import { useEffect, useState } from 'react'

export default function PatientTable() {
    const [loading, setLoading] = useState(true);
    const [pts, setPts] = useState([])

    async function getPatients() {

        // setLoading(true);
        const dbRef = await app.firestore().collection('Patient Clearance').orderBy('dos', 'asc')
        dbRef.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
                // console.log(doc)
            });
            setPts(items);
            setLoading(false)
            // setLoading(false)
        })
    }

    useEffect(() => {
        getPatients()
    }, [])

    if (loading) {
        return (
            <div id='spinner-id'>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <span id='warning-text'><br />If this takes too long, try reloading the page.</span>
            </div>)

    }
    setTimeout(() => {
        [...document.querySelectorAll('td > input')].map(x => {
            x.addEventListener('keypress', async (e) => {
                if (e.key === 'Enter') {
                    // Do something if they pressed enter
                    // console.log(`The whole event: `, e.target.parentNode.parentNode.textContent)
                    let attChange = e.target.attributes.id.value.toString();
                    if (attChange === 'dos' || attChange === 'dob') {
                        app.firestore().collection('Patient Clearance').doc(e.target.attributes.useref.value).update({
                            [attChange]: new Date(e.target.value).toLocaleDateString()
                        })
                    } else {
                        app.firestore().collection('Patient Clearance').doc(e.target.attributes.useref.value).update({
                            [attChange]: e.target.value
                        })
                    }
                    // console.log(e.target.attributes.useref.value)
                    // console.log(e.target.attributes.id.value)
                    // console.log(`Your new value is: `, e.target.value)
                }
            })
            return true;
        })
    }, 1500)

    return (
        <Table responsive striped bordered hover size='lg'>
            <thead>
                <tr>
                    <th>Patient Name</th>
                    <th>Date of Birth</th>
                    <th>Date of Service</th>
                    <th>Procedure</th>
                </tr>
            </thead>
            <tbody>
                {pts.map(patient => {

                    return (
                        <tr key={patient.name}>
                            <td>{patient.name}</td>
                            <td><input useref={`${patient.name} (${patient.dob})`} className='table-input' id='dob' type='text' defaultValue={patient.dob} /></td>
                            <td><input useref={`${patient.name} (${patient.dob})`} className='table-input' id='dos' type='text' defaultValue={patient.dos} /></td>
                            <td>{patient.proc}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}