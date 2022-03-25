import { Carousel } from "react-bootstrap"


export default function CarouselBanner() {
    return (
        <Carousel variant='dark' id='carousel-banner'>
            <Carousel.Item  interval={3000}>
                <img
                    className="d-block w-100"
                    src="./Images/AUUA-Banner.jpg"
                    alt="Academic Urology"
                />
                {/* <Carousel.Caption>
                    <h3>Meet the Surgeons</h3>
                </Carousel.Caption> */}
            </Carousel.Item>
            {/* <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    src="phone1.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Patient and Family Lobby</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img
                    className="d-block w-100"
                    src="phone2.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                </Carousel.Caption>
            </Carousel.Item> */}
        </Carousel>
    )
}