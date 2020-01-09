import React from "react";
import styles from "./index.less";
import { Select } from "antd";
import  '../printList.js';
import {webSocket} from "antd";
const {Option,OptGroup }=Select;


//打印机列表
var print_list=new Array();
//默认打印机
var defaultPrinter='';
var printListString='';



export default class Select_print extends React.Component {

  printListName=new Array()
  //构造函数
  constructor(props) {
    super(props);
    this.state = {
      printList:[''],
      defaultPrinter:"请选择打印机"
    }

   
  }

  componentDidMount() {
    //生命周期函数，第一次挂载该组件得时候调用

      console.log('我是Select得生命周期函数 window this:',this.props.value.value);
      
   
    console.log('Select中得生命周期函数:',this.state.printList);
    
   
    
    }
    
  onChange=()=>{
  
      console.log('Select中得onChange:',this);
      this.setState({
        printList:this.props.value.value
      })
      
  }
  //当文本框选中valu的时候调用的函数--用于Select子组件给LayoutBasic传值获取选中的打印机名称
  getSelectValue=(value)=>{
   // alert("我是getSelectValue"+value)
    this.props.getDefaultPrint(value)
  }

  render() {
   
    return (
      <Select 
      placeholder={this.state.defaultPrinter} 
      style={{ width: 300 }} 
      onChange={this.onChange}
      onSelect={this.getSelectValue}
      >
        
      {this.state.printList.map(it => (
            <Select.Option key={it.toString()} value={it.toString()}>
               {it.toString()}
            </Select.Option>
             ))}
      </Select>
      );
    }
   
}

