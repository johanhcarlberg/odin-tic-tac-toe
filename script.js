const game = (() => {
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

        function getGameBoardIndexFromTarget(target) {
            return Array.from(_gameBoardContainer.childNodes).findIndex(item => item === target);
        }

        function setGameBoardItemAtIndex(index, symbol) {
            _gameBoard[index] = symbol;
            render();
        }
    
        function render() {
            _gameBoardContainer.replaceChildren();
            for (let index in _gameBoard) {
                const item = _gameBoard[index];
    
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('game-board-item')
                itemDiv.textContent = item;
                itemDiv.addEventListener('click', (e) => takeTurn(getGameBoardIndexFromTarget(e.target)))
    
                _gameBoardContainer.appendChild(itemDiv);
            }
        }
    
        render();
    
        return {
            getGameBoard,
            render,
            setGameBoardItemAtIndex
        }
    })();

    const playerFactory = (id, symbol) => {
        return { id, symbol }
    }

    const _player1 = playerFactory(1, 'X');
    const _player2 = playerFactory(2, 'O');
    let _currentPlayer = _player1;

    function takeTurn(gameBoardIndex) {
        console.log(_currentPlayer);
        if (gameBoardModule.getGameBoard()[gameBoardIndex] !== '') {
            console.log(`index ${gameBoardIndex} already occupied`);
            return;
        }
        gameBoardModule.setGameBoardItemAtIndex(gameBoardIndex, _currentPlayer.symbol);
        _currentPlayer === _player1 ? _currentPlayer = _player2 : _currentPlayer = _player1;
    }
})();

