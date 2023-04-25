import React from "react";
import { menu } from './Helpers/MenuData'

const Menu = () => {

  return (
    <div className="menu-page">
      <div className="menu">
        {menu.map((item, index) => (
          <div className="menu-card" key={index}>
            <div>
              <img className="menu-card-img" src={item.img} alt={item.name} />
            </div>
            <div className="menu-card-details">
              <div><h2>{item.name}</h2></div>
              <div><p>{item.description}</p></div>
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

export default Menu;