import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.target);
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        if (!username || !email || !password) {
            setError("All fields are required.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8800/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password }),
                credentials:"include"
            });

            if (!response.ok) {
                const errorText = await response.text();  
                throw new Error(errorText || `HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            navigate("/login");
        } catch (err) {
            setError(err.message);
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="register">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Create an Account</h1>
                    <input name="username" type="text" placeholder="Username" />
                    <input name="email" type="text" placeholder="Email" />
                    <input name="password" type="password" placeholder="Password" />
                    <button disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                    {error && <span className="error">{error}</span>}
                    <Link to="/login"><h3>Do you have an account?</h3></Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="Background" />
            </div>
        </div>
    );
}

export default Register;
