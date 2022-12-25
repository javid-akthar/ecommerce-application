import CartTotal from './CartTotal';

// Navbar component
function Navbar(props) {
    
    let navbarTitleStle = {
        color: "rgb(153,0,18)",
        fontSize: "32px",
        paddingLeft: "4px"
    }

    let navBarStyleOBj = {
     backgroundColor: "#e3f2fd",
     height: "65px",
     width: "100%",
     position: "fixed",
     zIndex: "1"  
    }

    return (
        <div>
            <nav className="navbar navbar-light" style={navBarStyleOBj}>
      <span className="navbar-brand mb-0 h1" style={navbarTitleStle}>Ecommerce Application</span>
      <CartTotal/>
    </nav>
        </div>
    );
}

export default Navbar;