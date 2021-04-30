import logo from './logo.svg';
import './App.css';
import Searchbar from './searchbar';


function App() {
  // Declare a new state variable, which we'll call "count"
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1>Butt Pokedex</h1>
        </a>
        
        <Searchbar></Searchbar>
        
      </header>
      
    </div>
  );
}

export default App;
