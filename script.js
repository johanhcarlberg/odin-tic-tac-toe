const gameBoardModule = (() => {
    const _gameBoard = [
        'X', '', 'O',     
        '', 'X', '',
        '', '', ''
    ];
    const _gameBoardContainer = document.querySelector("#game-board-container");
    function getGameBoard() {
        return _gameBoard;
    }

    function render() {
        _gameBoardContainer.replaceChildren();
        for (let index in _gameBoard) {
            const item = _gameBoard[index];
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('game-board-item')
            itemDiv.textContent = item;
            _gameBoardContainer.appendChild(itemDiv);
        }
    }

    render();

    return {
        getGameBoard,
    }
})();

const playerFactory = (symbol) => {
    return { symbol }
}

const player1 = playerFactory('X');
const player2 = playerFactory('O');