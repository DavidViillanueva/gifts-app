import { configureStore } from '@reduxjs/toolkit';
import { compose } from 'redux';
import thunk from 'redux-thunk';
import  authReducer  from './reducers/auth.reducer';
import itemsReducer from './reducers/items.reducer';
import uiReducer from './reducers/ui.reducer';


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }


export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    ui: uiReducer
  },
  devTools: true,
  middleware: [thunk] 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
