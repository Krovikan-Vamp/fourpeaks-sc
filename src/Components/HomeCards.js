import { Card, Button, CardGroup, Nav } from 'react-bootstrap'


export default function CardWithPic() {
  return (
    <CardGroup id='main-cg' >
      <Card><Nav.Link className='card-anchor' href='/patients/paperwork' >
        <Card.Img alt='' variant='top' src='./Images/contract.png' />
        <Card.Title>Paperwork</Card.Title>
      </Nav.Link></Card>
      <Card><Nav.Link className='card-anchor' href='/about/surgeons'>
        <Card.Img alt='' variant='top' src='./Images/doctor.png' />
        <Card.Title>Surgeons</Card.Title>
      </Nav.Link></Card>
      <Card><Nav.Link className='card-anchor' href='/about'>
        <Card.Img alt='' variant='top' src='./Images/information.png' />
        <Card.Title>About Us</Card.Title>
      </Nav.Link></Card>
      <Card><Nav.Link className='card-anchor' href='/testimonials'>
        <Card.Img alt='' variant='top' src='./Images/testimonial.png' />
        <Card.Title>Testimonials</Card.Title>
      </Nav.Link></Card>
      <Card><Nav.Link className='card-anchor' href='/about/services'>
        <Card.Img alt='' variant='top' src='./Images/sx.png' />
        <Card.Title>Services</Card.Title>
      </Nav.Link></Card>

    </CardGroup>
  )
}