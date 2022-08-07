import React from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdFacebook } from "react-icons/md";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Abonnez-vous aux emails Aventure pour recevoir nos meilleures offres
          commerciales
        </p>
        <p className="footer-subscription-text">
          Vous pouvez vous désinscrire à tout moment.
        </p>
        <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <Button buttonStyle="btn--outline">S'abonner</Button>
          </form>
        </div>
      </section>
      <div class="footer-links">
        <div className="footer-link-wrapper">
          <div class="footer-link-items">
            <h2>About Us</h2>
            <Link to="/home">Comment ça fonctionne</Link>
            <Link to="/home">Témoignages</Link>
            <Link to="/home">Careers</Link>
            <Link to="/home">Investisseurs</Link>
            <Link to="/home">Conditions d'utilisation</Link>
          </div>
          <div class="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="/home">Contact</Link>
            <Link to="/home">Aide</Link>
            <Link to="/home">Destinations</Link>
            <Link to="/home">Parrainages</Link>
          </div>
          {/* <div class='footer-link-items'>
            <h2>Videos</h2>
            <Link to='/'>Submit Video</Link>
            <Link to='/'>Ambassadors</Link>
            <Link to='/'>Agency</Link>
            <Link to='/'>Influencer</Link>
          </div> */}
          <div class="footer-link-items">
            <h2>Social Media</h2>
            <Link to="/home">Instagram</Link>
            <Link to="/home">Facebook</Link>
            <Link to="/home">Youtube</Link>
            <Link to="/home">Twitter</Link>
          </div>
        </div>
      </div>
      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
            <Link to="/" className="social-logo">
              آفار هبال
              <i class="fab fa-typo3" />
            </Link>
            <i>
              <FontAwesomeIcon
                icon={<MdFacebook />}
                role="button"
              ></FontAwesomeIcon>
            </i>
          </div>
          <small class="website-rights">آفار هبال © 2022</small>
          <div className="flexspacebetweenn">
            <div className="facebook">
              <FacebookOutlinedIcon />
            </div>
            <div className="twitter">
              <TwitterIcon />
            </div>
            <div className="youtube">
              <YouTubeIcon />
            </div>
            <div className="insta">
              <InstagramIcon />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
