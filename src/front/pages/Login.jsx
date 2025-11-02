import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { InputUsername } from "../components/InputUsername";
import { SingUpHeader } from "../components/SingUpHeader";

export function Login() {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()


	async function userLogin({ email, password }) {
		const url = "https://repulsive-orb-9777r6jxwwg52p9vp-3001.app.github.dev/api/token";

		const dataToSend = {
			email: email,
			password: password
		};

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataToSend)
			});

			const data = await response.json();

			if (response.status === 201) {
				if (data.token) {
					localStorage.setItem("token", data.token);
				}

				dispatch({
					type: "SET_CURRENT_USER",
					payload: data.user_email
				});
				navigate("/private");

			} else if (response.status === 401) {
				alert(data.message || "Credenciales inválidas. Inténtalo de nuevo.");

			} else {
				alert(`Error de inicio de sesión: ${data.message || response.statusText}`);
			}

		} catch (error) {
			console.error("Error en la solicitud Fetch:", error);
			alert("Hubo un problema al conectar con el servidor. Inténtalo de nuevo.");
		}
	}



	return (
		<div
			className="d-flex flex-column align-items-center justify-content-center"
			style={{
				width: "400px",
				height: "auto",
				background: "rgba(192, 192, 192, 0.3)",
				backdropFilter: "blur(5px)",
				boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
				borderRadius: "30px"
			}}
		>
			<SingUpHeader label="Login" />
			<InputUsername onSubmitAction={userLogin} label="Login" />
			<p className="py-3">¿Don't have a account? <Link to={"/singup"}>Create Account</Link></p>
		</div>
	)
}