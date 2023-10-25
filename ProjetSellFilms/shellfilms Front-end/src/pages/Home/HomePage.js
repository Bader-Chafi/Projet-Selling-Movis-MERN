import React from "react";
import Slider from "../../component/home/Slider";
import '../../component/Styles/home.css';
import HomeCategory from "../../component/home/HomeCategory";
import '../../index.js'

const HomePage = () => {
    return (
        <div className="HomePage">
            <Slider />
            <HomeCategory />
        </div>
    )
}

export default HomePage;