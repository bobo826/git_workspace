import React, { Component } from 'react'
import { Flex ,Grid , List ,WhiteSpace} from 'antd-mobile';
const Item = List.Item;
import './content.css';
//默认活动gif图片
import grid_left_gif from './static/zhoubianyou.gif';
//默认图标
import n1 from './static/jiayou.png';
import n2 from './static/baoyang.png';
import n3 from './static/chexian.png';
import n4 from './static/xiche.png';
const data = [
    {icon: `${n1}`,text: '特惠加油',badge:true},
    {icon: `${n2}`,text: '保养'},
    {icon: `${n3}`,text: '保险'},
    {icon: `${n4}`,text: '洗车'}
]
export default class Content extends Component {
    render() {
        return (
            <div>
                <Flex style={{background:"white"}}>
                    <Flex.Item className = 'common grid_left'>
                        <img src = {grid_left_gif} alt="活动动态图.gif" />
                    </Flex.Item>
                    <Flex.Item className = 'common grid_right' style={{margin:"0px"}}>
                        <Grid 
                            data={data} 
                            columnNum  = {2}
                            itemStyle = {{background:'white'}}
                            renderItem={(dataItem) => {
                                if (dataItem.badge == true ) {
                                    return (
                                        // 带有促销样式
                                        <div style={{ padding: '14px', position: "relative"}}>
                                            <img src={dataItem.icon} style={{ width: '50%' }} alt="" />
                                            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                                <span>{dataItem.text}{dataItem.badge}</span>
                                            </div>
                                            <sup className="badge">促</sup>
                                        </div>
                                    )
                                } else {
                                    return (
                                        // 没有带有促销样式
                                        <div style={{ padding: '14px' }}>
                                            <img src={dataItem.icon} style={{ width: '50%' }} alt="" />
                                            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                                <span>{dataItem.text}{dataItem.badge}</span>
                                            </div>  
                                        </div>
                                    )
                                }
                            }
                        }
                        />
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="xs" />
                <List>
                    <Item
                        extra="车辆,钱包,订单"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        arrow="horizontal"
                        onClick={() => {}}
                    >
                        我的钱包
                    </Item>
                </List>
            </div>
        )
    }
}
