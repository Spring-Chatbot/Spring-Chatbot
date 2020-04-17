import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Conversation from './components/Conversation';
import UserLoginBox from './components/UserLoginBox';
import Register from './components/Register';
import "./css/MainStyle.css";

const App = () => {
    return (
		<HashRouter>
				<Route exact path='/' component={UserLoginBox} />
				<Route path='/register' component={Register} />
				<Route path='/talk' component={Conversation} />
		</HashRouter>
    );
};

export default App;
