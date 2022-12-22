import { configureStore } from '@reduxjs/toolkit';

import productReducer from './navigation';

const store = configureStore({
    reducer: { counter: productReducer},
});



export default store;