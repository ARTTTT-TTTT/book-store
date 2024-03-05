import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore/lite";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Book } from "../models/BookModel";
import { db } from "../config/config";
import { useNavigate } from "react-router-dom";

function EditPage() {
    const [name, setName] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [year, setYear] = useState<number | string>("");
    const [price, setPrice] = useState<number | string>("");
    const [error, setError] = useState<string>("");
    const [bookDetails, setBookDetails] = useState<Book | null>(null);
    const navigate = useNavigate();
    let { book_id } = useParams();

    const handleDelete = async () => {
        if (!book_id) {
            console.error("ID is undefined");
            return;
        }

        try {
            const bookRef = doc(db, "Book", book_id);
            await deleteDoc(bookRef);
            console.log("Document successfully deleted!");
            navigate("/");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    useEffect(() => {
        const fetchBookById = async () => {
            if (!book_id) {
                console.error("ID is undefined");
                return;
            }

            const bookDocRef = doc(db, "Book", book_id);
            const bookSnapshot = await getDoc(bookDocRef);

            if (bookSnapshot.exists()) {
                const bookData = bookSnapshot.data();
                const bookDetails = {
                    docId: book_id,
                    name: bookData.name,
                    author: bookData.author,
                    description: bookData.description,
                    image: bookData.image,
                    year: bookData.year,
                    price: bookData.price,
                };
                setBookDetails(bookDetails);
                setName(bookDetails.name);
                setAuthor(bookDetails.author);
                setDescription(bookDetails.description);
                setImage(bookDetails.image);
                setYear(bookDetails.year);
                setPrice(bookDetails.price);
            } else {
                console.log(`Book with ID ${book_id} not found.`);
            }
        };

        fetchBookById();
        handleDelete;
    }, [book_id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (error !== "") setError("");

        if (!name || !author || !image || !description || !year || !price) {
            setError("Please fill in all fields.");
            console.error("Please fill in all fields");
            return;
        }

        try {
            const bookRef = doc(db, "Book", book_id ?? "");
            await setDoc(bookRef, {
                name: name,
                author: author,
                description: description,
                image: image,
                year: typeof year === "number" ? year : parseInt(year, 10),
                price: typeof price === "number" ? price : parseInt(price, 10),
            } as Book);

            console.log("Document updated successfully.");
            navigate("/");
        } catch (error) {
            console.error("Error updating document: ", error);
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
                        <h3>Edit Book</h3>
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
                                    <form onSubmit={handleSubmit} noValidate>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            name="name"
                                            autoFocus
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            value={name}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="author"
                                            label="Author"
                                            name="author"
                                            onChange={(e) =>
                                                setAuthor(e.target.value)
                                            }
                                            value={author}
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
                                            value={description}
                                        />
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            name="image"
                                            label="Image (URL)"
                                            id="image"
                                            onChange={(e) =>
                                                setImage(e.target.value)
                                            }
                                            value={image}
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
                                            value={year}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="number"
                                            name="price"
                                            label="Price"
                                            id="price"
                                            inputProps={{
                                                min: 1,
                                            }}
                                            onChange={(e) =>
                                                setPrice(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            value={price}
                                        />
                                        <small className="text-danger">
                                            {error}
                                        </small>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Update Book
                                        </Button>
                                    </form>
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            mb: 2,
                                            backgroundColor: "red",
                                            "&:hover": {
                                                backgroundColor: "darkred", // Change to the desired hover color
                                            },
                                        }}
                                        onClick={handleDelete}
                                    >
                                        Delete Book
                                    </Button>
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

export default EditPage;
