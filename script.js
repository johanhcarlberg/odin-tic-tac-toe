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

    }

    return {
        getGameBoard,
    }
})();