import { Table, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { app } from '../../firebase'

const Suggestions = () => {
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

    let rows = document.querySelectorAll('.custom-row');
    

    function liveSearch() {
        let query = document.getElementById("searchbox").value;

        for (let i = 0; i < rows.length; i++) {
            rows[i].textContent.toLowerCase().includes(query.toLowerCase()) ? rows[i].classList.remove("is-hidden") : rows[i].classList.add("is-hidden");
        }
    }

    if (loading) {
        return (
            <>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <span id='warning-text'><br />If this takes too long, try reloading the page.</span>
            </>)

    } else {
        // Doing this after the page loads to enhance UX
        let typingTimer;
        let typeInterval = 1000; // So we don't use too much memory, may need to be lowered in some cases!

        try {
            // Needs to be in try/catch block because no 'defer' option to render elements
            let searchInput = document.getElementById('searchbox');
            searchInput.addEventListener('keyup', () => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(liveSearch, typeInterval);
            });
        } catch (TypeError) {
            // Will always throw error, essentially throwing nothing back.
        }
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
                <tr>
                    <td><input style={{ width: "100%", borderRadius: '5px', padding: '0.5em' }} id='searchbox' placeholder="Search Physician Information (1s delay)" type='text' autoComplete='true'/></td>
                    <td style={{margin: 'auto', textAlign: 'center', verticalAlign: 'middle', fontSize: '1.1em'}}>Results: {patients.length - document.querySelectorAll('.is-hidden').length}</td>
                    <td style={{margin: 'auto', textAlign: 'center', verticalAlign: 'middle', fontSize: '1.1em'}}>Total collected: {patients.length}</td>
                    {/* <button id='search-button'>Submit</button> */}

                </tr>
                {patients.map((doc) => {
                    return (
                        <tr className='custom-row'>
                            <td>{doc.drType.map((char) => { let new_char = String.fromCharCode(char - 25); return new_char })}: {doc.dr.map((char) => { let new_char = String.fromCharCode(char - 25); return new_char })}</td>
                            <td>{doc.phone.map((char) => { let new_char = String.fromCharCode(char - 25); return new_char })}</td>
                            <td>{doc.fax.map((char) => { let new_char = String.fromCharCode(char - 25); return new_char })}</td>
                        </tr>
                    )
                })}
            </tbody>
                {/* <tr>
                    <td colSpan={3}>Total results hidden: {document.querySelectorAll('.is-hidden').length}</td>
                </tr> */}
        </Table>
    )
}

export default Suggestions;