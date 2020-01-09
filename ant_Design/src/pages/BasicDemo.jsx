import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import Style from './BasicDemo.css'
export default class BasicDemo extends React.Component {



    constructor(props) {
        super(props); 
        this.state = {
            editorState: BraftEditor.createEditorState(''), 
            outputHTML: ''
          }
          
    }
  
      //选择添加文本信息到编辑器的提交按钮
      addText=(value)=>{
       // alert('我是文本编辑器中的函数'+value);
      
        //将文本输入框得内容添加到编辑器中---将父节点中的值传给子节点编辑器中
        
        this.setState({
          editorState: ContentUtils.insertText(this.state.editorState,value)
      
        })
      
      }

        printTextadd=()=>{
          //调用本地打印机打印文本编辑器中的内容
            //通过this.state.editorState.toText()获取文本编辑器中得文本内容
           // console.log("我想要打印数据",this.state.editorState.toText())
            //alert("我要打印数据啦哈",this.state.editorState.toText())
            alert("准备打印...")
            var socket = new WebSocket('ws://localhost:13528')

          //设置打印机配置协议
          var setPrinterConfig={
            "cmd": "setPrinterConfig",
            "requestID": "123458976",
            "version": "1.0",
            "printer": {
              "name": "菜鸟打印机",
              "needTopLogo": true,
              "needBottomLogo": false,
              "horizontalOffset": 0.5,
              "verticalOffset": 0.7,
              "forceNoPageMargins": true,
              "autoPageSize": false,
              "orientation": 0,
              "autoOrientation": false,
              "paperSize": {
                "width": 100,
                "height": 150
              }
            }
          }


            //请求打印协议
            var print_request={
              "cmd": "print",
              "requestID": "123458976",
              "version": "1.0",
              "task": {
                  "taskID": "7293666",
                  "preview": false,
                  "printer": "",
                  "previewType": "pdf",     
                  "firstDocumentNumber": 10,
                  "totalDocumentCount": 100,
                  "documents": [{
                      "documentID": "0123456789",
                      "contents": [{
                      "templateURL":"http://cloudprint.cainiao.com/template/standard/324070/6",
                                  "ver":"waybill_print_secret_version_1",
                                  "data":{"value":"测试数据,我是代码中的测试数据，我希望打印出去"}
                      }
                      ]
                  }]
              }
          }


          //修改打印机配置协议中的打印机名称
          setPrinterConfig.printer.name=this.props.value
          //将协议转换成json数据
          //var print_request_json=JSON.parse(print_request)

          //将文本编辑器中的内容插入到印机协议中
          print_request.task.documents[0].contents[0].data.value=this.state.editorState.toText()

          //将从LayoutBasic组件传来的打印机名称传入协议中
          print_request.task.printer=this.props.value

        // alert("我是LayoutBasic父组件传过来的打印机名称"+this.props.value)

        // console.log("请求打印的协议",print_request.task.documents[0].contents[0].data.value)

          //建立链接
        socket.onopen = function(event)
        {
        
          console.log("请求打印已经建立链接")
          //发送打印机配置的协议
          socket.send(JSON.stringify(setPrinterConfig));
          };

          //发送打印请求出错
          socket.onerror = function(error)
          {
            console.log("Print Failed to connect CN print at ",error);
          
          
          }

          // 监听Socket的关闭
        socket.onclose = function(event)
        { 
          alert("打印结束")
          console.log('Client notified socket has closed',event);
        
        }; 
        
        //接收到消息回应
        socket.onmessage = function(event)
        {
            //发送打印请求
        socket.send(JSON.stringify(print_request));
        //关闭链接
        socket.close()
        };

  }
  componentDidMount () {
    this.isLivinig = true
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
    
  }

  render () {

    const { editorState, outputHTML } = this.state
// 通过ref属性来将编辑器实例赋值给this.editorInstance
    return (
     
   
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
            ref={instance => this.editorInstance = instance}
            style={{ width: this.props.width, height: this.props.height}}
          />
       
       
        
    )

  }

  

}