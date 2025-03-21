import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import {checkSession} from "../utils/auth"

export const ProtectedRoute = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchSession() {
        const loggedInUser = await checkSession();
        setUser(loggedInUser);
        setLoading(false);
        if(!loggedInUser) navigate("/login");
    }
    fetchSession();
  }, [navigate]);

  if(loading) return <p>Loading...</p>
  return user ? children: null;
}
