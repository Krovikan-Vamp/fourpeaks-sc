import { app } from '../firebase'
import React, { useState } from 'react'
import { Spinner, Alert, Nav, Card, Container, ListGroup, Badge } from 'react-bootstrap'
import 'firebase/compat/firestore'

export default function Paperwork() {
    const [ppw, setPpw] = useState([]);
    const [loading, setLoading] = useState(true)

    var pathRef = window.location.pathname;
    pathRef = pathRef.split('/')
    // pathRef = pathRef.shift()
    pathRef.shift();
    pathRef.unshift('home')

    async function fetchPage() {
        // setLoading(true)
        const ref = await app.firestore().collection('pages').doc('paperwork_page').get()
        // console.log(ref.data())
        setPpw(ref.data())
        setLoading(false)
        // console.log(ppw)

    }
    window.addEventListener('load', () => {
        fetchPage()
    });
    // console.log(ppw)
    if (loading) {
        return (
            <div id='spinner-id'>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <span id='warning-text'><br />If this takes too long, try reloading the page.</span>
            </div>)

    }
    return (
        <>
            <Alert id='page-title' variant="light">
                {pathRef.map((i) => {

                    if (i !== pathRef[pathRef.length - 1]) {
                        return <span key={i} id='main-title-elm'>{i.toLocaleUpperCase()} &#8594; </span>
                    } else { // If it's the last element
                        return <span key={i} id='main-title-elm'>{i.toLocaleUpperCase()}</span>
                    }
                })}
                {/* <span id='main-title-elm'>{pathRef[pathRef.length - 1].toLocaleUpperCase()}</span> */}
                <div id='related-small'>
                    <Nav.Link href={`/${ppw.related_links[3]}`}>{`${ppw.related_links[3].charAt(0).toUpperCase()}${ppw.related_links[3].slice(1)}`}</Nav.Link>
                    <Nav.Link href={`/contact`}>Contact</Nav.Link>
                    <Nav.Link href={`/about/services`}>Services</Nav.Link>
                    <Nav.Link href={`/testimonials`}>Testimonials</Nav.Link>
                </div>
            </Alert>
            {/* Container */}
            <Container id='content-page' fluid>
                <Card className='content-left' id='content-left'>
                    {/* className='content-left' */}
                    <h5>Related Links</h5>
                    {/* <ol> */}
                    <Nav.Link href={`/${ppw.related_links[3]}`}>{`${ppw.related_links[3].charAt(0).toUpperCase()}${ppw.related_links[3].slice(1)}`}</Nav.Link>
                    <Nav.Link href={`/contact`}>Contact</Nav.Link>
                    <Nav.Link href={`/about/services`}>Services</Nav.Link>
                    <Nav.Link href={`/testimonials`}>Testimonials</Nav.Link>
                    {/* </ol> */}
                </Card>
                <Card className='content-right' >
                    {/* className='content-right' */}
                    <h4>Patient {ppw.main_title}</h4>
                    <hr />
                    <Card.Body>
                        <h5>Day-of surgery papers</h5>
                        <ListGroup as='ol' numbered>
                            {ppw.papers.map((paper) => {
                                return (
                                    <ListGroup.Item as='li' key={paper.name} className='d-flex justify-content-between align-items-start'>
                                        <div id='paper-card' className='ms-2 me-auto'>
                                            <div className='fw-bold'>{paper.name}</div>
                                            <span id='paper-card'>{paper.description}</span>
                                        </div>
                                        <Badge variant='primary' id='link-pill' pill><a href={paper.link} target='_blank' rel='noreferrer'>View</a></Badge>
                                    </ListGroup.Item>
                                )
                            })}
                            <hr />
                            <h5>Other</h5>
                            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                                <div id='paper-card' className='ms-2 me-auto'>
                                    <div className='fw-bold'>Save All</div>
                                    <span id='paper-card'>Save all forms to your device</span>
                                </div>
                                <Badge variant='success' id='link-pill' pill><a href='https://firebasestorage.googleapis.com/v0/b/fourpeaks-sc.appspot.com/o/All%20Check%20In%20Forms.pdf?alt=media&token=0ac380a9-4c83-4ce7-96d2-e5b4c48fa6a6' target='_blank' rel='noreferrer'>Save All</a></Badge>
                            </ListGroup.Item>
                            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                                <div id='paper-card' className='ms-2 me-auto'>
                                    <div className='fw-bold'>Physician Ownership Declaration</div>
                                    <span id='paper-card'>Your physician may be an owner of this facility.</span>
                                </div>
                                <Badge variant='success' id='link-pill' pill><a href='https://firebasestorage.googleapis.com/v0/b/fourpeaks-sc.appspot.com/o/Patient%20Physician%20Ownership%20disclosure.pdf?alt=media&token=ba7a5c3b-72b5-480f-80bc-582063104040' target='_blank' rel='noreferrer'>View</a></Badge>
                            </ListGroup.Item>
                            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                                <div id='paper-card' className='ms-2 me-auto'>
                                    <div className='fw-bold'>No Surprises Act</div>
                                    <span id='paper-card'>Federal billing information regarding the "No Surprises Act".</span>
                                </div>
                                <Badge variant='success' id='link-pill' pill><a href='https://firebasestorage.googleapis.com/v0/b/fourpeaks-sc.appspot.com/o/No%20Surprises%20Act%20Implementation.pdf?alt=media&token=801b1f2f-4ab2-42ab-a806-ac65c1b0493e' target='_blank' rel='noreferrer'>View</a></Badge>
                            </ListGroup.Item>
                        </ListGroup>

                    </Card.Body>
                </Card>
            </Container>
        </>)
}