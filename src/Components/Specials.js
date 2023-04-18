import React from "react";


const CateringMenu = () => {
  const cateringMenu = [
    {
      name: 'Baked Lasagna',
      price: 45.00,
      description: 'Layers of pasta, meat sauce, and cheese baked to perfection',
      img: 'https://example.com/baked-lasagna.jpg',
      category: 'Pasta'
    },
    {
      name: 'Baked Stuffed Shells',
      price: 43.68,
      description: 'Large pasta shells stuffed with ricotta cheese, baked in tomato sauce',
      img: 'https://example.com/stuffed-shells.jpg',
      category: 'Pasta'
    },
    {
      name: 'Penne Alla Vodka',
      price: 38.00,
      description: 'Penne pasta in a creamy tomato sauce with a splash of vodka',
      img: 'https://example.com/penne-vodka.jpg',
      category: 'Pasta'
    },
    {
      name: 'Party Heros',
      price: 20.80,
      description: 'American or Italian style, choose your favorite',
      img: 'https://example.com/party-hero.jpg',
      category: 'Dinner'
    },
    // ...add more items as needed
  ];

  return (
    <div className="catering-menu">
      {cateringMenu.map((item, index) => (
        <div className="menu-card" key={index}>
          <img src={item.img} alt={item.name} />
          <div className="menu-card-details">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <h3>${item.price.toFixed(2)} USD</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CateringMenu;
