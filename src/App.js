import logo from './logo.svg';
import './App.css';
import Directory from './components/DirectoryComponent';

function App() {
  return (
    <div className="App">
      <Navbar className="app">
      <div className="container">
        <NavbarBrand href="/">NuCamp</NavbarBrand>
      </div>
      </Navbar>
      <Directory />
    </div>
  );
}

export default App;
