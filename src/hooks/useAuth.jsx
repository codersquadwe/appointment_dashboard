import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = Cookies.get("token"); // Get token from cookies/local storage
        console.log(token)
        if (token) {
            try {
                setLoading(true);
                // Decrypt token and extract payload
                const decodedToken = jwtDecode(token);
                console.log(decodedToken)
                // Extract role from decoded token payload
                const userRole = Cookies.get("role"); // Assuming role is stored in 'role' field of token payload

                setIsLoggedIn(true);

                if (userRole === "brand" || userRole === "superAdmin") {
                    console.log("User is authorized");
                    setIsAuthorized(true);
                    setLoading(false);
                }
            } catch (error) {
                // Handle decryption or decoding errors
                console.error("Error decoding token:", error);
                setIsLoggedIn(false);
                setIsAuthorized(false);
                setLoading(false);
            }
        } else {
            setIsLoggedIn(false);
            setIsAuthorized(false);
            setLoading(false);
        }
    }, []);

    return { isLoggedIn, isAuthorized, loading };
}
