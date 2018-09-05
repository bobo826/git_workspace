import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route ,Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import Home from './components/home/home'; 
import Login from './components/login/login';


class PrivateRoute extends React.Component {
    render () {
      if (this.props.isLogin) {
        return (
          <Route path={this.props.path} component={Home}/>
        )
      } else {
        return (
          <Redirect from={this.props.path} to="/" />
        )
      }
    }
}
  

class App extends React.Component{

    constructor () {
        super();
        this.state = {
          isLogin: false
        }
    }
    componentDidMount () {
        setInterval(() => {
            this.setState({
            isLogin: (localStorage.getItem('isLogin')) === 'true' ? true : false
            })
        }, 200)
    }

    render(){
        return (
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Login} />
                {/* <Route path="/home" component={Home} /> */}
                <PrivateRoute isLogin={this.state.isLogin} path="/home"/>
              </Switch>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('#app')
)

