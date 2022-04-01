import {Alert} from 'react-bootstrap'

export default function oscBanner() {
    return (
        <Alert id='osc'>
            <Alert.Heading id='banner-heading'>Outstanding Surgical Care & Convienient Outpatient Setting</Alert.Heading>
            <p>Join us at Four Peaks Surgery Center</p>
            <p>9425 West Bell Road, Sun City, Arizona 85351</p>
            <p>Serving Peoria, Sun City, Surprise, and much more since 2017!</p>
            <a id='login-button' href='/login'>login</a>
        </Alert>
    )
}