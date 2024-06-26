import React from "react";

import '../Styling/Components.css';
import Carousel from "./Helpers/Carousel";
import aboutusimg from "./Assets/aboutusimg.jpg";
import Button from 'react-bootstrap/Button';
import { SocialIcon  } from 'react-social-icons';
import { CarouselData } from "./Helpers/CarouselData";
import { BsFillGeoAltFill } from "react-icons/bs";;


function Home() {
    return(
        <div className="home-main-div">
            <div className="landing-page">
                <div className="eats">
                    <div className="eats-images"></div>
                </div>
                <div className="menu-link">
                    <h1 className="favorites">Find Your Favorites Here</h1>
                    <Button variant="outline-light" size="lg" href="/menu" >ORDER NOW</Button>
                </div>
            </div>
            {/* <div className="address" >
                <h3><BsFillGeoAltFill/>1021 Portion Rd Lake Ronkonkoma, NY 11779</h3>
            </div> */}
            <div className="about-page">
                <div className="about-info">
                    <h1 className="about-title">Our Origins </h1>
                    <p>Pop's Pizza was named after its founder, my grandfather whom we called Pop, who had always had a love for making pizzas. Pop had been working in pizzerias since he was a teenager and had always dreamed of owning his own place one day.</p>
                    <p>As he grew older, Pop saved up enough money to finally make his dream a reality. He found a small storefront in a bustling neighborhood and opened Pop's Pizza. At first, business was slow, but Pop didn't let that deter him. He spent long hours in the kitchen, perfecting his recipes and experimenting with new and innovative toppings. His hard work paid off, and before long, Pops Pizza had a loyal following of customers who couldn't get enough of Pop's delicious pies.</p>
                    <p>To this day, Pop's Pizza remains a family-owned and operated business, with Pop's grandchildren now working alongside their parents to carry on the legacy that their grandfather started all those years ago.</p>
                    <p>The secret to Pop's Pizza's success? A whole lot of love, dedication, and of course, the best pizza around.</p>
                </div>
                <div >
                    <img className="about-image" src={aboutusimg} alt="Store Front" ></img>
                </div>

            </div>
            {/* <div className="reviews">
                reviews
            </div> */}
            <div className="gallery-page">
                <div className="gallery-header">
                    <h1>Our Menu</h1>
                    <p>Our pizzeria menu offers a wide selection of delicious pizzas, made with the freshest and finest ingredients. Whether you're a fan of classic Margherita or adventurous toppings like eggplant and anchovies, we have something for everyone.</p>
                    <br></br>
                    <p>Our menu also offers hero sandwiches, including chicken, meatball, and sausage parmigiana, and dinner entrees like Chicken Francese, Veal Marsala, and Shrimp Francese served with linguine, ziti or a salad.</p>
                </div>
                < Carousel slides={CarouselData} />
            </div>

            <div className="findus-page" id="findus">
                <div className="findus-info">
                    <div className="info">
                        <h4><BsFillGeoAltFill/> 1021 Portion Rd </h4>
                        <h4>Lake Ronkonkoma, NY 11779</h4>
                    </div>
                    <div className="info">
                        <h3>Hours:</h3>
                        <h6>Monday: 12:00am - 9:00 PM</h6>
                        <h6>Tuesday - Wednesday: 11:30am - 9:00 PM</h6>
                        <h6>Thursday - Saturday: 11:30am - 1:00 AM</h6>
                        <h6>Sunday: 12:00am - 8:00 PM</h6>
                    </div>
                    <div className="info">
                        <h3>Contact Us:</h3>
                        <h6>Tel: (631) 336-2762</h6>
                        <h6>Email: <a href="mailto:orderfrompops@gmail.com">orderfrompops@gmail.com</a></h6>
                    </div>
                </div>
                <div className="findus-location">
                <iframe 
                    title="Pop's Pizzeria Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.6358457042556!2d-73.07031882373137!3d40.83596167137524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e8472a9b5eaf69%3A0xbb4234f8cd17c135!2sPop&#39;s%20Pizza!5e0!3m2!1sen!2sus!4v1680625659673!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}}
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer">
                </iframe>
                </div>
            </div>
            <footer className="footer">
                <div className="footer-container">
                    <h4>Find us on Social Media</h4>
                    <div className="socialIcons">
                        <div className='icons'><SocialIcon url="https://www.facebook.com/popspizzaRonkonkoma/" target="_blank" network="facebook" className='icon'/></div>	
                        <div className='icons'><SocialIcon url="https://www.instagram.com/popspizzaronkonkoma/" target="_blank" network="instagram" className='icon'/></div>
                        <div className='icons'><SocialIcon url="https://linktr.ee/popspizzaronkonkoma" target="_blank" network="linktree" className='icon'/></div>	
                    </div>
                    <span>Copyright © 2023 DiazDesigns</span>
                </div>
            </footer>
        </div>
    )
}
export default Home;