import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.css";
import { MaterialUi } from "./pages/MaterialUi";
import { Counters } from "./pages/Counters";
import { Trips } from "./pages/Trips";
import { Home } from "./pages/Home";
import { Contacts } from "./pages/Contacts";
import { BackUsers } from "./pages/BackUsers";
import { ProjectsPage } from "./pages/ProjectsPage";
import { createContact, getContacts } from "./contacts";
import UserPage from "./pages/UserPage";

// import { useScore } from './ScoreReducer'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement:(
        <div id="error-page">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <Link to="/">Go Home</Link>
      </div>
      ),
      children: [
        {
          path: "/materialui",
          element: <MaterialUi/>
        },
        {
          path: "/counters",
          element: <Counters/>
        },
        {
          path: "/trips",
          element: <Trips/>
        },
        {
          path: "/contacts",
          element: <Contacts/>,
          loader: async () => {
            const contacts = await getContacts();
            return { contacts };
          },
          action: async () => {
            const contact = await createContact();
            return { contact };
          }
        },
        {
          path: "/demo",
          element: <UserPage/>
        },
        {
          path: "/back",
          element: <BackUsers/>
        },
        {
          path: "/projets",
          element: <ProjectsPage/>
        }
      ]
    }
  ]);
  
  return (
      <RouterProvider router={router} >
        
      </RouterProvider>
  );
}

export default App;
