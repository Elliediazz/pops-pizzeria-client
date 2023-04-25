import React from "react";
import { specialsMenu } from './Helpers/SpecialsData'

const SpecialsMenu = () => {

  return (
    <div className="specials-menu-page">
      <div className="specials-menu">
        {specialsMenu.map((item, index) => (
          <div className="menu-card" key={index}>
            <img src={item.img} alt={item.name} />
            <div className="menu-card-details">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <div className="menu-card-order">
                <h2>${item.price.toFixed(2)} USD</h2>
                <button type="button" class="btn btn-dark">Order Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialsMenu;
