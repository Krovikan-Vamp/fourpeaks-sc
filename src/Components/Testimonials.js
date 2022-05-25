import React, { useState, useEffect } from 'react';
import { Nav, Container, Card, Alert } from 'react-bootstrap'
import { app } from '../firebase.js'

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(false)

    var pathRef = window.location.pathname;
    pathRef = pathRef.split('/');
    pathRef.shift();
    pathRef.unshift('home')

    async function getTests() {
        setLoading(true);
        const dbRef = await app.firestore().collection('Testimonials').orderBy('year', 'desc')
        dbRef.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setTestimonials(items);
            setLoading(false)
        })
    }
    useEffect(() => {
        getTests()
    }, [])

    if (loading) {
        return <h4>Content loading :)</h4>
    }
    // testimonials.sort((a, b) => (a.month > b.month) ? 1 : -1)
    // testimonials.map(item => console.log(item.month))
    console.log(testimonials)
    let uniques = [... new Set(testimonials.map(item => item.date_M_Y))]
    let objs = uniques.map(date => { return { new_date: date } })

    let results = objs.map((item) => {
        console.log(`Searching for the month: `, item)
        let arr = []
        testimonials.map(testimonial => {
            // if (testimonial.date_M_Y === )
            testimonial.date_M_Y === item.new_date ? arr.push(testimonial.comment) : console.log();
        })
        return { date: item, comments: arr }
    })
    console.log(`Here are the uniques`, results)


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

                    {/* Do something here 😀 */}
                    {results.map((item) => {
                        return <div className='review-card'>
                            <h4>{item.date.new_date}</h4>
                            <ul>
                                {item.comments.map(comment => <li>{comment}</li>)}
                            </ul>
                            <hr />
                        </div>
                    })
                    }


                </div>
            </Card>
        </Container>
    </>);
};