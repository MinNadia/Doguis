import { createStore, applyMiddleware, compose } from 'redux';
//import { composeWithDevtools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../Reducer/reducer';


export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));