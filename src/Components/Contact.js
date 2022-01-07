import { Card, Container } from "react-bootstrap";

export default function ContactForm() {
    return (
        <Container id='contact-container'>
            <Card id='contact-left'>
                <Card.Header>By Phone or Fax</Card.Header>
                <Card.Body>Phone: <a href='tel:+16233996880'>(623) 399-6880</a><br />Fax: (623) 322-1504</Card.Body>
            </Card>
            <Card id='contact-right'>
                <Card.Header>Our Location</Card.Header>
                <Card.Body>9425 West Bell Road<br />
                    Sun City, Arizona 85351
                </Card.Body>
                <iframe id='contact-iframe' title='Location' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.7478607717476!2d-112.26588958479579!3d33.63777908072076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b42eb42a4f5bf%3A0x336ca4f0f302ff2e!2sFour%20Peaks%20Surgery%20Center!5e0!3m2!1sen!2sus!4v1640197119819!5m2!1sen!2sus" width="400" height="280" loading="lazy" />

            </Card>
        </Container>
    )
}