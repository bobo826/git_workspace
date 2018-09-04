import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { SearchBar ,List ,PullToRefresh, ListView ,Button } from 'antd-mobile';
const Item = List.Item;
import './pycc.css';

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
            refreshing: true,//是否显示刷新标记
            isLoading: true,//判断数据是否已经加载完整，如果正在加载则isLoading为fasle，否则为true，默认为true
            height: document.documentElement.clientHeight,
            useBodyScroll: false
        };
        this.pageIndex = 0
    }

    componentDidUpdate() {
        if (this.state.useBodyScroll) {
          document.body.style.overflow = 'auto';
        } else {
          document.body.style.overflow = 'hidden';
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
                this.mPoint = new BMap.Point(this.state.point.lng,this.state.point.lat);
                this.map.panTo(this.mPoint);//移动地图
                //标记当前位置
                this.marker = new BMap.Marker(this.mPoint);
                this.marker.enableDragging(); //marker可拖拽
                this.map.addOverlay(this.marker); //在地图中添加marker
                this.marker.addEventListener("click", (e) => {
                    console.log(this.state.point);
                });
                //设置覆盖物
                this.circle = new BMap.Circle(this.mPoint,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.1, strokeOpacity: 0.1});
                this.map.addOverlay(this.circle);
                //使用地图检索功能配置检索范围及关键字
                this.local =  new BMap.LocalSearch(this.map,{renderOptions: {map: this.map, autoViewport: false}}); 
                this.local.searchNearby(this.state.value,this.mPoint,1000);
                this.local.disableFirstResultSelection();//禁用自动选择第一个检索结果
               
    
                //路线规划实例化
                this.driving = new BMap.DrivingRoute(this.map, {renderOptions:{map: this.map, autoViewport: true}});

                //初始化时为自定义标记点添加路线规划事件
                this.init_driving();

                //设置添加标注后的回调函数。参数： pois: Array，通过marker属性可得到其对应的标注
                this.local.setMarkersSetCallback(pois => {
                    console.log(pois);
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
        });

        //初始化渲染自定义检索结果--异步执行
        this.init_panel();
        //初始化时渲染自定义标记点
        this.add_maker();
       
    }


    //初始化渲染自定义的检索结果
    init_panel (){
        this.hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        setTimeout(() => {
            //实际数据源
            this.datas = this.local.getResults().Br;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.datas),
                height: this.hei,
                refreshing: false,
                isLoading: false,
            });
        }, 1500);
    }
    //添加自定义标记点
    add_maker (){
        //当前位置
        this.new_markers = [];//存储自定义点标记点
        this.points_arr = [
            {
                lng: 104.063509,
                lat:  30.685333
            }
            
        ];
        for (const point of this.points_arr) {
            this.new_point = new BMap.Point(point.lng,point.lat);
            this.new_marker = new BMap.Marker(this.new_point);
            this.new_markers.push(this.new_marker);
            this.map.addOverlay(this.new_marker); //在地图中添加marker
        }
        //console.log(this.new_markers);
    }

    //自定义标记点-路线规划
    init_driving (){
        //首先清除上次规划的路线
        this.driving.clearResults();
        for (const new_marker of this.new_markers) {
            new_marker.addEventListener("click",e => {
                //关闭默认信息窗口
                this.map.closeInfoWindow();
                let endPoint = new_marker.point;
                //规划路线具体实现
                this.driving.search(this.mPoint,endPoint);
            });
        }
    }

    //检索提交事件
    onSubmit (value) {
        //清楚上次检索信息
        this.local.clearResults();
        //this.local =  new BMap.LocalSearch(this.map,{renderOptions: {map: this.map, autoViewport: false}}); 
        // 重新检索
        this.local.searchNearby(this.state.value,this.mPoint,1000);
        //初始化渲染自定义检索结果--异步执行
        this.init_panel();
        //添加自定义标记点
        this.add_maker();
        //规划路线
        this.init_driving();
    }



    //下拉刷新事件
    onRefresh ()  {
        //首先清除上次规划的路线
        this.driving.clearResults();
        if (this.state.isLoading) {
            return;
        }
        //this.setState({ refreshing: true });

        this.local.gotoPage(++this.pageIndex);
        setTimeout(() => {//异步获取可用的当前检索数据结果,因为getResults()获取的是最近的检索结果，参照上下文便知道此时获取到的检索结果是第一次检索时的结果，虽然我们已经使用刷新触发了第二次检索，但依然或获取到第一次检索结果，因此需要异步执行获取当前的检索结果。
        //真实数据源
        this.datas = this.local.getResults().Br;
        //console.log(this.datas);
         //console.log(this.datas);
         console.log(this.local.getResults().getNumPages());
         console.log(this.local.getResults().getPageIndex());
         //判断数据是否已经加载完整，如果正在加载则isLoading为fasle，否则为true
         if (this.local.getResults().getPageIndex() <= this.local.getResults().getNumPages()) {
             this.setState({
                 dataSource: this.state.dataSource.cloneWithRows(this.datas),
                 isLoading: false
             });
         }else{
             this.setState({
                 isLoading: true
             });
         }
    }, 600);
    }
    
    //上拉刷新事件
    onEndReached  (event) {
        //首先清除上次规划的路线
        this.driving.clearResults();
        if (this.state.isLoading) {
            return;
        }
        //this.setState({ refreshing: true });
        console.log('reach end', event);      
        this.local.gotoPage(++this.pageIndex);
        setTimeout(() => {
            //真实数据来源
            this.datas = [...this.datas, ...this.local.getResults().Br];
            //console.log(this.datas);
            console.log(this.local.getResults().getNumPages());
            console.log(this.local.getResults().getPageIndex());
            //判断数据是否已经加载完整，如果正在加载则isLoading为fasle，否则为true
            if (this.local.getResults().getPageIndex() <= this.local.getResults().getNumPages()) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.datas),
                    isLoading: false
                });
            }else{
                this.setState({
                    isLoading: true
                });
            }
        }, 1000);
        
    }


    render() {
        const row = (data) => {
          return (
            <div
              style={{
                padding: '0 10px',
                background: 'white',
              }}
            >
              <div style={{ height: '44px', lineHeight: '44px', color: '#888', fontSize: '12px', borderBottom: '1px solid #ddd' }}>
                {data.title}
              </div>
            </div>
          );
        };

        return (
            <div>
               <SearchBar
                  value={this.state.value}
                  placeholder="Search"
                  onSubmit={this.onSubmit.bind(this)}
                  //该函数必须配置.否则无法输入
                  onChange={value => {this.setState({value:value})}}
                  showCancelButton
                />
                <div id ="map"></div>
 

                <div className = "res">
                    {/* <Button
                        style={{ margin: '30px 15px' }}
                        inline
                        onClick={() => this.setState({ useBodyScroll: !this.state.useBodyScroll })}
                    >
                        {this.state.useBodyScroll ? 'useBodyScroll' : 'partial scroll'}
                    </Button> */}
            
            
                    <ListView
                        
                        key={this.state.useBodyScroll ? '0' : '1'}
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderHeader={() => <span>周边{this.state.value}</span>}
                        // renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                        // {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        // </div>)}
                
                        renderRow={row}
                        //renderSeparator={separator}
                        useBodyScroll={this.state.useBodyScroll}
                        style={this.state.useBodyScroll ? {} : {
                        height: this.state.height,
                        border: '1px solid #ddd',
                        margin: '5px 0',
                        }}
                        pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        />}
                        onEndReached={this.onEndReached.bind(this)}
                        pageSize={5}
                    />
                </div>

            </div>
        )
    }
}
