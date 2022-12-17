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
        for (let index in _gameBoard) {
            console.log(_gameBoard[index]);
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