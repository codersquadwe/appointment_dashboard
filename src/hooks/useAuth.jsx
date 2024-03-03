import { jwtDecode } from 'jwt-decode'; 
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookies/local storage
console.log(token)
    if (token) {
      try {
        // Decrypt token and extract payload
        const decodedToken = jwtDecode(token);
        console.log(decodedToken)
        // Extract role from decoded token payload
        const userRole = decodedToken.role; // Assuming role is stored in 'role' field of token payload

        setIsLoggedIn(true);

        // Check user role
        if (userRole === "organization" || userRole === "superAdmin") {
          console.log("User is authorized");
          setIsAuthorized(true);
        } 
      } catch (error) {
        // Handle decryption or decoding errors
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
        setIsAuthorized(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAuthorized(false);
    }
  }, []);

  return { isLoggedIn, isAuthorized };
}
