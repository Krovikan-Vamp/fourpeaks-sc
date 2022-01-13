import { app } from "../firebase.js";
import { Spinner } from "react-bootstrap";
import React, { useState } from 'react';
import { Container, Card, Nav, Alert } from "react-bootstrap";
import "firebase/compat/firestore";

export default function DbFetch() {
    const [page, setPage] = useState([])
    const [loading, setLoading] = useState(true)

    var pathRef = window.location.pathname;
    pathRef = pathRef.split('/')
    // pathRef = pathRef.shift()
    pathRef.shift();
    pathRef.unshift('home')
    async function anon() {
        // setLoading(true)
        console.log(`Trying to get doc: ${pathRef[pathRef.length - 1]}`)
        const ref = await app.firestore().collection('pages').doc(pathRef[pathRef.length - 1]).get();
        console.log(`Successfully got the "${ref.data().main_title}" page;`)
        setPage(ref.data())
        setLoading(false)
    }

    window.addEventListener('load', () => {
        anon()
    })


    if (loading) {
        return (
            <div id='spinner-id'>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <span id='warning-text'><br />If this takes too long, try reloading the page.</span>
            </div>)

    }
    console.log(page)

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
                <Nav.Link href={`/${page.parent_path}/${page.related_links[0]}`}>{`${page.related_links[0].charAt(0).toUpperCase()}${page.related_links[0].slice(1)}`}</Nav.Link>
                <Nav.Link href={`/patients/paperwork`}>Paperwork</Nav.Link>
                <Nav.Link href={`/${page.parent_path}/${page.related_links[2]}`}>{`${page.related_links[2].charAt(0).toUpperCase()}${page.related_links[2].slice(1)}`}</Nav.Link>
                <Nav.Link href={`/${page.parent_path}/${page.related_links[3]}`}>{`${page.related_links[3].charAt(0).toUpperCase()}${page.related_links[3].slice(1)}`}</Nav.Link>
            </div>
        </Alert>
        <Container id='content-page' fluid>
            <Card className='content-left' id='content-left'>
                {/* className='content-left' */}
                <h5>Related Links</h5>
                {/* <ol> */}
                <Nav.Link href={`/${page.parent_path}/${page.related_links[0]}`}>{`${page.related_links[0].charAt(0).toUpperCase()}${page.related_links[0].slice(1)}`}</Nav.Link>

                <Nav.Link href={`/${page.parent_path}/${page.related_links[2]}`}>{`${page.related_links[2].charAt(0).toUpperCase()}${page.related_links[2].slice(1)}`}</Nav.Link>
                <Nav.Link href={`/${page.parent_path}/${page.related_links[3]}`}>{`${page.related_links[3].charAt(0).toUpperCase()}${page.related_links[3].slice(1)}`}</Nav.Link>
                {/* </ol> */}
            </Card>
            <Card className='content-right' >
                {/* className='content-right' */}
                <h4>{page.main_title}</h4>
                <Card.Body dangerouslySetInnerHTML={{ __html: page.main_body }}>
                    {/* {page.main_body.replaceAll('\\n', '\n')} */}
                </Card.Body>
            </Card>
        </Container></>
    )
}