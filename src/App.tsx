import "./App.css";
import Layout from "./components/Layout";
import { Skills } from "./sections/Skills";
import Banner from "./sections/Banner";
import { Projects } from "./sections/Projects";
import { Footer } from "./sections/Footer";

function App() {
  return (
    <>
      <Layout>
        <Banner />
        <Skills />
        <Projects />
      </Layout>
      <Footer />
    </>
  );
}

export default App;
