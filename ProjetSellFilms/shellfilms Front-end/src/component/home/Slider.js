// import slide from "../../images/headOffer.png";
import "../Styles/home.css";
import { Col } from "react-bootstrap";

const Slider = () => {
  return (
    <>
      <section className="headPG">
        <Col className="titlePG container">
          <div className="titleP">
            <h1>Sell Movies to Watch, Anytime Anywhere.</h1>
            <p>The search is over! Let Plex help you find the perfect movie to watch tonighta reasonable price for .</p>
            <button className="btn_buy">
              BUY NOM
            </button>
          </div>
        </Col>
        
      </section>
    </>
  )
}

export default Slider;