import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'antd-mobile/dist/antd-mobile.css';
import '../src/index.css';
//轮播swiper板块
import SwiperShow from './components/swiper/swiper';
import ad1 from './static/img/ad1.jpg';
import ad2 from './static/img/ad2.jpg';
//首页导航nav板块
import Nav from './components/nav/nav';
//首页导航nav板块对应的子页面‘泊悦车场页面’
import Pycc from './components/pycc/pycc';
//首页导航content板块
import Content from './components/content/content';


class App extends React.Component{
    componentWillMount() {
        //发送动态请求：请求轮播图片(图片链接)，或者其他资源。
    }
    render(){
        return(
            <div id = "app">
                <SwiperShow bg_img = {[ad2,ad1]} />
                <Nav />
                <Content />
            </div>
        )
    }
}



// nav导航板块对应的子页面：
//车辆防盗页面
class Clfd extends Component {
    render() {
        return (
            <div>
                车辆防盗页面
            </div>
        )
    }
}

//月租续费页面
class Yzxf extends Component {
    render() {
        return (
            <div>
                月租续费页面
            </div>
        )
    }
}
//车位租聘页面
class Cwzp extends Component {
    render() {
        return (
            <div>
                车位租聘页面
            </div>
        )
    }
}




class AppRoute extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/clfd" component={Clfd} />
                    <Route path="/pycc" component={Pycc} />
                    <Route path="/yzxf" component={Yzxf} />
                    <Route path="/cwzp" component={Cwzp} />
                </Switch>
            </Router>
        );
    }
}



ReactDOM.render(<AppRoute />, document.querySelector('body'));

