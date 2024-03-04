import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Book } from "../models/BookModel";
import { db } from "../config/config";

function HomePage() {
    const [dataFromDatabase, setDataFromDatabase] = useState<Book[]>([]);

    const fetchBook = async () => {
        const BookCollection = collection(db, "Book");
        const BookSnapshot = await getDocs(BookCollection);
        const BookList: Book[] = BookSnapshot.docs.map((doc) => {
            const bookData = doc.data();
            const bookId = doc.id;
            return {
                docId: bookId,
                name: bookData.name,
                description: bookData.description,
                year: bookData.year,
            };
        });
        setDataFromDatabase(BookList);
        console.log(BookList);
    };

    useEffect(() => {
        fetchBook();
    }, []);

    return (
        <main>
            <div className="toper">
                <Navbar />
            </div>
            <div className="middle">
                <div className="content">
                    <div className="content-header">
                        <h3>Book Lists</h3>
                    </div>
                    <div className="content-body">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataFromDatabase.map((item) => (
                                    <tr key={item.docId}>
                                        <td>{item.docId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="lower">
                <Footer />
            </div>
        </main>
    );
}

export default HomePage;
