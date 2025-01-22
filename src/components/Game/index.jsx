import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
    verifyLetter,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score,
}) => {
    const [inputLetter, setInputLetter] = useState("");
    const letterInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        verifyLetter(inputLetter);

        setInputLetter("");

        letterInputRef.current.focus();
    };

    return (
        <div className="game">
            <div className="headerContainer">
                <p className="points">
                    <span>Pontuação: {score}</span>
                </p>

                <h1>Advinhe a palavra</h1>
                <h3 className="tip">
                    Dica sobre a palavra: <span>{pickedCategory}</span>
                </h3>

                <p className="attemptsWarn">
                    Você ainda tem {guesses} tentativa(s).
                </p>
            </div>

            <ul className="wordContainer">
                {letters.map((letter, i) =>
                    guessedLetters.includes(letter) ? (
                        <li className="letter" key={i}>
                            {letter}
                        </li>
                    ) : (
                        <li key={i} className="blankSquare"></li>
                    )
                )}
            </ul>

            <div className="letterContainer">
                <p>Tente advinhar uma letra da palavra</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="letter"
                        maxLength="1"
                        required
                        onChange={(e) => setInputLetter(e.target.value)}
                        value={inputLetter}
                        ref={letterInputRef}
                    />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já utilizadas: </p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}, </span>
                ))}
            </div>
        </div>
    );
};

export default Game;
