import Footer from "../components/footer";
import Navbar from "../components/navbar";

function Home() {
  return (
    <main>
      <div className="toper">
        <Navbar />
      </div>
      <div className="middle">Content</div>
      <div className="lower">
        <Footer />
      </div>
    </main>
  );
}

export default Home;
