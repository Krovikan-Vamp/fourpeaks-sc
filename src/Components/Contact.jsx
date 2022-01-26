import {Card, CardGroup} from 'react-bootstrap'

const Contact = () => {

    return (<CardGroup id='contact-container'>
        <Card>
            <Card.Header>Contact Us</Card.Header>
            <img id='phone-svg' src='Images/phone.svg' alt="Via Phone" />
            <Card.Body></Card.Body>
        </Card>
        <Card>
            <Card.Header>Visit Us</Card.Header>    
            <img id='phone-svg' src='Images/location.svg' alt="Visit Us" />
            <Card.Body></Card.Body>
        </Card>
    </CardGroup>)
}

export default Contact;