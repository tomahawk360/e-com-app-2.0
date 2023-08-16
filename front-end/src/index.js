import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
	createBrowserRouter, 
	createRoutesFromElements,
	Route, 
	RouterProvider 
} from 'react-router-dom';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { HelmetProvider } from 'react-helmet-async';

import { Provider } from 'react-redux';
import store from './store';

import './assets/bootstrap.min.css'
import './assets/index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';

import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';

const router = createBrowserRouter(
    createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index={true} path='/' element={<HomeScreen />} />
			<Route index={true} path='/search/:keyword' element={<HomeScreen />} />
			<Route index={true} path='/page/:pageNumber' element={<HomeScreen />} />
			<Route index={true} path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
			<Route index={true} path='/product/:id' element={<ProductScreen />} />
			<Route index={true} path='/cart' element={<CartScreen />} />
			<Route index={true} path='/login' element={<LoginScreen />} />
			<Route index={true} path='/register' element={<RegisterScreen />} />

			<Route path='' element={<PrivateRoute />}>
				<Route index={true} path='/shipping' element={<ShippingScreen />} />
				<Route index={true} path='/payment' element={<PaymentScreen />} />
				<Route index={true} path='/placeorder' element={<PlaceOrderScreen />} />
				<Route index={true} path='/order/:id' element={<OrderScreen />} />
				<Route index={true} path='/profile' element={<ProfileScreen />} />
			</Route>

			<Route path='' element={<AdminRoute />}>
				<Route index={true} path='/admin/orderlist' element={<OrderListScreen />} />
				<Route index={true} path='/admin/productlist' element={<ProductListScreen />} />
				<Route index={true} path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
				<Route index={true} path='/admin/product/:id/edit' element={<ProductEditScreen />} />
				<Route index={true} path='/admin/userlist' element={<UserListScreen />} />
				<Route index={true} path='/admin/user/:id/edit' element={<UserEditScreen />} />
			</Route>
		</Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
		<HelmetProvider>
			<Provider store={store} >
				<PayPalScriptProvider deferLoading={true} >
					<RouterProvider router={router} />
				</PayPalScriptProvider>
			</Provider>
		</HelmetProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
