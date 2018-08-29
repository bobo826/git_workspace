import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, NavLink , Link } from "react-router-dom";

import { Grid } from 'antd-mobile';
import './nav.css';
import n1 from './static/fangdao.png';
import n2 from './static/daohang.png';
import n3 from './static/yuezu.png';
import n4 from './static/zulin.png';

const data = [
    {icon: `${n1}`,text: '车辆防盗',nav_route:'clfd'},
    {icon: `${n2}`,text: '泊悦车场',nav_route:'pycc'},
    {icon: `${n3}`,text: '月租续费',nav_route:'yzxf'},
    {icon: `${n4}`,text: '车位租聘',nav_route:'cwzp'}
]


class Nav extends Component {
    constructor(props, history) {
        super(props, history); 
    }

    componentWillMount() {}

    render() {
        return (
                <Grid data={data} 
                    hasLine={false}
                    columnNum  = {4}
                    renderItem={dataItem => (
                        <NavLink to = {`/${dataItem.nav_route}`}>
                            <div style={{ padding: '12.5px' }}>
                                <img src={dataItem.icon} style={{ width: '50%' }} alt="" />
                                <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                    <span>{dataItem.text}</span>
                                </div>
                            </div>
                        </NavLink>
                    )}
                />
        )
    }
}

Nav.propTypes = {
    
}

export default Nav