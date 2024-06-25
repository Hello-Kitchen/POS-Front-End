import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();
    const handleLogin = () => {
        if (true) { // All info are correct
            navigate("/dashboard")
        }
    }

    return (
        <div>
            <text>Identifiant</text>
            <text>Mot de passe</text>
            <button onClick={() => handleLogin()}>Se Connecter</button>
        </div>
    )
}

export default Login;