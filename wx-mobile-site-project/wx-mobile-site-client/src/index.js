import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { PullToRefresh, ListView, Button } from 'antd-mobile';
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
// class Clfd extends Component {
//     render() {
//         return (
//             <div>
//                 车辆防盗页面
//             </div>
//         )
//     }
// }




//数据来源
const data = [
    {
  
      des: '不是所有的兼职汪都需要风吹日晒'
    },
    {
  
      des: '不是所有的兼职汪都需要风吹日晒'
    },
    {
  
      des: '不是所有的兼职汪都需要风吹日晒'
    },
  ];
  const NUM_ROWS = 8;//默认下拉刷新前页面显示几条信息
  let pageIndex = 0;//页面索引
  
  function genData(pIndex = 0) {
    const dataArr = [];
    for (let i = 0; i < NUM_ROWS; i++) {
      dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    console.log(dataArr);
    return dataArr;
  }
  
  class Clfd extends React.Component {
    constructor(props) {
      super(props);
      const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
  
      this.state = {
        dataSource,
        refreshing: true,
        isLoading: true,
        height: document.documentElement.clientHeight,
        useBodyScroll: false,
      };
    }
 
  
    componentDidUpdate() {
      if (this.state.useBodyScroll) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
    }
  
    componentDidMount() {
      const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
  
      setTimeout(() => {
        this.rData = genData();
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(genData()),
          height: hei,
          refreshing: false,
          isLoading: false,
        });
      }, 1500);
    }
  
    onRefresh ()  {
      this.setState({ refreshing: true, isLoading: true });
      // simulate initial Ajax
      setTimeout(() => {
        this.rData = genData();
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          refreshing: false,
          isLoading: false,
        });
      }, 600);
    };
  
    onEndReached  (event) {
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      if (this.state.isLoading) {
        return;
      }
      console.log('reach end', event);
      this.setState({ isLoading: true });
      setTimeout(() => {
        this.rData = [...this.rData, ...genData(++pageIndex)];
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
        });
      }, 1000);
    };
  
    render() {
      const separator = (sectionID, rowID) => (
        <div
          key={`${sectionID}-${rowID}`}
          style={{
            backgroundColor: 'green',
            height: 8,
            borderTop: '1px solid #ECECED',
            borderBottom: '1px solid #ECECED',
          }}
        />
      );
      let index = data.length - 1;
      //list元信息
      const row = (rowData, sectionID, rowID) => {
        if (index < 0) {
          index = data.length - 1;
        }
        const obj = data[index--];
        return (
          <div key={rowID}
            style={{
              padding: '0 15px',
              backgroundColor: 'white',
            }}
          >
            <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
              {obj.des}
            </div>
          </div>
        );
      };
  
      
      return (<div>
        <Button
          style={{ margin: '30px 15px' }}
          inline
          onClick={() => this.setState({ useBodyScroll: !this.state.useBodyScroll })}
        >
          {this.state.useBodyScroll ? 'useBodyScroll' : 'partial scroll'}
        </Button>
  
  
        <ListView
          key={this.state.useBodyScroll ? '0' : '1'}
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderHeader={() => <span>Pull to refresh</span>}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
  
          renderRow={row}
          renderSeparator={separator}
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
      </div>);
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

