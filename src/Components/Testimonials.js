import React, { useState, useEffect } from 'react';
import { Nav, Container, Card, Alert } from 'react-bootstrap'
import { app } from '../firebase.js'

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([])

    var pathRef = window.location.pathname;
    pathRef = pathRef.split('/');
    pathRef.shift();
    pathRef.unshift('home')

    async function getTests() {
        // setLoading(true);
        const dbRef = await app.firestore().collection('Testimonials').orderBy('date', 'desc')
        dbRef.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
                console.log(doc.data())
            });
            setTestimonials(items);
            // setLoading(false)
        })
    }
    useEffect(() => {
        getTests()
    }, [])

    let unique = [...new Set(testimonials.map(item => item.date))];
    let uniqueOccs = []

    for (let i = 0; i < unique.length; i++) {
        uniqueOccs.push({
            date: unique[i],
            occurrences: testimonials.reduce((n, test) => {
                return n + (test.date === unique[i])
            }, 0)
        })
    }
    console.log(uniqueOccs)

    return (<>
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
                <Nav.Link href={`/about`}>About</Nav.Link>
                <Nav.Link href={`/contact`}>Contact</Nav.Link>
                <Nav.Link href={`/patients/paperwork`}>Paperwork</Nav.Link>
                <Nav.Link href={`/about/services`}>Services</Nav.Link>
            </div>
        </Alert>
        <Container id='content-page' fluid>
            <Card className='content-left' id='content-left'>
                {/* className='content-left' */}
                <h5>Related Links</h5>
                {/* <ol> */}
                <Nav.Link href={`/about`}>About</Nav.Link>
                <Nav.Link href={`/contact`}>Contact</Nav.Link>
                <Nav.Link href={`/patients/paperwork`}>Paperwork</Nav.Link>
                <Nav.Link href={`/about/services`}>Services</Nav.Link>
                {/* </ol> */}
            </Card>
            <Card className='content-right'>
                {/* className='content-right' */}
                <h4>Patient Testimonials</h4>
                <div className='review-card-container'>
                    {uniqueOccs.map((date) => {
                        let elements = [];
                        for (let i = 0; i < date.occurrences; i++) {
                            if (i === date.occurrences - 1) {
                                elements.push(<>
                                    <div className='review-card'>
                                        <li className='comment'>"{testimonials[i].comments}"</li>
                                    </div>
                                    <hr />
                                </>)
                            } else {
                                elements.push(
                                    <div className='review-card'>
                                        <li className='comment'>"{testimonials[i].comments}"</li>
                                    </div>
                                )
                            }
                        }
                        return (<div className='card-body'>
                            <h5>{date.date.substring(3, date.date.length)}</h5>
                            {elements}
                        </div>)
                    })}
                </div>
            </Card>
        </Container>
    </>);
};