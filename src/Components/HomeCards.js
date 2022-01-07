import { Card, Button, CardGroup, Nav } from 'react-bootstrap'


export default function CardWithPic() {
  return (
    <CardGroup id='main-cg' >
      <Card><Nav.Link href='/patients/dayof' disabled>
        <Card.Img alt='' variant='top' src='./Images/contract.png' />
        <Card.Title>What to expect</Card.Title>
      </Nav.Link></Card>
      <Card><Nav.Link href='/about/surgeons'>
        <Card.Img alt='' variant='top' src='./Images/doctor.png' />
        <Card.Title>Meet the Surgeons</Card.Title>
      </Nav.Link></Card>
      <Card><Nav.Link href='/about'>
        <Card.Img alt='' variant='top' src='./Images/information.png' />
        <Card.Title>About Us</Card.Title>
      </Nav.Link></Card>
      <Card><Nav.Link href='/about' disabled>
        <Card.Img alt='' variant='top' src='./Images/bill.png' />
        <Card.Title>Billing</Card.Title>
      </Nav.Link></Card>
      <Card><Nav.Link href='/about/services'>
        <Card.Img alt='' variant='top' src='./Images/sx.png' />
        <Card.Title>Services</Card.Title>
      </Nav.Link></Card>

    </CardGroup>
  )
}