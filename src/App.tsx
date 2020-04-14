import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Conversation from './components/Conversation';
import UserLoginBox from './components/UserLoginBox';
import Register from './components/Register';
import Thanks from './components/Thanks';
import "./css/MainStyle.css";

const App = () => {
    return (
		<HashRouter>
				<Route exact path='/' component={UserLoginBox} />
				<Route path='/register' component={Register} />
				<Route path='/talk' component={Conversation} />
				<Route path='/thankyou' component={Thanks} />
		</HashRouter>
    );
};

export default App;
