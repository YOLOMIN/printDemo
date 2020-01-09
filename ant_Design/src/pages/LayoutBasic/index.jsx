import React from 'react';
import { Layout } from 'antd';
import styles from './index.less';
import 'antd/dist/antd.css';

import { Input } from 'antd';
import { Button } from 'antd';
import {webSocket} from "antd";
import Select_print from '../SelectBasic';
import ButtonBasic from '../ButtonBasic';
import BasicDemo from '../BasicDemo.jsx';



const { Header, Footer,  Content } = Layout;

//打印机列表
var print_list=new Array();
//默认打印机
var defaultPrinter='';
var printListString='';



export default class LayoutBasic extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        value:'',
        print_list:[],
        defaultPrinter:"请选择打印机"
    }
    this.myRef=React.createRef();

   // console.log("我是LayoutBasic类中得constructor"+this.props)
}
componentDidMount() {
//生命周期函数，第一次挂载该组件得时候调用
//console.log("我是LayoutBasic函数得生命周期函数")
 
  //console.log('我是LayoutBasic函数得生命周期函数 window this:',this);


}

  addTextToEditor=()=>{
    //通过文本框调用文本编辑器中的addText函数给编辑器添加文本数据，当点击添加按钮的时候触发该函数，
  //  console.log("添加按钮的this作用域：",this)
 // alert(this.state.value)
    //console.debug(this.myRef.current.addText(this.state.value))
   // this.instance.current.addText(this.state.value)
    this.editorInstance.addText(this.state.value)
     //将文本输入框中得内容清空---待添加
     this.setState({value: ''})
    
     
  }

  handleChange_input=(event)=>{
    //文本输入框中的重新赋值，当文本框的内容发生变化的时候调用该函数
    //console.log("我是文本框")
    this.setState({value: event.target.value});
  }

  //从LayoutBasic父组件中调用BasicDemo子组件中的方法
  printText=()=>{
    //调用编辑器中的方法，进行打印编辑器中的文本内容，当点击打印按钮的时候触发该函数
    this.editorInstance.printTextadd();

  }
  //获取从Select子组件中将其选中的值传回来给父组件LayoutBasic
  getDefaultPrint=(data)=>{
   // alert("我是LayoutBasic中的getDefaultPrint函数，我正在给defaulPrinter赋值"+data)
    this.setState({
      defaultPrinter:data
    })
   
  }

  render(){
  
        return (
      <div className={styles.container}>
        <div id="components-layout-demo-basic">
          
            <Layout>
              <Header style={{heigth:70,textAlign: 'left',fontsize:'1.2em'}}>
                  <label>打印机</label><br /> 
                  <Select_print value={this.props}  getDefaultPrint={this.getDefaultPrint}/>      
              
              </Header>
              <Content>
                
              <BasicDemo value={this.state.defaultPrinter} ref={instance => this.editorInstance = instance} />

              </Content>
              <Footer style={{textAlign:'left'}}>

                <Input 
                style={{width:500}} 
                palceholder="请输入文字..." 
                type="text"
                name="input_text"
                id="input_text"
                value={this.state.value}
                onChange={this.handleChange_input}
                
                />
    
                <Button  onClick={this.addTextToEditor}>添加</Button>
               
              <div>
              <Button  onClick={this.printText} >打印</Button>
            
              </div>
              </Footer>
            </Layout>
    
        </div>
      </div>
        )
      }
     
     

} 


//  <ButtonBasic />
