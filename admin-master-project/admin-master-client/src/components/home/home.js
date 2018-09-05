import React from 'react';
import { Button } from 'antd';

export default class Home extends React.Component{
    constructor(props) {
        super(props); 
    }

    render(){
      return (
        <Button onClick={(e) => {e.preventDefault();window.localStorage.setItem("isLogin",false)}} />
      )
    }
}
