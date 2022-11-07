// import React, { Component, Fragment } from 'react'
import React, { useState, useEffect, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
// import io from 'socket.io-client'
// import Messages from './Messages'
// import MessageInput from './MessageInput'

import './App.css';


// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import GameShow from './components/games/GameShow'
import GameSearch from './components/games/GameSearchResults'
// import Search from './components/Search'
import MyProfile from './components/profiles/MyProfile'
import Profile from './components/profiles/Profile';

const backgroundCSS = {
	backgroundColor: 'rgb(212, 212, 212)'
}


const App = () => {


  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
//   const [renderSearch, setRenderSearch] = useState(false)

//   useEffect(() => {
//     const newSocket = io(`http://${window.location.hostname}:3000/chat`);
//     setSocket(newSocket);
//     return () => newSocket.close();
//   }, [setSocket]);

//   useEffect(() => {
//     const newSocket = io(`http://${window.location.hostname}:3000/chat`);
//     setSocket(newSocket);
//     return () => newSocket.close();
//   }, [setSocket]);

 

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<div style={backgroundCSS}>
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
          <Route
            path='/sign-out'
            element={
              <RequireAuth user={user}>
                <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
              </RequireAuth>
            }
          />
          <Route
            path='/change-password'
            element={
              <RequireAuth user={user}>
                <ChangePassword msgAlert={msgAlert} user={user} />
              </RequireAuth>}
          />
		<Route
            path='/games/:apiId'
            element={
                <GameShow msgAlert={msgAlert} user={user} setUser={setUser} />
              }
        />
		<Route
            path='/games/search/:name'
            element={
                <GameSearch msgAlert={msgAlert} user={user} />
              }
        />
        <Route
            path='/my-profile'
            element={
                <MyProfile msgAlert={msgAlert} user={user}  setUser={setUser}/>
              }
        />
        <Route
            path='/profile/:otherUsername'
            element={
                <Profile msgAlert={msgAlert} user={user}/>
            }
        />
				</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
				{/* <div className="App">
      				<header className="app-header">
        			 React Chat
      				</header>
      				{ socket ? (
        			<div className="chat-container">
         				<Messages socket={socket} />
          				<MessageInput socket={socket} />
        			</div>
      			) : (
        			<div>Not Connected</div>
      				)}
    			</div> */}
				
			</Fragment>	
			</div>
		);
}

export default App