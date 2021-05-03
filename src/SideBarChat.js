import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './SideBarChat.css'
import {Link} from 'react-router-dom'
import db from './firebase'
function SideBarChat(props) {
    const addNewChat=props.addNewChat;
    const id=props.id;
    const [messages,setmessages]=useState([]);
    console.log("addnewchat",addNewChat);
    //addnewchat is boolean else if not passed as props then it si undefined
    const [profilepic,setprofilepic]=useState("");
    useEffect(()=>{
        setprofilepic(Math.floor(Math.random()*4000));
    },[])
    useEffect(()=>{
        if(id){
            db.collection("rooms").doc(id).collection("messages").orderBy('timestamp','desc').onSnapshot(snapshot=>setmessages(snapshot.docs.map(doc=>doc.data())))
        }
    },[id])
    const createChat=()=>{
        const newRoom=prompt("Please enter the name for the room");
        //we cannot set state when the component is unmounted that will give error
        //for setting state we need to be sure that component should be mounted
        if(newRoom){
            db.collection("rooms").add({
                name:newRoom
            })
        }
    }
    return !addNewChat ?(
        <Link to={`/rooms/${props.id}`}>
        <div className="sideBarChat">
          <Avatar src={`https://avatars.dicebear.com/api/human/+${profilepic}+.svg`}/>
          <div className="sideBarChatInfo" style={{fontSize:'14px',marginLeft:'20px'}}>
                <h1  style={{fontSize:"18px"}}>{props.roomname}</h1>
                <p>{messages[0]?.message}</p>
          </div>
        </div>
        </Link>
            ):(
        <div onClick={createChat} className="sideBarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SideBarChat
