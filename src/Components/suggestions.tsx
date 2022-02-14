import { Table, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { app } from '../firebase.js'

const Suggestions: Object = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);


    async function getPatients() {
        let collection_ref = app.firestore().collection('Auto Suggestions').orderBy('dr', 'asc')
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
    })
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
        <Table id='suggestion-table' striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Physician</th>
                    <th>Phone</th>
                    <th>Fax</th>
                </tr>
            </thead>
            <tbody>
                {patients.map((doc) => {
                    console.log(doc)

                    return (
                        <tr>
                            <td className='al-r'>{doc.dr}</td>
                            <td>{doc.phone}</td>
                            <td>{doc.fax}</td>
                        </tr>
                    )
                })}
            </tbody>
            <tr>
                <td colSpan={3}>Total suggestions collected: {patients.length}</td>
            </tr>
        </Table>
    )
}

export default Suggestions;