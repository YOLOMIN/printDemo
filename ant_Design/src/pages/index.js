import styles from './index.css';
import LayoutBasic from './LayoutBasic';
import { webSocket } from "antd";
export default function() {
  

//打印机列表
var print_list=new Array();
//默认打印机
var defaultPrinter='';


  var socket = new WebSocket('ws://localhost:13528')
  var print_obj="";
  var obj
  

  //获取打印机列表的协议
  var request  = {
    requestID : '12345678901234567890',
    version : '1.0',
    cmd : 'getPrinters'
  };

 
  socket.onopen = function(event)
  {
  
    console.log("已经建立链接")
    socket.send(JSON.stringify(request));
     
    };


    socket.onmessage = function(event)
  {
      console.log('Client received a message',event);
      //获取监听到的数据  
      //console.log(event.data);
      //由JSON字符串转换为JSON对象
       print_obj=JSON.parse(event.data)
      //console.log(JSON.parse(event.data))
      // 使用eval解析
       obj = eval(print_obj.printers)
      //获取打印机列表
       // 使用eval解析
        obj = eval(print_obj.printers)
       //获取打印机列表
       for(var i=0;i<print_obj.printers.length;i++){
         print_list[i]=obj[i].name
       //  console.log(obj[i].name)
       }
      
     
     // console.log(defaultPrinter)
      //将默认打印机的名称赋值给选择框的默认值
      
  };

  socket.onerror = function(error)
	{
		console.log("Failed to connect CN print at ",error);
	
	}

  // 监听Socket的关闭
	socket.onclose = function(event)
	{ 
		console.log('Client notified socket has closed',event);
	
	}; 
    // console.log("constructor：",this)
    

  return (
    <div className={styles.normal}>
     
      <LayoutBasic value={print_list}/>
      
    </div>
  );
}
