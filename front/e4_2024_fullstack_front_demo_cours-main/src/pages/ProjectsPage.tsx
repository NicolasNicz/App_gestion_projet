import { useEffect, useState } from "react";
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
    Divider,
    Box
} from "@mui/material";

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
        <Paper
            elevation={3}
            style={{ padding: "16px", maxWidth: "800px", margin: "auto", marginTop: "20px" }}
        >
            <Typography variant="h4" gutterBottom>
                Project List
            </Typography>
            <List>
                {projects.map((project: any) => (
                    <Box key={project._id} mb={2}>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                                        {project.name || "Unnamed Project"}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography variant="body2" color="textSecondary">
                                            {project.description || "No description provided."}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Leader:</strong> {project.leader || "Not assigned"}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Scrum Master:</strong> {project.scrumMaster || "Not assigned"}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Product Owner:</strong> {project.productOwner || "Not assigned"}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Participants:</strong>{" "}
                                            {project.participants && project.participants.length > 0
                                                ? project.participants.join(", ")
                                                : "No participants"}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Stories:</strong>{" "}
                                            {project.stories && project.stories.length > 0
                                                ? project.stories.join(", ")
                                                : "No stories"}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <strong>Sprints:</strong>
                                        </Typography>
                                        {project.sprints && project.sprints.length > 0 ? (
                                            <List style={{ marginLeft: "16px" }}>
                                                {project.sprints.map((sprint: any) => (
                                                    <ListItem key={sprint._id} disableGutters>
                                                        <ListItemText
                                                            primary={`Sprint ${sprint.id}`}
                                                            secondary={`Start: ${new Date(
                                                                sprint.startDate
                                                            ).toLocaleDateString()} | End: ${new Date(
                                                                sprint.endDate
                                                            ).toLocaleDateString()}`}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        ) : (
                                            <Typography variant="body2" color="textSecondary" style={{ marginLeft: "16px" }}>
                                                No sprints
                                            </Typography>
                                        )}
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider />
                    </Box>
                ))}
            </List>
        </Paper>
    );
}