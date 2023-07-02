const redux = require('redux')
const reduxLogger = require('redux-logger')

const BUY_CAKE = 'BUY_CAKE'
const BUT_ICECREAME = 'BUY_ICECREAME'

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMidlleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

//Action Creator
const buyCake = () => {
  return {
    //Action
    type: BUY_CAKE,
    info: 'First redux Action',
  }
}

const buyIceCreame = () => {
  return {
    //Action
    type: BUT_ICECREAME,
    info: 'Second redux Action',
  }
}

//Reducer Function

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreame: 20,
// }

const initialCakeState = {
  numOfCakes: 10,
}

const initialIceCreameState = {
  numOfIceCreame: 20,
}
/** one Reducer for both states is abit missy when worked with diffrent stats */
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes - 1,
//       }
//     case BUT_ICECREAME:
//       return {
//         ...state,
//         numOfIceCreame: state.numOfIceCreame - 1,
//       }

//     default:
//       return state
//   }
// }

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      }

    default:
      return state
  }
}

const iceReducer = (state = initialIceCreameState, action) => {
  switch (action.type) {
    case BUT_ICECREAME:
      return {
        ...state,
        numOfIceCreame: state.numOfIceCreame - 1,
      }

    default:
      return state
  }
}

//A method to combine more than one reducer and using them in the store
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCreame: iceReducer,
})

const store = createStore(rootReducer, applyMidlleware(logger))
console.log('initialState :', store.getState())

const unsubscribe = store.subscribe(() => {})

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCreame())
store.dispatch(buyIceCreame())

unsubscribe()
