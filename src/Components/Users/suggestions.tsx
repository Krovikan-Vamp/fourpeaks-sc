import { Table, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { app } from '../../firebase'

const Suggestions: Object = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);


    async function getPatients() {
        let collection_ref = await app.firestore().collection('Auto Suggestions').orderBy('drType', 'asc')
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
        // console.log(patients)
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
    const userCredential = sessionStorage.getItem('userCredential');

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
                    return (
                        <tr>
                            <td>{doc.drType.map((char: number) => { let new_char: string = String.fromCharCode(char - 25); return new_char })}: {doc.dr.map((char: number) => { let new_char: string = String.fromCharCode(char - 25); return new_char })}</td>
                            <td>{doc.phone.map((char: number) => { let new_char: string = String.fromCharCode(char - 25); return new_char })}</td>
                            <td>{doc.fax.map((char: number) => { let new_char: string = String.fromCharCode(char - 25); return new_char })}</td>
                        </tr>
                    )
                })}
                <tr>
                    <td colSpan={3}>Total suggestions collected: {patients.length}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default Suggestions;