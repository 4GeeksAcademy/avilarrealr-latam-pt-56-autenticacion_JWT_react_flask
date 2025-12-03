import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { SingUpHeader } from "../components/SingUpHeader.jsx";
import { InputUsername } from "../components/InputUsername.jsx";


export const SingUp = () => {

    const navigate = useNavigate()
    const { dispatch } = useGlobalReducer()


    async function createUser({ email, password }) {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/user`;

        const dataToSend = {
            email: email,
            password: password
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.status === 201) {
                const responseData = await response.json()

                dispatch({
                    type: "SET_CURRENT_USER",
                    payload: email
                });
                alert("User create successfully")
                navigate("/login");

            } else if (response.status === 409) {
                alert(`Error: el usuario ${email} ya existe.`);

            } else {
                const errorData = await response.json();
                alert(`Error al crear el usuario: ${errorData.message || response.statusText}`);
            }

        } catch (error) {
            console.error("Error en la solicitud Fetch:", error);
            alert("Hubo un problema al conectar con el servidor.");
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
            <SingUpHeader label="Create account" />
            <InputUsername onSubmitAction={createUser} label="Create account" />
            <p className="py-3">¿Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    )
} 