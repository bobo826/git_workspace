import React, { Component } from 'react';
import { SearchBar ,List ,PullToRefresh, ListView } from 'antd-mobile';
const Item = List.Item;
import './pycc.css';


const ListBody = (props) => {
    return (
      <div>
        {props.children}
      </div>
    );
}
  

export default class Pycc extends Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            value:'停车场',//检索输入值
            point:{
                lng:100.06792346,
                lat:30.674414441
            },
            search_point:[],
            dataSource,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
        };
        this.pageIndex = 0;
    }

    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
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

                //当前位置
                this.mPoint = new BMap.Point(this.state.point.lng,this.state.point.lat)
                this.map.panTo(this.mPoint);//移动地图

                //标记当前位置
                this.marker = new BMap.Marker(this.mPoint);
                
                this.marker.enableDragging(); //marker可拖拽
                this.map.addOverlay(this.marker); //在地图中添加marker
                this.marker.addEventListener("click", (e) => {
                    console.log(this.state.point);
                });
               
                //设置覆盖物
                this.circle = new BMap.Circle(this.mPoint,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
                this.map.addOverlay(this.circle);
                //使用地图检索功能配置检索范围及关键字
                this.local =  new BMap.LocalSearch(this.map,{renderOptions: {map: this.map, autoViewport: false }}); 
                this.local.searchNearby(this.state.value,this.mPoint,1000);
                // console.log(this.local.gotoPage(1));
                
                this.local.disableFirstResultSelection();//禁用自动选择第一个检索结果
               
                
                //路线规划实例化
                this.driving = new BMap.DrivingRoute(this.map, {renderOptions:{map: this.map, autoViewport: true}});
                //设置添加标注后的回调函数。参数： pois: Array，通过marker属性可得到其对应的标注
                this.local.setMarkersSetCallback(pois => {
                    for (const poi of pois) {
                            // 为每个marker点添加事件，该事件用来规划路线
                            poi.marker.addEventListener("click",e => {
                            //关闭默认信息窗口
                            this.map.closeInfoWindow();
                            let endPoint = poi.marker.point;
                            //规划路线具体实现
                            this.driving.search(this.mPoint,endPoint);
                        });
                       
                    }
                });
                //检索提交事件
                this.onSubmit.bind(this);
                //自定义的检索结果面板
            } else {
                console.log('failed'+this.getStatus());
            }
        })
    }

    

    onRefresh() {
        this.local.gotoPage(++this.pageIndex);
        //console.log(this.local.getResults().Br);
        let datas = this.local.getResults().Br;
        console.log(datas);
        this.setState({dataSource:this.state.dataSource.cloneWithRows(datas)});
        this.row = (data) => {
                return (
                    <div>{data.title}</div>
                );
        }
    }



    onSubmit (value) {
        //清楚上次检索信息
        this.local.clearResults();
        //this.local =  new BMap.LocalSearch(this.map,{renderOptions: {map: this.map, autoViewport: false}}); 
        // 重新检索
        this.local.searchNearby(this.state.value,this.mPoint,1000);

        //设置添加标注后的回调函数。参数： pois: Array，通过marker属性可得到其对应的标注
        
        //清除上次规划的路线
        this.driving.clearResults();
        this.local.setMarkersSetCallback(pois => {
            for (const poi of pois) {
                    // 为每个marker点添加事件，该事件用来规划路线
                    poi.marker.addEventListener("click",e => {
                    //关闭默认信息窗口
                    this.map.closeInfoWindow();
                    let endPoint = poi.marker.point;
                    //规划路线具体实现
                    this.driving.search(this.mPoint,endPoint);
                });
            }
        });

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
                  onFocus={this.onRefresh.bind(this)}
                  onBlur={() => console.log('onBlur')}
                  onCancel={() => console.log('onCancel')}
                  showCancelButton
                  onChange={this.onChange.bind(this)}
                />
                <div id ="map"></div>
                <div id = "res"></div>
                <ListView
                    renderBodyComponent={() => <ListBody />}
                    key="0"
                    dataSource={this.state.dataSource}
                    renderRow={this.row}
                    useBodyScroll={this.state.useBodyScroll}
                    pullToRefresh={
                        <PullToRefresh
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                    pageSize={10}
                />

              

            </div>
        )
    }
}
