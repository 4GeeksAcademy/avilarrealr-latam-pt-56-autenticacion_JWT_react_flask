import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Private() {
    const navigate = useNavigate();

    async function accessPrivate() {
        const token = localStorage.getItem("token");

        const url = `${import.meta.env.VARIABLE_NAME}/api/private`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (response.status === 200) {
            const data = await response.json();
        } else {
            alert("Invalid session. Please, login again.");
            localStorage.removeItem("token");
            navigate("/login");
        }
    }

    useEffect(() => {
        accessPrivate();
    }, []);

    return (
        <div>
            <h2>Private Page 🤫</h2>
            <p>If you see this, your token is valid and you access to the route /private.</p>
        </div>
    );
}