import "./GameOver.css";

const GameOver = ({ retry, score }) => {
    return (
        <div className="endGame">
            <h1>Fim de Jogo!</h1>
            <h2 className="endGameScore">
                A sua pontuação foi: <span>{score}</span>
            </h2>
            <p>
                Obrigado por jogar! Clique no botão abaixo para tentar
                novamente.
            </p>
            <button onClick={retry}>Resetar jogo</button>
        </div>
    );
};

export default GameOver;
