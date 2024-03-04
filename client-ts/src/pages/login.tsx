import { useState } from "react";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField } from "@mui/material";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function LoginPage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);

    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const signInWithEmailAndPasswordHandler = () => {
        if (error !== "") setError("");

        setAuthenticating(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log("Login successful:", result);
                navigate("/");
            })
            .catch((error) => {
                console.error("Error during login:", error);

                if (
                    error.code === "auth/user-not-found" ||
                    error.code === "auth/wrong-password"
                ) {
                    setError("Invalid email or password. Please try again.");
                } else if (error.code === "auth/invalid-email") {
                    setError(
                        "Invalid email format. Please enter a valid email address."
                    );
                } else if (error.code === "auth/missing-password") {
                    setError("Please enter a password.");
                } else if (error.code === "auth/invalid-credential") {
                    setError(
                        "Invalid credentials. Please check your email and password."
                    );
                } else {
                    setError(
                        "An error occurred during sign-in. Please try again later."
                    );
                }

                setAuthenticating(false);
            });
    };

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user.uid);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            });
    };

    function Copyright(props: any) {
        return (
            <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                {...props}
            >
                {"Copyright © "}
                <Link
                    color="inherit"
                    href="https://cloud-hosting-240-229.web.app/"
                >
                    Web Demo for Cloud Project
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        );
    }

    const defaultTheme = createTheme({
        typography: {
            fontFamily: "var(--font-family)",
            fontSize: 16,
        },
        palette: {
            background: {
                default: "#f2e9e4", // Set your desired background color
            },
        },
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "100vh",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        //onSubmit={}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            value={password}
                        />
                        <small className="text-danger">{error}</small>
                        <Button
                            disabled={authenticating}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => signInWithEmailAndPasswordHandler()}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => signInWithGoogle()}
                                    disabled={authing}
                                >
                                    Sign in with Google
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default LoginPage;
