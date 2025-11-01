import React, { useState } from "react";

export function InputUsername({ onSubmitAction, label }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        if (email.trim() !== "" && password.trim() !== "") {
            onSubmitAction({ email, password });
            setEmail("");
            setPassword("");
        }
    }

    return (
        <>
            {/* --- Campo de Email --- */}
            <div
                className="d-flex justify-content-start align-items-center gap-3 px-3"
                style={{
                    borderRadius: "50px",
                    background: "white",
                    width: "320px"
                }}
            >
                <i className="fa-regular fa-envelope text-primary"></i>
                <input
                    type="email"
                    className="border-0 p-2"
                    placeholder="email"
                    style={{ outline: "none" }}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {/* --- Campo de Contraseña (Password) --- */}
            <div
                className="d-flex justify-content-start align-items-center gap-3 px-3 my-4"
                style={{
                    borderRadius: "50px",
                    background: "white",
                    width: "320px"
                }}
            >
                <i className="fa-solid fa-lock text-primary"></i>
                <input
                    type="password"
                    className="border-0 p-2"
                    placeholder="password"
                    style={{ outline: "none" }}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {/* --- Botón de Envío --- */}
            <button
                className="btn btn-primary m-3"
                onClick={handleSubmit}
                style={{
                    borderRadius: "20px",
                    width: "320px"
                }}
            >
                {label}
            </button>
        </>
    )
}