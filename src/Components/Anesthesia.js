import { Card, Container, Alert, Nav, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { app } from '../firebase.js'

export default function Anesthesiologists() {
    const [page, setPage] = useState([])
    const [loading, setLoading] = useState(true)

    var pathRef = window.location.pathname;
    pathRef = pathRef.split('/')
    pathRef.shift()
    pathRef.unshift('home')

    function getPages() {

        setLoading(true);
        const dbRef = app.firestore().collection('Anesthesia')
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
            {/* <span id='main-title-elm'>{pathRef[pathRef.length - 1].toLocaleUpperCase()}</span> */}
            <div id='related-small'>
                <Nav.Link href=''></Nav.Link>
                <Nav.Link href='' disabled></Nav.Link>
                <Nav.Link href=''></Nav.Link>
                <Nav.Link href=''></Nav.Link>
            </div>
        </Alert>
        <Container id='content-page' fluid>
            <Card className='content-left' id='content-left'>
                {/* className='content-left' */}
                <h5>Related Links</h5>
                {/* <ol> */}
                <Nav.Link href={`/about`}>About</Nav.Link>
                <Nav.Link href={`/about/surgeons`}>Surgeons</Nav.Link>
                <Nav.Link href={`/about/staff`} disabled>Staff</Nav.Link>
                <Nav.Link href={`/about/services`}>Services</Nav.Link>
            </Card>

            <Card className='content-right'>
                <h4>Our Anesthesiologists</h4>
                <hr />
                {page.map((doc) => {
                    // console.log(doc);
                    return (
                        <div key={doc.id}>
                            <div>{doc.name}</div>
                        </div>)
                })}
            </Card>
        </Container>





    </>)
}