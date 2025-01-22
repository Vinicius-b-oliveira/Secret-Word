// CSS
import "./app.css";
import "./responsive.css";

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

    const [pickedCategory, setPickedCategory] = useState("");
    const [letters, setLetters] = useState([]);

    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [guesses, setGuesses] = useState(guessesQty);
    const [score, setScore] = useState(0);

    console.log(letters);

    const pickWordAndCategory = useCallback(() => {
        const categories = Object.keys(words);
        const category =
            categories[Math.floor(Math.random() * categories.length)];

        const word =
            words[category][Math.floor(Math.random() * words[category].length)];

        return { word, category };
    }, [words]);

    const startGame = useCallback(() => {
        const { word, category } = pickWordAndCategory();

        let wordLetters = word.split("");

        wordLetters = wordLetters.map((letter) => letter.toLowerCase());

        setPickedCategory(category);
        setLetters(wordLetters);

        setGameStage(stages[1].name);
    }, [pickWordAndCategory]);

    const verifyLetter = (letter) => {
        const normalizedLetter = letter.toString().toLowerCase();

        if (
            guessedLetters.includes(normalizedLetter) ||
            wrongLetters.includes(normalizedLetter)
        ) {
            alert("Você já usou essa letra!");
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

    // Check GameOver condition
    useEffect(() => {
        if (guesses <= 0) {
            clearLetterStates();
            setGameStage(stages[2].name);
        }
    }, [guesses]);

    // Check win condition
    useEffect(() => {
        const uniqueLetters = [...new Set(letters)];

        if (
            guessedLetters.length === uniqueLetters.length &&
            uniqueLetters.length != 0
        ) {
            setScore((prev) => prev + 100);
            clearLetterStates();
            startGame();
            setGuesses(guessesQty);
        }
    }, [guessedLetters, letters, startGame]);

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
                    pickedCategory={pickedCategory}
                    letters={letters}
                    guessedLetters={guessedLetters}
                    wrongLetters={wrongLetters}
                    guesses={guesses}
                    score={score}
                />
            )}
            {gameStage === "end" && <GameOver retry={retry} score={score} />}
        </div>
    );
}

export default App;
