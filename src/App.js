import Home from "./components/Home";
import { Route } from "react-router-dom";
import CardDetails from "./components/CardDetails";

function App() {
  
  return (
    <>
      
      <Route exact path='/' component={Home} /> 
      <Route  path="/card-details">
        <CardDetails />
      </Route>
    </>
  );
}

export default App;
