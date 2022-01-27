import { Card, CardGroup, Table } from 'react-bootstrap'

const Contact = () => {

    return (<CardGroup id='contact-container'>
        <Card>
            <Card.Header>Contact Us</Card.Header>
            <Card.Subtitle className='contact-subtitle'><img id='phone-svg' src='Images/phone.svg' alt="Via Phone" /></Card.Subtitle>
            <Card.Body id='contact-body'>
                <div className='contact-button'><span><span><span><a href='tel:+16233996880'>Phone: <br className='hidden-break' />📞 (623) 399-6880</a></span></span></span></div>
                <div className='contact-button'><span><span><span><a href='fax:+16233221504'>Fax: <br className='hidden-break' />📠 (623) 322-1504</a></span></span></span></div>
            </Card.Body>
        </Card>
        <Card>
            <Card.Header>Visit Us</Card.Header>
            <img id='phone-svg' src='Images/location.svg' alt="Visit Us" />
            <Card.Body>
                <div className='contact-button' id='contact-right'><span><span><span><a target='_blank' rel='noreferrer' href='http://www.google.com/search?q=Four+Peaks+Surgery+Center'>Address: 9425 West Bell Road, Sun City, Arizona 85351</a></span></span></span></div>
                <Table id='schedule-table' striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>8:30 AM - 5:00 PM</td>
                            <td>8:30 AM - 5:00 PM</td>
                            <td>8:30 AM - 5:00 PM</td>
                            <td>8:30 AM - 5:00 PM</td>
                            <td>8:30 AM - 5:00 PM</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </CardGroup>)
}

export default Contact;