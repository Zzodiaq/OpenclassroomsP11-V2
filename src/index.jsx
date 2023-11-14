import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store.js'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from "./pages/Home/index.jsx";
import User from './pages/User/user.jsx';
import Signin from './pages/Signin/signIn.jsx';
// import Error from './pages/Error/error.jsx';
import Nav from './components/Nav/nav.jsx';
import Footer from './components/Footer/footer.jsx';
// const root = ReactDOM.createRoot(document.getElementById('root'));

// const HeaderWraper = ({child}) => (
//   <>
//   <nav/>
//   {child}

//   </>
//   )

const ProtectedRoute = ({ children }) => {
  const isConnected = useSelector((state) => state.connected);

  if (!isConnected) {
    return <Navigate to="/SignIn" />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/user",
    element: (
      <>
        <Nav />
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
        <Footer />
      </>
    ),
  },
  {
    path: "/SignIn",
    element: (
      <>
        <Nav />
        <Signin />
        <Footer />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

reportWebVitals();
