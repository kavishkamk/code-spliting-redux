import { combineReducers, configureStore } from '@reduxjs/toolkit'
import reducersSlice, {add} from './components/features/reducersSlice'
// import { combineReducers, createStore } from "@reduxjs/toolkit";
// import counterReducer from "./components/features/counterSlice";
// import counterSlice from './components/features/counterSlice';

// export default configureStore({
//   reducer: {
//     counter: counterReducer
//   }
// })

const staticReducers = {reducerList: reducersSlice};


export const store = configureStore({reducer: staticReducers, middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),});

export const injectReducer = (reducerMap) => {

  const state = store.getState();
  const previousReducers = state.reducerList.reducerList;
  console.log(previousReducers);

  const trackedReducersList = {
    ...previousReducers,
    ...reducerMap
  };

  const rootReducer = combineReducers({...staticReducers, ...trackedReducersList})

  store.replaceReducer(rootReducer);

  store.dispatch(add({trackerList: trackedReducersList}))
}

// export function createReducerManager(initialReducers) {
//   // Create an object which maps keys to reducers
//   const reducers = { ...initialReducers }

//   // Create the initial combinedReducer
//   let combinedReducer = combineReducers(reducers)

//   // An array which is used to delete state keys when reducers are removed
//   let keysToRemove = []

//   return {
//     getReducerMap: () => reducers,

//     // The root reducer function exposed by this object
//     // This will be passed to the store
//     reduce: (state, action) => {
//       // If any reducers have been removed, clean up their state first
//       if (keysToRemove.length > 0) {
//         state = { ...state }
//         for (let key of keysToRemove) {
//           delete state[key]
//         }
//         keysToRemove = []
//       }

//       // Delegate to the combined reducer
//       return combinedReducer(state, action)
//     },

//     // Adds a new reducer with the specified key
//     add: (key, reducer) => {
//       if (!key || reducers[key]) {
//         return
//       }

//       // Add the reducer to the reducer mapping
//       reducers[key] = reducer

//       // Generate a new combined reducer
//       combinedReducer = combineReducers(reducers)
//     },

//     // Removes a reducer with the specified key
//     remove: key => {
//       if (!key || !reducers[key]) {
//         return
//       }

//       // Remove it from the reducer mapping
//       delete reducers[key]

//       // Add the key to the list of keys to clean up
//       keysToRemove.push(key)

//       // Generate a new combined reducer
//       combinedReducer = combineReducers(reducers)
//     }
//   }
// }

// const staticReducers = {
//   counter: counterReducer,
// }

// export function configureStore(initialState) {
//   const reducerManager = createReducerManager(staticReducers)

//   // Create a store with the root reducer function being the one exposed by the manager.
//   const store = createStore(reducerManager.reduce, initialState)

//   // Optional: Put the reducer manager on the store so it is easily accessible
//   store.reducerManager = reducerManager

//   return store;
// }