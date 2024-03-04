import Navbar from "../components/navbar";
import Content from "../components/content";
import Footer from "../components/footer";

function Home() {
    return (
        <main>
            <div className="toper">
                <Navbar />
            </div>
            <div className="middle">
                <Content />
            </div>
            <div className="lower">
                <Footer />
            </div>
        </main>
    );
}

export default Home;
