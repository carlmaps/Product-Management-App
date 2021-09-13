import logo from './logo.svg';
import './App.css';
import ProductListComponent from './components/ProductListComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CreateProductComponent from './components/CreateProductComponent';

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
              <br />
              <div className="container">
                  <Switch> 
                      <Route path = "/" exact component ={ProductListComponent}></Route>
                      <Route path = "/products" component ={ProductListComponent}></Route>
                      <Route path = "/add-product/:id" component ={CreateProductComponent}></Route>      
                  </Switch>
              </div>
          <FooterComponent />
      </Router>
    </div>
      
   
    
  );
}

export default App;
