# Redux-toolkit 

In this repository we will learn how to implement redux-toolkit library 


## Documentation

- How to implement feature 
- How to configure store 
- How to dispatch action 

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
    numOfCakes: 10
}

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
            state.numOfCakes--
        },
        restocked: (state, action) => {
            state.numOfCakes += action.payload
        }
    }
})

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
    }
})

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