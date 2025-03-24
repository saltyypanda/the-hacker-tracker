import "./App.css";
import Layout from "./components/Layout";
import { Skills } from "./sections/Skills";
import Banner from "./sections/Banner";

function App() {
  return (
    <>
      <Layout>
        <Banner />
        <Skills />
      </Layout>
    </>
  );
}

export default App;
