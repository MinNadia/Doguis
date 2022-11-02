import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from '../Reducer/reducer';
import  { composeWithDevTools } from "redux-devtools-extension" 

// export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));  
 
