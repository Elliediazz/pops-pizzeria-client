import React from "react";

import '../Styling/Components.css';
import Carousel from "./Helpers/Carousel";
import customers from "./Assets/1.png";
import pizza from "./Assets/meatloverfull.jpg";
import aboutusimg from "./Assets/aboutusimg.jpg";
import Button from 'react-bootstrap/Button';
import { CarouselData } from "./Helpers/CarouselData";
import { BsFillGeoAltFill } from "react-icons/bs";;


function Home() {
    return(
        <div className="home-main-div">
            <div className="landing-page">
                <img className="customers" src={customers} alt="Customers"/>
                <img className="pizza" src={pizza} alt="Pizza"/>
                <div className="name">Pop's Pizza</div>
                <div className="menu-link">
                    <div className="favorites">Find Your Favorites Here</div>
                    <div className="d-grid gap-2">
                        <Button variant="outline-light" size="lg" >ORDER NOW</Button>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="center" ><BsFillGeoAltFill/>1021 Portion Rd Lake Ronkonkoma, NY 11779</h3>
            </div>

            <div className="about-page">
                <div className="about-info">
                    <h1 className="about-title">OUR STORY</h1>
                    <p>Pop's Pizza is an establishment that bears the name of its founder, my grandfather affectionately referred to as Pop, who had always possessed an affinity for crafting pizzas. Pop had cultivated his pizza-making skills from an early age, working in various pizzerias and nurturing his dream of owning his own pizza parlor one day.</p>
                    <p>As Pop matured, he accumulated sufficient resources to bring his long-held aspirations to fruition. He came across a petite shop in a bustling locality and launched Pop's Pizza.</p>
                    <p>Initially, the business was sluggish, but Pop was undaunted. He labored strenuously in the kitchen, refining his recipes and concocting innovative toppings. His persistence paid off, and in no time, Pop's Pizza amassed a faithful following of patrons who were hooked on Pop's delectable pies.</p>
                    <p>To this day, Pop's Pizza is a family-owned and operated venture, with Pop's grandchildren working alongside their parents to maintain the legacy that their grandfather started all those years ago.</p>
                    <p>What is the secret behind Pop's Pizza's enduring prosperity? A lot of affection, commitment, and, of course, the most mouthwatering pizza around.</p>
                </div>
                <div >
                    <img className="about-image" src={aboutusimg} alt="Store Front" ></img>
                </div>

            </div>

            <div className="gallery-page">
                <div className="gallery-intro">
                    <h1 className="gallery-title">Our Gallery</h1>
                </div>
                < Carousel slides={CarouselData} />
            </div>

            <div className="findus-page" id="findus">
                <div className="findus-info">
                    <h1>Location</h1>
                    <p>1021 Portion Rd Lake Ronkonkoma, NY 11779</p>
                    <h1>Hours</h1>
                    <p>Daily: 11:30am - 8:00pm</p>
                    <h1>Contact Us</h1>
                    <p>Tel: (631) 736-3957</p>
                    <p>Email: orderfrompops@gmail.com</p>

                </div>
                <div className="findus-location">
                <iframe 
                    title="Pop's Pizzeria Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.653783485661!2d-73.11125682445069!3d40.83556773004233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e839fd7cd0c873%3A0x6b9f4473ca4679e4!2spoppops%20pizzeria!5e0!3m2!1sen!2sus!4v1680619530005!5m2!1sen!2sus"
                    width="100%" 
                    height="100%" 
                    style={{border:0}}
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
                </div>
            </div>
        </div>
    )
}
export default Home;