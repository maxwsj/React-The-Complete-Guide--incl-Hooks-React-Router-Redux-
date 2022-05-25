import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui-slice';

let isInitial = true;

function App() {
   // To useSelector we need to pass a function which receives the Redux state (automatically)
   const showCart = useSelector((state) => state.ui.cartIsVisible);
   const cart = useSelector((state) => state.cart);
   const notification = useSelector((state) => state.ui.notification);

   const dispatch = useDispatch();

   useEffect(() => {
      async function sendCartData() {
         dispatch(
            uiActions.showNotification({
               status: 'pending',
               title: 'Sending...',
               message: 'Sending cart data!',
            })
         );
         const response = await fetch(
            'https://react-lessons-8cbae-default-rtdb.firebaseio.com/cart.json',
            { method: 'PUT', body: JSON.stringify(cart) }
         );

         if (!response.ok) {
            throw new Error('Sending cart data failed.');
         }

         dispatch(
            uiActions.showNotification({
               status: 'success',
               title: 'Success!',
               message: 'Sent cart data successfully!!',
            })
         );
      }

      if (isInitial) {
         isInitial = false;
         return;
      }

      sendCartData().catch((error) => {
         dispatch(
            uiActions.showNotification({
               status: 'error',
               title: 'Error!',
               message: 'Sending cart data failed!!',
            })
         );
      });
   }, [cart, dispatch]);

   return (
      <>
         {notification && (
            <Notification
               status={notification.status}
               title={notification.title}
               message={notification.message}
            />
         )}
         <Layout>
            {showCart && <Cart />}
            <Products />
         </Layout>
      </>
   );
}

export default App;
