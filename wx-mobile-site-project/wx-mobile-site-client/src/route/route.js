import React ,{Component} from 'react';
import {BrowserRouter,HashRouter,Route} from 'react-router-dom';
import SwiperShow from '../components/swiper/swiper';
import Nav from '../components/nav/nav';
import Content from '../components/content/content';
class AppRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div id = "app">
                <SwiperShow/>
                <Nav />
                <Content />
            </div>
        );
    }
}

export default AppRoute;