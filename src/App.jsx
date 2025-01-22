// CSS
import "./app.css";

//React
import { useCallback, useEffect, useState } from "react";

// Data
import { wordsList } from "./data/words";

// Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
    const [gameStage, setGameStage] = useState(stages[0].name);
    const [words] = useState(wordsList);

    const [pickedWord, setPickedWord] = useState("");
    const [pickedCategory, setPickedCategory] = useState("");
    const [letters, setLetters] = useState([]);

    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [guesses, setGuesses] = useState(guessesQty);
    const [score, setScore] = useState(0);

    console.log(letters);

    const pickWordAndCategory = () => {
        const categories = Object.keys(words);
        const category =
            categories[Math.floor(Math.random() * categories.length)];

        const word =
            words[category][Math.floor(Math.random() * words[category].length)];

        return { word, category };
    };

    const startGame = () => {
        const { word, category } = pickWordAndCategory();

        let wordLetters = word.split("");

        wordLetters = wordLetters.map((letter) => letter.toLowerCase());

        setPickedWord(word);
        setPickedCategory(category);
        setLetters(wordLetters);

        setGameStage(stages[1].name);
    };

    const verifyLetter = (letter) => {
        const normalizedLetter = letter.toString().toLowerCase();

        if (
            guessedLetters.includes(normalizedLetter) ||
            wrongLetters.includes(normalizedLetter)
        ) {
            return;
        }

        if (letters.includes(normalizedLetter)) {
            setGuessedLetters((prev) => [...prev, normalizedLetter]);
        } else {
            setWrongLetters((prev) => [...prev, normalizedLetter]);
            setGuesses((prev) => prev - 1);
        }
    };

    const clearLetterStates = () => {
        setGuessedLetters([]);
        setWrongLetters([]);
    };

    useEffect(() => {
        if (guesses <= 0) {
            clearLetterStates();
            setGameStage(stages[2].name);
        }
    }, [guesses]);

    const retry = () => {
        setScore(0);
        setGuesses(guessesQty);
        setGameStage(stages[0].name);
    };

    return (
        <div className="App">
            {gameStage === "start" && <StartScreen startGame={startGame} />}
            {gameStage === "game" && (
                <Game
                    verifyLetter={verifyLetter}
                    pickedWord={pickedWord}
                    pickedCategory={pickedCategory}
                    letters={letters}
                    guessedLetters={guessedLetters}
                    wrongLetters={wrongLetters}
                    guesses={guesses}
                    score={score}
                />
            )}
            {gameStage === "end" && <GameOver retry={retry} />}
        </div>
    );
}

export default App;
