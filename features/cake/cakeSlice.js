// import createSlice from redux toolkit

const createSlice = require('@reduxjs/toolkit').createSlice


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
        ordered: (state) => {
            state.numOfCakes--
        },
        restocked: (state, action) => {
            state.numOfCakes += action.payload
        }
    }
})


module.exports = cakeSlice.reducer

module.exports.cakeActions = cakeSlice.actions