import { useState, useEffect } from "react";

function SpecialsMenu() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/specials/all");
        if (!response.ok) {
          throw new Error("Failed to fetch specials");
        }
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No specials available</div>;
  }

  const display = data && data.map(specials => {
    return(
      <div className="menu-page">
          <div className="menu">
              <div className="menu-card" >
                  <div>
                  {specials.img && <img  className="menu-card-img" src={specials.img} alt={specials.name} />}
                  </div>
                  <div className="menu-card-details">
                      <div><h2>{specials.name}</h2></div>
                      <div><p>{specials.description}</p></div>
                      <div className="menu-card-order">
                          <h4>${specials.price.toFixed(2)} USD</h4>
                          <button type="button" className="btn btn-dark">Order Now</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  })

  return (
    <div className="menu-page">
      {display}
    </div>
  );
}

export default SpecialsMenu;
