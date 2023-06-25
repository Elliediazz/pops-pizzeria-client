import React, { useState, useEffect } from "react";
import { cateringMenu } from './Helpers/CateringData';
import { Button, Modal } from 'react-bootstrap';

const CateringMenu = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setShowModal(true); // Open the modal when the component mounts
  }, []);

  return (
    <div className="catering-menu-page">
      <div className="sticky-note">
        <span className="phone-number">Tel: (631) 336-2762</span>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>EVENT CATERING</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>
            Are you planning a special event or celebration? Let us handle the catering, so you can focus on enjoying
            your guests. Contact us today to start planning your catering order and make your event unforgettable!
          </h2>
          <br></br>
          <h5>Tel: (631) 336-2762</h5>
          <h5>Email: <a href="mailto:orderfrompops@gmail.com">orderfrompops@gmail.com</a></h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="catering-menu">
        {cateringMenu.map((item, index) => (
          <div className="catering-card" key={index}>
            {item.img && <img className="menu-card-img" src={item.img} alt={item.name} />}
            <div className="catering-card-details">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <h3>${item.price.toFixed(2)} USD</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CateringMenu;