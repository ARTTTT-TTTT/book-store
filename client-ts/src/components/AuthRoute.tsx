import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AuthRoute({ element }: { element: React.ReactElement }) {
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                console.log("unauthorized");
                navigate("/login");
            }
        });

        return () => AuthCheck();
    }, [auth, navigate]);

    return element;
}

export default AuthRoute;
