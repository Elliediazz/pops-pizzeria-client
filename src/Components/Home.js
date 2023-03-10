import React from "react";

import '../Styling/Components.css'
import customers from "../Assets/1.png";
import pizza from "../Assets/meatloverfull.jpg";
import pizzatwo from "../Assets/meatloverfull.jpg";
import pizzathree from "../Assets/meatloverfull.jpg";
import Button from 'react-bootstrap/Button'


function Home() {
    return(
        <div className="home-main-div">
            <div className="landing-page">
                <img className="customers" src={customers} alt="Customers"/>
                <img className="pizza" src={pizza} alt="Pizza"/>
                <div class="name">Pop's Pizzeria</div>
                <div class="menu-link">
                    <div class="favorites">Find Your Favorites Here</div>
                    <div className="d-grid gap-2">
                        <Button variant="outline-light" size="lg" >ORDER NOW</Button>
                    </div>
                </div>
            </div>
            <div className="about-page">
                <div className="about-info">

                </div>
                <div className="about-image">

                </div>

            </div>
            <div className="gallery-page">
                <div className="gallery-intro">
                    <h1>Our Gallery</h1>
                </div>
                <img className="gallery" src={pizzathree} alt="Pizza"/>
            </div>
            <div className="findus-page" id="findus">
                <div className="findus-info">

                </div>
                <div className="findus-location">

                </div>

            </div>

        </div>
    )
}
export default Home;