import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';
import './pycc.css';
export default class Pycc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'美食',//检索输入值
            point:{
                lng:100.06792346,
                lat:30.674414441
            }
        }
    }

    componentDidMount() {
        //调用百度地图初始化并且完成相关空间配置
        this.map = new BMap.Map('map');
        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        this.map.addControl(new BMap.GeolocationControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            offset: new BMap.Size(0, 0)//具体控件位置偏移量
        }));
        this.map.centerAndZoom(new BMap.Point(this.state.point.lng,this.state.point.lat), 15);// 初始化地图，设置中心点坐标和地图级别  
        
        console.log(this);
        this.geolocation = new BMap.Geolocation();
        //该方法是异步执行
        this.geolocation.getCurrentPosition((res) => {
            if (this.geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
                this.setState(
                {
                    point:{
                        lng:res.point.lng,
                        lat:res.point.lat
                    }
                });
                console.log(this.state.point);
                this.mPoint = new BMap.Point(this.state.point.lng,this.state.point.lat)
                this.map.panTo(this.mPoint);//移动地图

                //标记该点
                this.marker = new BMap.Marker(this.mPoint);
                console.log(this.state.point);
                this.marker.enableDragging(); //marker可拖拽
                this.map.addOverlay(this.marker); //在地图中添加marker
                this.marker.addEventListener("click", (e) => {
                    console.log(this.state.point);
                });

                //使用地图检索功能，并且配置检索范围及关键字
                this.circle = new BMap.Circle(this.mPoint,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
                this.map.addOverlay(this.circle);
                this.local =  new BMap.LocalSearch(this.map,{renderOptions: {map: this.map, autoViewport: false}}); 
                this.local.searchNearby(this.state.value,this.mPoint,1000);
                this.onSubmit.bind(this);
            } else {
                console.log('failed'+this.getStatus());
            }
        })
    }

    onSubmit (value) {
        this.local.clearResults();
        this.local =  new BMap.LocalSearch(this.map,{renderOptions: {map: this.map, autoViewport: false}}); 
        this.local.searchNearby(this.state.value,this.mPoint,1000);
    }

    //该函数必须配置
    onChange (value) {
        this.setState({ value:value });
    }


    render() {
        return (
            <div>
               <SearchBar
                  value={this.state.value}
                  placeholder="Search"
                  onSubmit={this.onSubmit.bind(this)}
                  onClear={value => console.log(value, 'onClear')}
                  onFocus={() => console.log('onFocus')}
                  onBlur={() => console.log('onBlur')}
                  onCancel={() => console.log('onCancel')}
                  showCancelButton
                  onChange={this.onChange.bind(this)}
                />
                <div id="map"></div>
            </div>
        )
    }
}
