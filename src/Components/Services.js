import { Card, Container, Alert, Nav, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { app } from '../firebase.js'


export default function Services() {
    const [page, setPage] = useState([])
    const [loading, setLoading] = useState(true)

    var pathRef = window.location.pathname;
    pathRef = pathRef.split('/')
    pathRef.shift()
    pathRef.unshift('home')
    function getPages() {

        setLoading(true);
        const dbRef = app.firestore().collection('services')
        console.log(dbRef)
        dbRef.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setPage(items);
            setLoading(false)
        })
    }
    useEffect(() => {
        getPages()
        console.log(page)
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


    return (<>
        <Alert id='page-title' variant="light">
            {pathRef.map((i) => {

                if (i !== pathRef[pathRef.length - 1]) {
                    return <span id='main-title-elm'>{i.toLocaleUpperCase()} &#8594; </span>
                } else { // If it's the last element
                    return <span id='main-title-elm'>{i.toLocaleUpperCase()}</span>
                }
            })}
            <div id='related-small'>
                <Nav.Link href={`/about`}>About</Nav.Link>
                <Nav.Link href={`/about/anesthesia`}>Anesthesia</Nav.Link>
                <Nav.Link href={`/about/staff`} disabled>Staff</Nav.Link>
                <Nav.Link href={`/about/surgeons`}>Surgeons</Nav.Link>
            </div>
        </Alert>
        <Container id='content-page' fluid>
            <Card className='content-left' id='content-left'>
                {/* className='content-left' */}
                <h5>Related Links</h5>
                {/* <ol> */}
                <Nav.Link href={`/about`}>About</Nav.Link>
                <Nav.Link href={`/about/anesthesia`}>Anesthesia</Nav.Link>
                <Nav.Link href={`/about/staff`} disabled>Staff</Nav.Link>
                <Nav.Link href={`/about/surgeons`}>Surgeons</Nav.Link>
            </Card>
            <Card className='content-right'>
                <h4>Services</h4>
                {page.map((serviceRef) => (
                    <div className='surgeon-card' key={serviceRef.id}>
                        <span id='surgeon-card-header'>{serviceRef.full_name}</span><span id='short_name'> - {serviceRef.short_name}</span>
                        <hr />
                        <p>{serviceRef.description}</p>
                        {/* Modal */}

                        {/* End Modal */}
                    </div>
                ))}
            </Card>
        </Container>
    </>
    )
}