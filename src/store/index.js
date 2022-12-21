import { configureStore } from '@reduxjs/toolkit';

import albumReducer from './navigation';

const store = configureStore({
    reducer: { counter: albumReducer},
});



export default store;