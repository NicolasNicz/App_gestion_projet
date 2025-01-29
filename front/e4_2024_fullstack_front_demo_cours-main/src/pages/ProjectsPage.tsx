import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    Typography, Card, CardContent, Button, TextField, Dialog, DialogActions, 
    DialogContent, DialogTitle 
} from "@mui/material";

export function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        try {
            const response = await fetch('http://localhost:3000/projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error("Erreur lors du chargement des projets:", error);
        }
    }

    async function onSubmit(data: any) {
        try {

            console.log('avant transformation:', data);

            const participantsArray = data.participants ? data.participants.split(',').map((id: string) => id.trim()).join(',') : '';
            const storiesArray = data.stories ? data.stories.split(',').map((id: string) => id.trim()).join(',') : '';


            const datav2 = {
                ...data,
                participants: participantsArray, 
                stories: storiesArray,
            };

            console.log('après transformation:', datav2);

            const response = await fetch('http://localhost:3000/projects', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datav2),
            });

            if (response.ok) {
                fetchProjects();
                setOpen(false);
                reset();
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du projet:", error);
        }
    }

    return (
        <Card sx={{ maxWidth: "80%", margin: "auto", mt: 4, p: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                    Liste des Projets
                </Typography>

                <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
                    Ajouter un Projet
                </Button>

                {/* tableau avec les projets */}
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
                                    <TableCell>
                                        {project.sprints?.length > 0
                                            ? project.sprints.map((s: any) => `Sprint ${s.id}: ${new Date(s.startDate).toLocaleDateString()} → ${new Date(s.endDate).toLocaleDateString()}`).join("\n")
                                            : "Aucun"}
                                    </TableCell>
                                    <TableCell>
                                        {project.stories?.length > 0 ? project.stories.join(", ") : "Aucune"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>

            {/* dialog pour ajouter un projet */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Ajouter un Projet</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Nom"
                        fullWidth
                        margin="dense"
                        {...register("name", { required: true })}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="dense"
                        {...register("description")}
                    />
                    <TextField
                        label="Scrum Master"
                        fullWidth
                        margin="dense"
                        {...register("scrumMaster")}
                    />
                    <TextField
                        label="Product Owner"
                        fullWidth
                        margin="dense"
                        {...register("productOwner")}
                    />
                    <TextField
                        label="Leader"
                        fullWidth
                        margin="dense"
                        {...register("leader")}
                    />
                    
                    {/* participants */}
                    <TextField
                        label="Participants (séparés par des virgules)"
                        fullWidth
                        margin="dense"
                        {...register("participants")}
                    />
                    
                    {/* sprints */}
                    <TextField
                        label="Sprint 1 - Date de début"
                        fullWidth
                        margin="dense"
                        {...register("sprints[0].startDate")}
                        type="datetime-local"
                    />
                    <TextField
                        label="Sprint 1 - Date de fin"
                        fullWidth
                        margin="dense"
                        {...register("sprints[0].endDate")}
                        type="datetime-local"
                    />
                    
                    <TextField
                        label="Sprint 2 - Date de début"
                        fullWidth
                        margin="dense"
                        {...register("sprints[1].startDate")}
                        type="datetime-local"
                    />
                    <TextField
                        label="Sprint 2 - Date de fin"
                        fullWidth
                        margin="dense"
                        {...register("sprints[1].endDate")}
                        type="datetime-local"
                    />
                    
                    {/* stories */}
                    <TextField
                        label="Stories (ID séparés par des virgules)"
                        fullWidth
                        margin="dense"
                        {...register("stories")}
                    />

                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="secondary">
                        Annuler
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                        Ajouter
                        </Button>
                    </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    );
}