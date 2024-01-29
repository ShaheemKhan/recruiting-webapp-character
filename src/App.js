import { useState } from "react";
import "./App.css";
import Character from "./Character";

function App() {
  const [numberOfCharacters, setNumberOfCharcters] = useState(1);
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <button onClick={() => setNumberOfCharcters(numberOfCharacters + 1)}>
          Add Character
        </button>
        {[...Array(numberOfCharacters)].map((_, index) => (
          <>
            <p>Character: {index + 1}</p>
            <Character />
          </>
        ))}
      </section>
    </div>
  );
}

export default App;
