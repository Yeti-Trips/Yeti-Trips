import React from "react";
import ReactDOM from "react-dom/client";
import App from './pages/App.jsx';
import store from './store.js';
import { Provider } from 'react-redux';

import AnotherPage from './pages/AnotherPage.jsx';
import CreateGroupVacationContainer from './containers/CreateGroupVacationContainer.jsx';

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Link,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/anotherPath",
    element: <AnotherPage/>
  },
  {
    path: "/liamtest",
    element: <CreateGroupVacationContainer/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store = {store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);