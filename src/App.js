import SideBar from './Sidebar'
import './App.css';
import Chat from './Chat'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { useState } from 'react';
import Login from './Login'
import {useStateValue} from './StateProvider'
function App() {
  const [{user},dispatch]=useStateValue();
  return (
    <div className="app">
     {!user?<div>
       <Login/>
       </div>
     :<div className="app_body">
     <Router>
      <SideBar/>
       <Switch>
          <Route path="/rooms/:roomid">
             <Chat/>        
            </Route>  
       </Switch>
     </Router>
    </div>}
     </div>
  )
}

export default App;
