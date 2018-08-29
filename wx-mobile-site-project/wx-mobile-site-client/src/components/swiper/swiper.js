import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import './swipershow.css';
import ad1 from './ad1.jpg';
import ad2 from './ad2.jpg';

class SwiperShow extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        new Swiper(this.swiperID, {
            pagination: {
                el: this.paginateID,
            },
            autoplay:true//自动播放
        });
    }
    //轮播图遍历渲染，使用两个方法分别渲染其图片及索引，使用了两个函数是因为其轮播结构需要两次单独的遍历才可以让dom结构完整
    //遍历渲染轮播图片
    render_swiper_img() {
        return (
            this.props.bg_img.map(
                (item,index) => { 
                    return <div className="swiper-slide" style = {{backgroundImage:`url(${item}`}} key={index} ></div>;
                } 
            )
        ) 
    }
    //遍历渲染轮播图片索引
    render_swiper_index() {
        return(
            this.props.bg_img.map(
                (item,index) => { 
                    return <span className="swiper-pagination-bullet"></span>;
                } 
            )
        )
    }

    render() {
        return (
            <div className="swiper-container swiper-container-horizontal swiper-container-android" ref={self => this.swiperID = self}>
                <div className="swiper-wrapper">
                    {/* 遍历渲染轮播图片 */}
                    {this.render_swiper_img()}
                </div>
                <div className="swiper-pagination swiper-pagination-bullets" ref={self => this.paginateID = self}>
                    {/* 遍历渲染轮播图片索引 */}
                    {this.render_swiper_index()}
                </div>
            </div>
        )
    }
}
//由于是用ES6 class语法创建组件，其内部只允许定义方法，而不能定义属性，class的属性只能定义在class之外。
//所以propTypes要写在组件外部。对于之前的getDefaultProps方法，由于props不可变，所以现在被定义为一个属性，
//和propTypes一样，要定义在class外部。
SwiperShow.propTypes = {
    bg_img: PropTypes.array
}
SwiperShow.defaultProps = {
    bg_img:[ad1,ad2]//默认banner图
}
export default SwiperShow;

