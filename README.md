# Redux-toolkit

In this repository we will learn how to implement redux-toolkit library

## Documentation

- How to implement feature
- How to configure store
- How to dispatch action
- How to use redux-logger
- How to use redux-thunk for async operation

## How to implement feature

```javascript
// first create a folder named feature where you will create separate folder for separate features
// Here I am creating features for cake so the file name will be cakeSlice.js this is the naming convention for redux toolkit.

/**
 * First import createSlice from reduxtoolkit
 *
 */
const createSlice = require('@reduxjs/toolkit').createSlice;

/**
 * after that create initial state
 */
const initialState = {
  numOfCakes: 10,
};

/**
 * Then create cakeSlice from createSlice which is a function which takes an argument as an object
 * Pass there a name which will be 'cake'
 * pass initial state
 * and reducers which also a object and in that object create action function
 *
 */

const cakeSlice = createSlice({
  name: 'cake',
  initialState: initialState,
  reducers: {
    order: (state) => {
      state.numOfCakes--;
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload;
    },
  },
});

/**
 * At the end export reducers and action function
 */
```

## How to configure store

```javascript
/**
 * first open a folder named app
 * then create a file name store.js
 * Then import configureStore from redux-toolkit
 *
 */

const configureStore = require('@reduxjs/toolkit').configureStore;

/**
 * Then import reducer from your features file
 *
 */

const cakeReducer = require('../features/cake/cakeSlice');

/**
 * After that create store and pass reducer on that store
 */

const store = configureStore({
  reducer: {
    cake: cakeReducer,
  },
});

/**
 * Finally export store
 */

module.exports = store;
```

## How to dispatch action

```javascript
/**
 * Now come to the index.js file
 * import store
 * import action from feature file
 */

const store = require('./app/store');
const cakeActions = require('./features/cake/cakeSlice').cakeActions;

// console for see initial state value
console.log('Initial state', store.getState());

//  This will work to see the result after update state
const unsubscribe = store.subscribe(() => {
  console.log('Updated State', store.getState());
});

// Dispatching action
store.dispatch(cakeActions.order());
store.dispatch(cakeActions.order());
store.dispatch(cakeActions.order());
store.dispatch(cakeActions.restocked(3));

unsubscribe();
```

## How to use redux-logger

```javascript
// first install and  import redux-logger app/store.js

/**
 * after installation import redux-logger
 *
 */

const reduxLogger = require('redux-logger');

/**
 * after that create  logger
 */

const logger = reduxLogger.createLogger();

/**
 * after that pass it into store as property middleware: () => and this property takes an arrow function with parameter getDefaultState.
 */

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
  },
  // follow this line of code blocks
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
```

## How to use redux-thunk for async operation

```javascript
/**
 * 1. Open new folder in features folder named user
 * 2. open new file name userSlice.js in user folder
 * 3. then import createSlice, and createAsyncThunk from redux-toolkit and axios from axios
 *
 */
const createSlice = require('@reduxjs/toolkit').createSlice;
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;
const axios = require('axios');

// define initial state
const initialState = {
  loading: false,
  users: [],
  error: '',
};

// create function for fetch user
//  generated pending , fulfilled and rejected action types
const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.data.map((user) => user.id));
});

// create userSlice 

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
                
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message 

        })
    }
})


/**
 * exports userSlice.reducer 
 * exports fetchUser function 
 */

module.exports = userSlice.reducer
module.exports.fetchUsers = fetchUsers

//-----------------------------------------------------------

/**
 * Now in store.js import userReducer and pass it into configure store 
 */
const userReducer = require('../features/user/userSlice')

const store = configureStore({
  reducer: {
   
    // user reducer 
    user: userReducer
  },

});

module.exports = store;

// -------------------------------


/**
 * Now in the index.js 
 *  import fetchUser function 
 * and dispatch it
 */

const fetchUsers = require('./features/user/userSlice').fetchUsers


console.log('Initial state', store.getState());

//  This will work to see the result after update state 
const unsubscribe = store.subscribe(() => {
  console.log('Updated State', store.getState());
});


store.dispatch(fetchUsers())
```
