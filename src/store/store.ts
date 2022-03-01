import { configureStore } from '@reduxjs/toolkit';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import  authReducer  from './reducers/auth.reducer';
import itemsReducer from './reducers/items.reducer';


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
  auth : authReducer
});


export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer
  },
  devTools: true,
  middleware: [thunk] 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// export const store = createStore(
//     reducers,
//     composeEnhancers(
//         applyMiddleware( thunk )
//     )
// );