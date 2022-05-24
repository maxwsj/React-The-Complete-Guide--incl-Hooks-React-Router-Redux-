const redux = require('redux');

// We need to set a default value for our state. /* state = { counter: 0 } */
function counterReducer(state = { counter: 0 }, action) {
   // if the store.dispatch type is iqual to increment then it will return the code
   if (action.type === 'increment') {
      return {
         counter: state.counter + 1,
      };
   }
   if (action.type === 'decrement') {
      return {
         counter: state.counter - 1,
      };
   }
   return state;
}

const store = redux.createStore(counterReducer);

function counterSubscriber() {
   // Is a method which is available on the store created with create store.
   const latestState = store.getState(); // Will give us the latest state snapshot after it was updated.
   console.log(latestState);
}

/* CREATING THE SUBSCRIBE */

// the subscribe method wants such a subscriber function (a function which Redux will then execute for us whenever the data and the store changed)
store.subscribe(counterSubscriber);

/* DISPATCHING AN ACTION */

// disptach is a method which dispatches an action
store.dispatch({
   type: 'increment', // should be a unique string, so every action, every distinct action which you dispatch leads to different things being done in the reducer.
});
store.dispatch({
   type: 'decrement',
});
