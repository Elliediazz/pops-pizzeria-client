import React from "react";
import { specialsCateringMenu } from './Helpers/SpecialsData'

const SpecialsMenu = () => {

  return (
    <div className="specialsCatering-menu">
      {specialsCateringMenu.map((item, index) => (
        <div className="menu-card" key={index}>
          <img src={item.img} alt={item.name} />
          <div className="menu-card-details">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <h3>${item.price} USD</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpecialsMenu;
