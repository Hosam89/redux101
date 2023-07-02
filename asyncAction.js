const redux = require('redux')
const createStore = redux.createStore
const applayMiddleware = redux.applyMiddleware
const thunk = require('redux-thunk').default
const axios = require('axios')

const initiailState = {
  loading: false,
  user: [],
  error: '',
}

// We always start with declaring the constant for the actions
const FETCH_USRES_REQUEST = 'FETCH_USRES_REQUEST'
const FETCH_USRES_SUCCESS = 'FETCH_USRES_SUCCESS'
const FETCH_USRES_FAILURE = 'FETCH_USRES_FAILURE'

//Action creators

const fetchUsersReqest = () => {
  return {
    type: FETCH_USRES_REQUEST,
  }
}

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USRES_SUCCESS,
    payload: users,
  }
}

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USRES_FAILURE,
    payload: error,
  }
}

const reducer = (state = initiailState, action) => {
  switch (action.type) {
    case FETCH_USRES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_USRES_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: '',
      }

    case FETCH_USRES_FAILURE:
      return {
        loading: false,
        user: [],
        error: action.payload,
      }
    default:
      return state
  }
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersReqest())
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const users = response.data.map((user) => user.id)
        dispatch(fetchUsersSuccess(users))
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

const store = createStore(reducer, applayMiddleware(thunk))
store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(fetchUsers())
