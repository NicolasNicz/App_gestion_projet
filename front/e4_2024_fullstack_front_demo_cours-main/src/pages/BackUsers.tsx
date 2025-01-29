import { useEffect, useState } from "react";

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
        <>
            <h1>BackUsers:</h1>
            <ul>
                {users.map((user: any) => (
                    <li key={user.id}>
                        {user.name} {user.email}
                    </li>
                ))}
            </ul>
        </>
    );
}