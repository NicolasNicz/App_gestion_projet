import { Link, Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

export function Home() {
  return (
    <>
      {/* barre de nav */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Gestion de Projet
          </Typography>
          <Button color="inherit" component={Link} to="/back">Users</Button>
          <Button color="inherit" component={Link} to="/projets">Projets</Button>
        </Toolbar>
      </AppBar>

      {/* contenu */}
      <Container sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}
