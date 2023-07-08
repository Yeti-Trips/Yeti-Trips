import React from "react";
import ReactDOM from "react-dom/client";
import App from './pages/App.jsx';
import store from './store';
import { Provider } from 'react-redux';

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Link,
} from "react-router-dom";



const router = createBrowserRouter([
  // {
  //   path: "/anotherPath",
  //   element: <anotherPage/>,
  // },
  {
    path: "/",
    element: <App/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store = {store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);