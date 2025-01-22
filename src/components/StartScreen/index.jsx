import "./StartScreen.css";

const StartScreen = ({ startGame }) => {
    return (
        <div className="start">
            <h1>Secret Word</h1>
            <p>Teste a sua habilidade descobrindo a palavra secreta!</p>
            <button onClick={startGame}>Começar jogo</button>
        </div>
    );
};

export default StartScreen;
