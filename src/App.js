import Home from "./components/Home";
import { Route } from "react-router-dom";
import CardDetails from "./components/CardDetails";
import ItemDetails from "./components/ItemDetails";

function App() {
  
  return (
    <>
      
      <Route exact path='/' component={Home} /> 
      <Route  path="/card-details">
        <CardDetails />
      </Route>
      <Route  path="/item-details/:id">
        <ItemDetails />
      </Route>
    </>
  );
}

export default App;
