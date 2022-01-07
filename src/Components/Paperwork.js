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
    console.log(ppw)
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
                        return <span id='main-title-elm'>{i.toLocaleUpperCase()} &#8594; </span>
                    } else { // If it's the last element
                        return <span id='main-title-elm'>{i.toLocaleUpperCase()}</span>
                    }
                })}
                {/* <span id='main-title-elm'>{pathRef[pathRef.length - 1].toLocaleUpperCase()}</span> */}
                <div id='related-small'>
                    <Nav.Link href={`/${ppw.related_links[3]}`}>{`${ppw.related_links[3].charAt(0).toUpperCase()}${ppw.related_links[3].slice(1)}`}</Nav.Link>
                    <Nav.Link href={`/${ppw.parent_path}/${ppw.related_links[0]}`} disabled>{`${ppw.related_links[0].charAt(0).toUpperCase()}${ppw.related_links[0].slice(1)}`}</Nav.Link>
                    <Nav.Link href={`/${ppw.parent_path}/${ppw.related_links[1]}`} disabled>{`${ppw.related_links[1].charAt(0).toUpperCase()}${ppw.related_links[1].slice(1)}`}</Nav.Link>
                    <Nav.Link href={`/${ppw.parent_path}/${ppw.related_links[2]}`} disabled>{`${ppw.related_links[2].charAt(0).toUpperCase()}${ppw.related_links[2].slice(1)}`}</Nav.Link>
                </div>
            </Alert>
            {/* Container */}
            <Container id='content-page' fluid>
                <Card className='content-left' id='content-left'>
                    {/* className='content-left' */}
                    <h5>Related Links</h5>
                    {/* <ol> */}
                    <Nav.Link href={`/${ppw.related_links[3]}`}>{`${ppw.related_links[3].charAt(0).toUpperCase()}${ppw.related_links[3].slice(1)}`}</Nav.Link>
                    <Nav.Link href={`/${ppw.parent_path}/${ppw.related_links[0]}`} disabled>{`${ppw.related_links[0].charAt(0).toUpperCase()}${ppw.related_links[0].slice(1)}`}</Nav.Link>
                    <Nav.Link href={`/${ppw.parent_path}/${ppw.related_links[1]}`} disabled>{`${ppw.related_links[1].charAt(0).toUpperCase()}${ppw.related_links[1].slice(1)}`}</Nav.Link>
                    <Nav.Link href={`/${ppw.related_links[2]}`} disabled>{`${ppw.related_links[2].charAt(0).toUpperCase()}${ppw.related_links[2].slice(1)}`}</Nav.Link>
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
                                    <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                                        <div id='paper-card' className='ms-2 me-auto'>
                                            <div className='fw-bold'>{paper.name}</div>
                                            <span id='paper-card'>{paper.description}</span>
                                        </div>
                                        <Badge variant='primary' id='link-pill' pill><a href={paper.link} target='_blank'>View Paper</a></Badge>
                                    </ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        </>)
}