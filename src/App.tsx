import "./App.css";
import Layout from "./components/Layout";
import { Skills } from "./sections/Skills";
import Banner from "./sections/Banner";
import { Projects } from "./sections/Projects";

function App() {
  return (
    <>
      <Layout>
        <Banner />
        <Skills />
        <Projects />
      </Layout>
    </>
  );
}

export default App;
