import {configureStore} from '@reduxjs/toolkit'
import combineReducers from './rootReducer_GoogleKeep'

const store = configureStore({
    reducer: combineReducers
});

export default store;