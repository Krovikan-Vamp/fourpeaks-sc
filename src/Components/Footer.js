import { Card, CardGroup } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer>
            <CardGroup id='footer-start'>
                <Card className='thirds' id='fpsc-third'>
                    <p><span id='third-title'><a href='/contact'>Four Peaks Surgery Center</a></span><br />9425 West Bell Rd. Sun City, Arizona 85351<br />P: 623.399.6880 / F: 623.322.1504</p>

                </Card>
                <Card className='thirds' id='logo-holder'>
                    <img alt='Four Peaks Surgery Center' id='fp-logo' src='/Images/4p_logo.png' />
                </Card>
                <Card id='iframe-div' className='thirds'>
                    <span id='third-title'>Location</span>
                    <iframe title='Location' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.7478607717476!2d-112.26588958479579!3d33.63777908072076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b42eb42a4f5bf%3A0x336ca4f0f302ff2e!2sFour%20Peaks%20Surgery%20Center!5e0!3m2!1sen!2sus!4v1640197119819!5m2!1sen!2sus" loading="lazy" />
                </Card>
            </CardGroup>
            <Card id='footer'>
                <Card.Text id='center'>Four Peaks Surgery Center 2021 &#169;<br />Designed and created by <abbr title='zaxdev59@gmail.com'>Zackery Hatch</abbr></Card.Text>
            </Card>
        </footer>
    )
}