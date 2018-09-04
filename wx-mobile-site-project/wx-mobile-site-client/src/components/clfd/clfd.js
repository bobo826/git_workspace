import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { PullToRefresh, ListView, Button } from 'antd-mobile';
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
    //console.log(dataArr);
    return dataArr;
  }
  
  export default class Clfd extends React.Component {
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
        console.log(this.rData);
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
        console.log(this.rData);
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
  
      
      return (
        <div>
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
      </div>
      );
    }
  }

