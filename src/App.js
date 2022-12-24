import "./App.css";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import CardDetails from "./components/CardDetails";

function App() {
  
  return (
    <>
      
      <Route  path='/home' component={Home} /> 
      <Route  path="/card-details">
        <CardDetails />
      </Route>
    </>
  );
}

export default App;
