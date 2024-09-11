import './App.css'
import './Responsive.css'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Signup from './components/credentials/Signup'
import Header from './components/universal/Header';
import NotFound from './components/errors/NotFound';
import Login from './components/credentials/Login';
import Signout from './components/credentials/Signout';
import NotAuth from './components/errors/NotAuth';
import Error from './components/errors/Error';
import Home from './components/main/home/Home';
import AuthRoute from './components/universal/AuthRoute';
import Footer from './components/universal/Footer';
import Main from './components/universal/Main';
import About from './components/main/About';
import Filter from './components/main/home/filter/Filter';
import Results from './components/main/home/results/Results';
import Details from './components/main/home/results/details/Details';
import Reviews from './components/main/home/results/details/reviews/Reviews';
import Cart from './components/main/home/cart/Cart';
import Settings from './components/main/settings/Settings';
import YourOrders from './components/main/settings/yourorders/YourOrders';
import OrderDetails from './components/main/settings/yourorders/OrderDetails';
import Security from './components/main/settings/security/Security';
import ChangePwd from './components/main/settings/security/ChangePwd';
import ChangeUser from './components/main/settings/security/ChangeUser';
import Payment from './components/main/settings/payment/Payment';
import AddOption from './components/main/settings/payment/AddOption';
import Shipping from './components/main/settings/shipping/Shipping';
import AddAddress from './components/main/settings/shipping/AddAddress';
import Checkout from './components/main/home/checkout/Checkout';
import Confirmation from './components/main/home/checkout/Confirmation';
import Profile from './components/main/settings/profile/Profile';
import FooterBtn from './components/universal/FooterBtn';
import ReviewAdd from './components/main/home/results/details/reviews/ReviewAdd';
import Oauth_Route from './components/credentials/Ouath_Route';

function App() {
  return (
    <div className='d-flex flex-column vh-100'>
      <Routes>
        <Route path='/'  element={<><Header/><Main /><FooterBtn/></>}>
          {/* Credential Routes */}
          <Route index  element={<Navigate to={"/Login"}/>}/> {/* Auto Navigates to Login page/route - change to desired page/route as needed*/}
          <Route path='/Signup' element={<Signup />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/Signout' element={<Signout />}/>
          <Route path='Footer' element={<Footer />} />

          {/* All Authorized User Content/Routes Go  here */}
          <Route element={<AuthRoute />}>
          {/* Add Routes here.... */}
            <Route path='/Home/:sid' element={<Oauth_Route />} />

            <Route path='/Home' element={<Home />}>
              <Route path='Footer' element={<Footer />} />
              <Route index element={<Results />} />
              <Route path='Filters' element={<Filter />} />
              <Route path='Product' element={<Details />} />
              <Route path='Cart'>
                <Route index element={<Cart />} />
              </Route>
              <Route path='Checkout'>
                <Route index element={<Checkout />} />
                <Route path='Confirmation/:orderid' element={<Confirmation />} />
              </Route>
              <Route path='Settings'>
                <Route index element={<div className='settings'><Settings /></div>} />
                <Route path='Orders' element={<div className='settings'><Outlet /></div>}>
                  <Route index element={<YourOrders />}/>
                  <Route path='Details/:orderid' element={<OrderDetails />} />
                </Route>
                <Route path='Security' element={<div className='settings'><Outlet /></div>}>
                  <Route index element={<Security />}/>
                  <Route path='Password' element={<ChangePwd />}/>
                  <Route path='Username' element={<ChangeUser />}/>
                </Route>
                <Route path='Payments' element={<div className='settings'><Outlet /></div>}>
                  <Route index element={<Payment />} />
                  <Route path='Add' element={<AddOption />} />
                </Route>
                <Route path='Shipping' element={<div className='settings'><Outlet /></div>}>
                  <Route index element={<Shipping/>}/>
                  <Route path='Add' element={<AddAddress />}/>
                </Route>
                <Route path='Profile' element={<div className='settings'><Outlet /></div>}>
                  <Route index element={<Profile />} />
                </Route>
              </Route>
              <Route path='Product/Reviews' >
                <Route index element={<Reviews />} />
                <Route path='Add' element={<ReviewAdd />} />
              </Route>
            </Route>
            <Route path='/About' element={<About />}/>
          </Route>

          {/* Error Routes */}
          <Route path='*' element={<NotFound />}/>
          <Route path='/NotAuth' element={<NotAuth />}/>
          <Route path='/Error' element={<Error />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
