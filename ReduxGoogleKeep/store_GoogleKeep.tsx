import { configureStore } from '@reduxjs/toolkit'
import combineReducers from './rootReducer_GoogleKeep'

const store = configureStore({
    reducer: combineReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;