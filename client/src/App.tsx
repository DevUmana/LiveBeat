import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <Outlet /> {/* This renders the children components */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
