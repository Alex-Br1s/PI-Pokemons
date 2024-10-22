import "./App.css";
import { Landing, Home, Form, Detail } from "./views/index";
import Navbar from "./components/NavBar/Navbar";
import { Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation(); //Te muestra el path en donde estas parado entre otras cosas
  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}

      <Route exact path="/" render={() => <Landing />} />
      <Route path="/home" render={() => <Home />} />
      <Route exact path="/detail/:id" render={() => <Detail />} />
      <Route path="/create" render={() => <Form />} />
    </div>
  );
}

export default App;
