import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore/lite";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Book } from "../models/BookModel";
import { db } from "../config/config";

function FormPage() {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [year, setYear] = useState<number | string>("");

    const SubmitAddBooks = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !description || !year) {
            console.error("Please fill in all fields");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "Book"), {
                name: name,
                description: description,
                year: typeof year === "number" ? year : parseInt(year, 10),
            } as Book);

            window.location.reload();

            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const defaultTheme = createTheme({
        typography: {
            fontFamily: "var(--font-family)",
        },
        palette: {
            background: {
                default: "#f2e9e4", // Set your desired background color
            },
        },
    });

    return (
        <main>
            <div className="toper">
                <Navbar />
            </div>
            <div className="middle">
                <div className="form">
                    <div className="form-header">
                        <h3>Add Books</h3>
                    </div>
                    <div className="form-body">
                        <ThemeProvider theme={defaultTheme}>
                            <Container>
                                <CssBaseline />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <form onSubmit={SubmitAddBooks} noValidate>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            name="name"
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            multiline
                                            rows={4}
                                            name="description"
                                            label="Description"
                                            id="description"
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="number"
                                            name="year"
                                            label="Year"
                                            id="year"
                                            inputProps={{
                                                min: 1900,
                                                max: new Date().getFullYear(),
                                            }}
                                            onChange={(e) =>
                                                setYear(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Add Books
                                        </Button>
                                    </form>
                                </Box>
                            </Container>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </main>
    );
}

export default FormPage;
