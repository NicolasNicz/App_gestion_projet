import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { BackUsers } from "./pages/BackUsers";
import { ProjectsPage } from "./pages/ProjectsPage";

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
