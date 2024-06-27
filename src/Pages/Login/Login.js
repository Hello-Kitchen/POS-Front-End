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
            <p>Identifiant</p>
            <p>Mot de passe</p>
            <button onClick={() => handleLogin()}>Se Connecter</button>
        </div>
    )
}

export default Login;