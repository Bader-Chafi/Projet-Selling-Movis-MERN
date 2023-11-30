import React from "react";
import Slider from "../../component/home/Slider";
import '../../component/Styles/home.css';
import HomeHeader from "../../component/home/HomeHeader.js";
import '../../index.js'

const HomePage = () => {
    return (
        <div className="HomePage">
            <Slider />
            <HomeHeader />
        </div>
    )
}

export default HomePage;