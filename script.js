const gameBoardModule = (() => {
    const _gameBoard = [
        'X', '', 'O',     
        '', 'X', '',
        '', '', ''
    ];
    function getGameBoard() {
        return _gameBoard;
    }
    return {
        getGameBoard,
    }
})();