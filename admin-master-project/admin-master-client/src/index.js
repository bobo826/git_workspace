import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import Home from './components/home/home'; 
import Login from './components/login/login';

class App extends React.Component{
    constructor(props) {
        super(props)
    }
    
    render(){
        return (
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
              </Switch>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('#app')
)

