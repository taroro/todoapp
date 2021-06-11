import logo from './artidb.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <a 
            className="App-link"
            href="http://staff.sci.ubu.ac.th/artid.b" 
            target="_blank"
          >By AJ Artid Boonrerng</a>
        </p>
      </header>
    </div>
  );
}

export default App;
