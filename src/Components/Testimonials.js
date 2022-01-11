import React, { useState, useEffect } from 'react';
import { Nav, Container, Card, Alert } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { app } from '../firebase.js'

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([])

    function getTests() {

        // setLoading(true);
        const dbRef = app.firestore().collection('Testimonials').orderBy('date')
        dbRef.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
                // console.log(doc)
            });
            setTestimonials(items);
            // setLoading(false)
        })
    }
    useEffect(() => {
        getTests()
    }, [])


    console.log(testimonials)
    return (<>
        <Alert id='page-title' variant="light">

            {/* <span id='main-title-elm'>{pathRef[pathRef.length - 1].toLocaleUpperCase()}</span> */}
            <div id='related-small'>
                <Nav.Link href={'/'}>{`Nothin`}</Nav.Link>
                <Nav.Link href={'/'} disabled>Bruh</Nav.Link>
                <Nav.Link href={'/'}>{`Nothing else`}</Nav.Link>
                <Nav.Link href={'/'}>{`Nothing else`}</Nav.Link>
            </div>
        </Alert>
        <Container id='content-page' fluid>
            <Card className='content-left' id='content-left'>
                {/* className='content-left' */}
                <h5>Related Links</h5>
                {/* <ol> */}
                <Nav.Link href={`/`}>Nothing</Nav.Link>
                <Nav.Link href={`/`} disabled>Nothing</Nav.Link>
                <Nav.Link href={`/`}>Nothing else</Nav.Link>
                <Nav.Link href={`/`}>Nothing else</Nav.Link>
                {/* </ol> */}
            </Card>
            <Card className='content-right' >
                {/* className='content-right' */}
                <h4>Patient Testimonials</h4>
                <Card.Body>
                    {testimonials.map((test) => {
                        let unique = [...new Set(testimonials.map(item => item.date))];
                        let uniqueOccs = []
                        const countOccs = (arr, search) => {
                            arr.reduce(function (n, obj) {
                                return n + (obj.date == search)
                            })
                        }

                        console.log(countOccs(testimonials, 'date'))
                        for (let i = 0; i < unique.length; i++) {
                            uniqueOccs.push({ date: unique[i], occurrences: countOccs(testimonials, unique[i]) });
                        }
                        console.log(`Lets hope this works...`, uniqueOccs)


                        if (testimonials.indexOf(test) === (testimonials.length - 1)) {
                            return (
                                <div className='review-card' key={test.id}>
                                    <h5>{test.date}</h5>
                                    <div className='comment'>{test.comments}</div>
                                </div>
                            )
                        }
                        return (
                            <div className='review-card' key={test.id}>
                                <h5>{test.date}</h5>
                                <div className='comment'>{test.comments}</div>
                                <hr />
                            </div>
                        )
                    })}
                </Card.Body>
            </Card>
        </Container>
















        <div id='testimonial-container'>
            <div className='testimonial-card'>
                <h4 className='testimonial-header'></h4>
            </div>
        </div>
    </>);
};