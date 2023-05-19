import { useState, useEffect } from "react"
import { Link } from "react-router-dom"


function Menu() {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData(){
            const response = await fetch('http://localhost:8080/menu/all')
            const data = await response.json()
            console.log(data)
            setData(data)
        }
        fetchData()
    }, [])

    const display = data && data.map(menu => {
      return(
        <div className="menu-page">
            <div className="menu">
                <div className="menu-card" >
                    <div>
                    {menu.img && <img  className="menu-card-img" src={menu.img} alt={menu.name} />}
                    </div>
                    <div className="menu-card-details">
                        <div><h2>{menu.name}</h2></div>
                        <div><p>{menu.description}</p></div>
                        <div className="menu-card-order">
                            <h4>${menu.price.toFixed(2)} USD</h4>
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
};

export default Menu;