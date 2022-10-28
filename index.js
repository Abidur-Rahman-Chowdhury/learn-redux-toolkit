/**
 * import store 
 * import action from feature file 
  */
const store = require('./app/store');
const cakeActions = require('./features/cake/cakeSlice').cakeActions;
const icecreamActions = require('./features/icecream/icecreamSlice').icecreamActions
const fetchUsers = require('./features/user/userSlice').fetchUsers
console.log('Initial state', store.getState());

//  This will work to see the result after update state 
const unsubscribe = store.subscribe(() => {
  console.log('Updated State', store.getState());
});


store.dispatch(fetchUsers())

// Dispatching action 
// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.restocked(3));


// store.dispatch(icecreamActions.ordered());
// store.dispatch(icecreamActions.ordered());
// store.dispatch(icecreamActions.ordered());
// store.dispatch(icecreamActions.restocked(3));

// unsubscribe();
