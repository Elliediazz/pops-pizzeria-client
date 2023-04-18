import React from "react";
import { menu } from './Helpers/MenuData'

const Menu = () => {

  return (
    <div className="menu">
      {menu.map((item, index) => (
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

export default Menu;