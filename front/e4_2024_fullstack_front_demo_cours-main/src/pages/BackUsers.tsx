import { useEffect, useState } from "react";
import { Typography, Card, CardContent } from "@mui/material";

export function BackUsers() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchUsers() {
            const data = await fetch('http://localhost:3000/users')
            .then(res => res.json())
            setUsers(data)
        }
        fetchUsers()
    }, [])



    return (
<Card sx={{ maxWidth: "80%", margin: "auto", mt: 4, p: 2, boxShadow: 3 }}>
<CardContent>
    <Typography variant="h4" align="center" gutterBottom>
        Utilisateurs
    </Typography>
    <ul>
        {users.map((user: any) => (
            <li key={user.id}>
                {user.name} {user.email}
            </li>
        ))}
    </ul>
</CardContent>
</Card>
    );
}