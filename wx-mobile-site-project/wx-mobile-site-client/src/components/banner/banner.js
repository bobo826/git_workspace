import React, { Component } from 'react';
import Ad1 from './ad1.jpg';
import Ad2 from './ad2.jpg';
import './banner.css';
class Banner extends Component {
    render() {
        return (
            <section class="slider-contaner">
                <ul class="slider">
                    <li class="slider-item slider-item1"></li>
                    <li class="slider-item slider-item2"></li>
                    <li class="slider-item slider-item3"></li>
                    <li class="slider-item slider-item4"></li>
                    <li class="slider-item slider-item5"></li>
                </ul>
                <div class="focus-container">
                    <ul class="floatfix"> 
                        <li><div class="focus-item focus-item1"></div></li>
                        <li><div class="focus-item focus-item2"></div></li>
                        <li><div class="focus-item focus-item3"></div></li>
                        <li><div class="focus-item focus-item4"></div></li>
                        <li><div class="focus-item focus-item5"></div></li>
                    </ul>
                </div>
            </section>
        );
    }
}

export default Banner;