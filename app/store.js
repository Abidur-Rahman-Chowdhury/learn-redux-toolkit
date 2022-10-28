const configureStore = require('@reduxjs/toolkit').configureStore;
const cakeReducer = require('../features/cake/cakeSlice');
const userReducer = require('../features/user/userSlice')
// const reduxLogger = require('redux-logger');
const icecreamReducer = require('../features/icecream/icecreamSlice');
// const logger = reduxLogger.createLogger()
const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    // user reducer 
    user: userReducer
  },
//   middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(logger),
});

module.exports = store;
