import { Nav, NavDropdown, Button, Container } from 'react-bootstrap';



// Use this down the road when you feel like it
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
const LandingPage = () => {
    const userCredential = getCookie('userCredential')
    const userInfo = JSON.parse(userCredential).user;

    return (
        <Container id='big-land-cont'>
            <Container className='user-container' id='user-toolbox'>
                <h4>Toolbox 🛠</h4>
            </Container>
            <Container className='user-container' id='landing-page'>
                <h4>Welcome, {userInfo.email}</h4>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit possimus adipisci quae quam error mollitia, maiores dicta modi eum ipsam, soluta aperiam id tenetur accusantium rerum porro! Similique, exercitationem officia?</p>
            </Container>
        </Container>

    )


}

export { LandingPage, getCookie, setCookie };