import { useState } from "react";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
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

function RegisterPage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);

    const [registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [error, setError] = useState<string>("");

    const signUpWithEmailAndPassword = () => {
        if (password !== confirm) {
            setError("Please make sure your passwords match.");
            return;
        }

        if (error !== "") setError("");

        setRegistering(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log("Registration successful:", result);
                navigate("/login");
            })
            .catch((error) => {
                console.error("Error during registration:", error);

                if (error.code === "auth/weak-password") {
                    setError("Please enter a stronger password.");
                } else if (error.code === "auth/email-already-in-use") {
                    setError("Email already in use.");
                } else {
                    setError("Unable to register. Please try again later.");
                }

                setRegistering(false);
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
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        //onSubmit={}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    value={email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    id="password"
                                    label="Password"
                                    type="password"
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    value={password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm"
                                    id="confirm"
                                    label="Confirm Password"
                                    type="password"
                                    onChange={(event) =>
                                        setConfirm(event.target.value)
                                    }
                                    value={confirm}
                                />
                            </Grid>
                        </Grid>
                        <small className="text-danger">{error}</small>
                        <Button
                            disabled={registering}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => signUpWithEmailAndPassword()}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => signInWithGoogle()}
                                    disabled={authing}
                                >
                                    Sign in with Google
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default RegisterPage;
