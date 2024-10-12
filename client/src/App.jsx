import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";
import HomePage from "./routes/HomePage/homepage"; 
import ListPage from './routes/listPage/listPage';
import { Layout, RequireAuth } from './routes/layout/layout';
import SinglePage from './routes/singlePage/SinglePage';
import Profile from './routes/Profile/Profile';
import Register from './routes/register/Register';
import Login from './routes/login/login';
import ProfileUpdatePage from "./routes/ProfileUpdatePage/ProfileUpdatePage";
import NewPostPage from "./routes/newPostpage/newPostpage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import AboutPage from "./routes/aboutPage/aboutpage";
import Contact from "./routes/Contact/contactpage";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",  
      element: <Layout/>,
      children:[
      {
        path:"/",
        element: <HomePage/>,
        loader:listPageLoader
      },
      {
        path:"/about",
        element:<AboutPage/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/list",
        element:<ListPage/>,
        loader:listPageLoader
      },
      {
        path:"/:id",
        element:<SinglePage/>,
        loader: singlePageLoader,
      },
      {
        path:"/register",
        element:<Register/>,
      },
      {
        path:"/login",
        element:<Login/>,
      },
      ]
    },
    {
      path:"/",
      element:<RequireAuth/>,
      children:[
        {
          path:"/profile",
          element:<Profile/>,
          loader:profilePageLoader,
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage/>,
        },
        {
          path:"/add",
          element:<NewPostPage/>,
        }
        
      ]
      
    }
  ]);


  return (
    <RouterProvider router = {router}/>
  )
}

export default App