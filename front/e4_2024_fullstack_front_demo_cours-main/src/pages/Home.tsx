import { Link, Outlet } from "react-router-dom";
import "./Home.css";
import Button from '@mui/material/Button';

export function Home() {
  return (
    <>
      <h1>Home</h1>
        <Button variant="contained">Hello world</Button>

      <div className="container">
        <aside>
          <nav>
            <ul>
            <li>
                <Link to="/materialui">materialui</Link>
              </li>
              <li>
                <Link to="/counters">Counters</Link>
              </li>
              <li>
                <Link to="/trips">Trips</Link>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
              <li>
                <Link to="/demo">Demo Form</Link>
              </li>
              <li>
                <Link to="/back">demo users from back</Link>
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
