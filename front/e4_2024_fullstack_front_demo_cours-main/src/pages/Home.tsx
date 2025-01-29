import { Link, Outlet } from "react-router-dom";
import "./Home.css";
import Button from '@mui/material/Button';

export function Home() {
  return (
    <>
      <h1>Gestion de projet</h1>
        {/* <Button variant="contained">Hello world</Button> */}

      <div className="container">
        <aside>
          <nav>
            <ul>
              <li>
                <Link to="/back">Users</Link>
              </li>
              <li>
                <Link to="/projets">projets</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="container">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
