import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Book } from "../models/BookModel";
import { db } from "../config/config";

function DetailPage() {
    const [bookDetails, setBookDetails] = useState<Book | null>(null);
    let { book_id } = useParams();

    const fetchBookById = async (book_id: string | undefined) => {
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
                description: bookData.description,
                image: bookData.image,
            };
            setBookDetails(bookDetails);
        } else {
            console.log(`Book with ID ${book_id} not found.`);
        }
    };

    useEffect(() => {
        fetchBookById(book_id);
    }, [book_id]);

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
                <div className="detail">
                    <div className="detail-header">
                        <h3>Book Detail</h3>
                    </div>
                    <div className="detail-body">
                        <ThemeProvider theme={defaultTheme}>
                            <Container>
                                <CssBaseline />
                                <Box sx={{ flexGrow: 1 }}>
                                    {bookDetails && (
                                        <Grid
                                            container
                                            spacing={4}
                                            justifyContent="center"
                                        >
                                            <Grid item xs={6} md={4}>
                                                <div className="detail-image">
                                                    {bookDetails.image ? (
                                                        <img
                                                            src={
                                                                bookDetails.image
                                                            }
                                                            alt="Book cover"
                                                            style={{
                                                                height: "320px",
                                                            }}
                                                        />
                                                    ) : (
                                                        <p>
                                                            No image available
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="detail-content-details">
                                                    <div className="detail-name">
                                                        <th>
                                                            {bookDetails.name}
                                                        </th>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} md={4}>
                                                <div className="detail-content">
                                                    <div className="detail-content-details">
                                                        <strong>
                                                            Description :
                                                        </strong>{" "}
                                                        {
                                                            bookDetails.description
                                                        }
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Box>
                            </Container>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
            <div className="lower">
                <Footer />
            </div>
        </main>
    );
}

export default DetailPage;
