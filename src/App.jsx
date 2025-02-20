import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState } from "react";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState("rocket");
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);
  // Add additional states below as required.
  const [remainingGusses, setRemainingGusses] = useState(10);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  const generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // create additional function to power the
  const [currentGuess, setCurrentGuess] = useState("");

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (currentGuess.length === 1 && !guessedLetters.includes(currentGuess)) {
      setGuessedLetters((prev) => [...prev, currentGuess]);
      setCurrentGuess("");
      if (!currWord.includes(currentGuess)) {
        setRemainingGusses((prev) => prev - 1);
      }
    }
  };

  if (remainingGusses === 0) {
    setHasLost(true);
  }
  if (currWord.split("").every((letter) => guessedLetters.includes(letter))) {
    setHasWon(true);
  }


  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        {generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.join(", ") : "-"}
        <br />
        <h3>Remaining Guesses : {remainingGusses}</h3>
        {hasWon && <h2>You Win!</h2>}
        {hasLost && <h2>You Lost! The word was: {currWord}</h2>}
        <h3>Input</h3>
        <form onSubmit={handleGuessSubmit}>
          <input 
            type="text"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value)}
            maxLength={1}
          />
          <button type="submit">Guess</button>
        </form>
      </div>
    </>
  );
}

export default App;
