import Navbar from "../components/navbar";
import Footer from "../components/footer";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function FormPage() {

    
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

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
                                    <Box
                                        component="form"
                                        onSubmit={handleSubmit}
                                        noValidate
                                        sx={{ mt: 1 }}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            name="name"
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            multiline
                                            rows={4} // You can adjust the number of rows as needed
                                            name="description"
                                            label="Description"
                                            id="description"
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
                                                min: 1900, // ปีต่ำสุดที่ยอมรับ
                                                max: new Date().getFullYear(), // ปีปัจจุบัน
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Add Books
                                        </Button>
                                    </Box>
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

export default FormPage;
