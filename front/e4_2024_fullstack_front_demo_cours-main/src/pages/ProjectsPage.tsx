import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Card, CardContent } from "@mui/material";

export function ProjectsPage() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('http://localhost:3000/projects');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        }
        fetchProjects();
    }, []);

    return (
        <Card sx={{ maxWidth: "80%", margin: "auto", mt: 4, p: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                    Liste des Projets
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Nom</b></TableCell>
                                <TableCell><b>Description</b></TableCell>
                                <TableCell><b>Scrum Master</b></TableCell>
                                <TableCell><b>Product Owner</b></TableCell>
                                <TableCell><b>Participants</b></TableCell>
                                <TableCell><b>Nombre de Sprints</b></TableCell>
                                <TableCell><b>Stories</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map((project: any) => (
                                <TableRow key={project._id}>
                                    <TableCell>{project.name || "N/A"}</TableCell>
                                    <TableCell>{project.description || "Pas de description"}</TableCell>
                                    <TableCell>{project.scrumMaster || "Aucun"}</TableCell>
                                    <TableCell>{project.productOwner || "Aucun"}</TableCell>
                                    <TableCell>
                                        {project.participants?.length > 0 ? project.participants.join(", ") : "Aucun"}
                                    </TableCell>
                                    <TableCell>{project.sprints?.length || 0}</TableCell>
                                    <TableCell>
                                        {project.stories?.length > 0 ? project.stories.join(", ") : "Aucune"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}