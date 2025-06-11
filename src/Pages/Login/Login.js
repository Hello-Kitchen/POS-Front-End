import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import logo from './logo-notext.png';
import bcrypt from "bcryptjs-react";

/**
 * Component : Page, Component used to handle a User login in the POS Application. Main entry point
 * 
 * @component Login
 */
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [restaurantID, setRestaurantID] = useState(localStorage.getItem('restaurantID') || '');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    useEffect(() => {
        if (location.state && location.state.error) {
            setError(location.state.error);
        }
    }, [location]);
    
    //post request to the back-end, If login informations are correct, will redirect to the Loading page
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!restaurantID || !username || !password) {
            setError('Merci de remplir tous les champs');
            return;
        }

        const hasedPassword = bcrypt.hashSync(password, `${process.env.REACT_APP_SALT_HASH}`);


        fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/login?idRestaurant=${restaurantID}&username=${username}&password=${hasedPassword}`)
            .then(response => {
                if (response.status === 400)
                    setError('Username or password is incorrect');
                return response.json();
            })
            .then(data => {
                if (data.access_token) {
                    localStorage.setItem('restaurantID', restaurantID);
                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('userInfo', JSON.stringify({ id: data.id.toString().padStart(3, '0'), firstname: data.firstname, lastname: data.lastname }));
                    navigate('/loading');
                }
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    };


    return (
        <div className="flex flex-col md:flex-row h-screen w-full items-center justify-center md:items-stretch">
            <div className="hidden md:block md:w-7/12 bg-kitchen-blue shadow-inner-right-lg"/>
            <div className="flex flex-col w-full max-w-md md:w-5/12 md:max-w-none justify-center px-8 md:pl-20 py-10 md:py-0">
                <img 
                    src="./logo-notext.png" 
                    alt="Logo" 
                    className="w-2/5 md:w-2/6 mx-auto md:mx-0 mb-6"
                />
                <div className="font-extrabold text-4xl text-kitchen-blue mb-6 text-center md:text-left md:text-2xl">
                    CONNEXION
                </div>
                {error && (
                    <div className="bg-kitchen-beige text-white w-full md:w-3/4 mb-6 p-3 rounded text-center text-sm md:text-base">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-6">
                        <label htmlFor="restaurantID" className="block pl-2 mb-3 text-lg md:text-base">
                            Numéro de restaurant
                        </label>
                        <input
                            type="text"
                            id="restaurantID"
                            name="restaurantID"
                            className="w-full md:w-3/4 p-4 h-14 md:h-12 rounded-xl border border-kitchen-blue focus:outline-none focus:ring-2 focus:ring-kitchen-blue"
                            onChange={(e) => setRestaurantID(e.target.value)}
                            value={restaurantID}
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="username" className="block pl-2 mb-3 text-lg md:text-base">
                            Nom d&apos;utilisateur
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full md:w-3/4 p-4 h-14 md:h-12 rounded-xl border border-kitchen-blue focus:outline-none focus:ring-2 focus:ring-kitchen-blue"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    
                    <div className="mb-8">
                        <label htmlFor="password" className="block pl-2 mb-3 text-lg md:text-base">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full md:w-3/4 p-4 h-14 md:h-12 rounded-xl border border-kitchen-blue focus:outline-none focus:ring-2 focus:ring-kitchen-blue"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full md:w-3/4 p-4 h-14 md:h-12 rounded-xl bg-[#499CA6] text-white hover:bg-[#417f8c] transition duration-300 font-bold text-xl md:text-lg flex items-center justify-center"
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    )
};

export default Login;