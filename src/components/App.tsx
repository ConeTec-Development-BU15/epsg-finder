import "bootswatch/dist/minty/bootstrap.min.css";

import { AppContextProvider } from "./AppContext";
import { Container } from "react-bootstrap";
import Results from "./Results";
import Input from "./Input";


function App() {
  return (
    <AppContextProvider>
      <header className="bg-primary pt-5 pb-4">
        <Container >
          <h1 className="text-white">EPSG Code Finder</h1>
          <p className="lead text-white">A helper to find an EPSG code</p>
        </Container>
      </header>
      <Container className="my-5">
        <h2 className="mb-4">Sample Coordinates</h2>
        <Input />
        <h2 className="my-4">Results</h2>
        <Results />
      </Container>
    </AppContextProvider>
  );
}

export default App
