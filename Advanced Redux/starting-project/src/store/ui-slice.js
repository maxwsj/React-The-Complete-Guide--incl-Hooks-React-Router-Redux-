const { createSlice } = require('@reduxjs/toolkit');

const uiSlice = createSlice({
   name: 'ui',
   initialState: { cartIsVisible: false, notification: null },
   // reducers is a map of all the reducers (it's a map of methods that represent all the different cases, actions we wanna handle with that reducer).
   reducers: {
      toggle(state) {
         state.cartIsVisible = !state.cartIsVisible;
      },
      showNotification(state, action) {
         state.notification = {
            status: action.payload.status,
            title: action.payload.title,
            message: action.payload.message,
         };
      },
   },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
