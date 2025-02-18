import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import video_t from '../assets/figma_design.mp4'; 
import logo from '../assets/Frame 1171280900.png'; 
import './Loginform_sap.css'; 

function LoginForm() {
    const navigate = useNavigate();

    const [domainId, setDomainId] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare data to be sent to the backend
        const formData = new FormData();
        formData.append('domainId', domainId);
        formData.append('password', password);

        try {
            // Send the login data to the backend using fetch
            const response = await fetch('http://localhost:8092/login.php', {
                method: 'POST',
                body: formData
            });

            // Check if the request was successful
            if (response.ok) {
                // Parse the API response
                const responseData = await response.json();

                // Check if login is successful based on IsActive property
                if (responseData.IsActive) {
                    const name = responseData.Name;
                    const isAdmin = await checkAdmin(domainId, name);
                    console.log("Name retrieved from isActive " + name);

                    if (isAdmin.exists) {
                        // Set session ID in a cookie
                        document.cookie = `AdminSessionId=${isAdmin.sessionId}; expires=; path=/`;
                        document.cookie = `name=${isAdmin.name}; expires=; path=/`; // Set name in cookie
                        document.cookie = `adminAccess=${isAdmin.access}; expires=; path=/`; // Set access in cookie

                        // Redirect to admin dashboard
                        navigate('./Admin_manegement/Admin_manegement');
                    } else {
                        const isUserResponse = await checkUser(domainId, name);
                        console.log("Name retrieved from isActive under checkUser " + name);

                        if (isUserResponse.exists) {
                            onLoginSuccess();
                            console.log("Session ID:", isUserResponse.sessionId);

                            // Store the session ID in a cookie
                            document.cookie = `UserSessionId=${isUserResponse.sessionId}; expires=; path=/`;
                            document.cookie = `name=${isUserResponse.name}; expires=; path=/`; // Set name in cookie

                            // Redirect to user dashboard
                            navigate('./Main_application/Main_application');
                        } else {
                            setLoginMessage('Sorry, you do not have access to this application');
                        }
                    }
                } else {
                    setLoginMessage('Authentication failed');
                }
            } else {
                setLoginMessage('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginMessage('Error: ' + error.message);
        }
    };

    const checkAdmin = async (domainId, name) => {
        try {
            const response = await fetch(`http://localhost:8092/checkAdmin.php?domainId=${domainId}&name=${name}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Data from checkAdmin:", data);
                return {
                    exists: data.exists,
                    sessionId: data.sessionId,
                    name: data.name,
                    access: data.access
                };
            } else {
                console.error('Failed to check admin:', response.statusText);
                return { exists: false };
            }
        } catch (error) {
            console.error('Error:', error);
            return { exists: false };
        }
    };

    const checkUser = async (domainId, name) => {
        try {
            const response = await fetch(`http://localhost:8092/checkUser.php?domainId=${domainId}&name=${name}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Data from checkUser:", data);
                return {
                    exists: data.exists,
                    sessionId: data.sessionId,
                    name: data.userData.name
                };
            } else {
                console.error('Failed to check user:', response.statusText);
                return {
                    exists: false,
                    sessionId: null,
                    name: null
                };
            }
        } catch (error) {
            console.error('Error:', error);
            return {
                exists: false,
                sessionId: null,
                name: null
            };
        }
    };

    const onLoginSuccess = () => {
        console.log('Login successful!');
    };

    return (
        <main className="relative flex justify-center items-center h-screen w-screen">
            <div className="absolute aspect-w-16 aspect-h-9 h-full w-full bg-slate-300 bg-cover z-negative-10 overflow-hidden filter">
                <video autoPlay loop muted className="object-cover h-full w-full">
                    <source src={video_t} type="video/mp4" />
                </video>
            </div>
            <div className="absolute aspect-w-16 aspect-h-9 h-full w-full bg-cover z-negative-10 overflow-hidden filter">
                <div className="w-full h-full bg-gradient-to-r from-white-10 via-black-60 to-black"></div>
            </div>
            <div className="w-full h-full flex flex-row items-center justify-center sm:justify-end sm:pr-32 z-10">
                <div className="border pt-4 pb-8 px-8 rounded w-96 h-[420px] flex flex-col items-center justify-between">
                    <img src={logo} alt="Logo" className="logo" />
                    <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
                        <label className="label" htmlFor="user-id">User ID</label>
                        <input 
                            type="text" 
                            id="user-id" 
                            placeholder="User ID" 
                            className="input" 
                            value={domainId}
                            onChange={(e) => setDomainId(e.target.value)}
                        />
                        <label className="label" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Password" 
                            className="input" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="button">Login</button>
                    </form>
                    {loginMessage && <p className="text-red-500 mt-4">{loginMessage}</p>}
                </div>
            </div>
        </main>
    );
}

export default LoginForm;
