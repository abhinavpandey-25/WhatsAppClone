import React, { useEffect, useState } from 'react'
import './SideBar.css'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SideBarChat from './SideBarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';
function Sidebar() {
    const [rooms,setrooms]=useState([]);
    const [{user},dispatch]=useStateValue()
    useEffect(()=>{
        const unsubscribe=db.collection('rooms').onSnapshot(snapshot=>setrooms(snapshot.docs.map(doc=>{
         return {
             id:doc.id,
             room:doc.data()
            }
         }   
        )))
        return()=>{
            unsubscribe();
        }
     },[])
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>
            <div className="sidebar_search">
                 <div className="sidebar_searchContainer">
                <IconButton>
                <SearchOutlinedIcon />
                </IconButton>
                <input style={{borderStyle:'none',marginLeft:"5px",width:'100%',height:'100%'}} placeholder="You can search items here" type="text" />
                     </div>   
            </div>
            <div className="sidebar_chats">
                <SideBarChat addNewChat/>
               {rooms.map(room=>
                <SideBarChat roomname={room.room.name} key={room.id} id={room.id}  />    
               )}
                       
            </div>
        </div>
    )
}

export default Sidebar
    