import React from "react";
import { cateringMenu } from './Helpers/CateringData'

const CateringMenu = () => {

  return (
    <div className="catering-menu-page">
      <h1>Are you planning a special event or celebration? Let us handle the catering, so you can focus on enjoying your guests. Contact us today to start planning your catering order and make your event unforgettable! </h1>
      <div className="catering-menu">
        {cateringMenu.map((item, index) => (
          <div className="catering-card" key={index}>
            {item.img && <img  className="menu-card-img" src={item.img} alt={item.name} />}
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