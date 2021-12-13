import { configureStore  } from '@reduxjs/toolkit';

import counterReducer from './counter'; // Reducer 를 내보냈기 때문에 바로 활용가능
import authReducer from './auth';

const store = configureStore({
    reducer : {counter : counterReducer, auth : authReducer},
});

export default store;