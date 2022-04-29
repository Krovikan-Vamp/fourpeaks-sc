import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Modal, Button } from 'react-bootstrap';

const auth = getAuth();

const CreateUser: Object = () => {

    // createUserWithEmailAndPassword()

    return (<></>)
}

const ModalCreator: Object = (type) => {
    sessionStorage.setItem('currentModal', type)
    console.log(sessionStorage.getItem('currentModal'))

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {sessionStorage.getItem('currentModal')} `User`
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export { CreateUser, ModalCreator }