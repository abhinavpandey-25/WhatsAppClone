import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MoreVert from '@material-ui/icons/MoreVert';
import React, { useEffect, useState } from 'react'
import './Chat.css'
import db from './firebase';
import {useParams} from 'react-router-dom'
import { useStateValue } from './StateProvider';
import firebase from 'firebase'
function Chat() {
    const [messages,setmessage]=useState([]);
    const [roomName,setroomName]=useState([]);
    const [pic,setpic]=useState("");
    const Id=useParams().roomid;
    const [roomId,setroomId]=useState(Id);
    const [input,setinput]=useState("");
    const[{user},dispatch]=useStateValue();
    useEffect(()=>{
        db.collection("rooms").doc(roomId).onSnapshot(snapshot=>setroomName(snapshot.data().name))
        db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot=>setmessage(snapshot.docs.map(doc=>doc.data()))) 
    },[roomId])
    console.log(roomId)
    useEffect(()=>{
        setpic(Math.floor(Math.random()*2000));
    },[roomId])
    const sendMessage=(e)=>{
        e.preventDefault();
        console.log("you typed",input)
        db.collection("rooms").doc(roomId).collection("messages").add({
            name:user.displayName,
            message:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()  
        }
        )
        setinput("");
        
         
    }
    return (
        <div className="chat"> 
            <div className="chat_header">
                <IconButton>
            <Avatar src={`https://avatars.dicebear.com/api/human/+${pic}+.svg`}/>
            </IconButton>
                <div className="chat_headerInfo">
                    <h3 style={{fontWeight:'500'}}>{roomName}</h3>
                    <p style={{color:'grey'}}>last seen{" "} {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                    </div>
                    <div className="chat_headerRight">
                        <IconButton>
                            <SearchOutlined/>
                        </IconButton>
                        <IconButton>
                            <MoreVert/>
                        </IconButton>
                        </div> 
            </div>
            <div className="chat_body">
              {messages.map(message=>(
                    <p className={`${message.name===user.displayName?"chat_receiver ":"chat_message"}`}><span className="chatname">{message.name}</span>{message.message}
                    <span className="timestamp">{new Date(message.timestamp?.toDate()).toUTCString()  }</span>
                    </p>
                   
                   )
                   )}  
                   </div>
            <div className="chat_footer">
               <div className="chat_footerLeft">
               <IconButton>
<EmojiEmotionsOutlinedIcon/>
                </IconButton>
                <IconButton>
                 <AttachFileOutlinedIcon/>   
                </IconButton>
               </div>
               <form style={{display:"flex",flex:1,padding:'5px'}}>
                    <input onChange={(e)=>setinput(e.target.value)} placeholder="Type a message " type="text" style={{flex:1,
                        border:"none"
                        ,borderRadius:'30px',padding:'8px'}}/>
                    <button onClick={sendMessage} type="submit" >Send</button>
                </form>
                <IconButton>

                <MicOutlinedIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
 