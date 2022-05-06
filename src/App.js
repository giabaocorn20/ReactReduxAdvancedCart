import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import {sendCartData, fetchCartData} from './store/cart-http-actions'

let isInitial = true;

function App() {

  const dispatch = useDispatch()
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)

  useEffect(() =>  {
    dispatch(fetchCartData)
  }, [dispatch])
  useEffect(() => {
    // const sendCartData= async () => {
    //   dispatch(uiActions.showNotification({
    //     status: 'pending', 
    //     title: 'Sending...',
    //     message: 'Sending cart data!'
    //   }))
    //   const response = await fetch('https://react-http-bad39-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
    //     method: 'PUT',
    //     body: JSON.stringify(cart)
    //   })

    //   if (!response.ok) {
    //     throw new Error('Sending cart data failed')
    //   }

    //   dispatch(uiActions.showNotification({
    //     status: 'success', 
    //     title: 'Success',
    //     message: 'Sent cart data sucessfully'
    //   }))

    //   const responseData = await response.json()
    // }
    
    // if(isInitial) { // prevent the first http submission  
    //   isInitial = false
    //   return 
    // }

    // sendCartData().catch(err => {
    //   dispatch(uiActions.showNotification({
    //     status: 'error', 
    //     title: 'Error',
    //     message: err.message
    //   }))
    // })
    
    //move all the code above to cart-slice sendCartData function
    
    if(isInitial) { // prevent the first http submission  
      isInitial = false
      return 
    }

    if(cart.changed) {
      dispatch(sendCartData(cart))
    }
    

  }, [cart, dispatch])

  return (
    <Fragment>
    {notification &&  <Notification status =  {notification.status} title = {notification.title} message = {notification.message}/>}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
