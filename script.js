const game = (() => {
    const pubSub = (() => {
        events = {};

        function subscribe(event, func) {
            if (!events[event]) {
                events[event] = [func];
            } else {
                events[event].push(func);
            }
        }

        function unsubscribe(event, func) {
            events[event].filter(event => event !== func);
        }

        function emit(event, data) {
            console.log(`emitting ${event}`)
            if (!events[event]) {
                return;
            }
            events[event].forEach(func => {
                func(data);
            })
        }

        return { 
            subscribe,
            unsubscribe,
            emit
        }
    })();

    const gameBoardModule = (() => {
        let _gameBoard = [];

        function _reset() {
            _gameBoard = [
                '', '', '',
                '', '', '',
                '', '', '',
            ]
        }

        function init() {
            _reset();
        }

        function getGameBoard() {
            return _gameBoard;
        }

        function setGameBoardItemAtIndex(index, symbol) {
            _gameBoard[index] = symbol;
            pubSub.emit('gameBoardChanged', _gameBoard);
            //render();
        }

        return {
            getGameBoard,
            setGameBoardItemAtIndex,
            init
        }
    })();

    const displayModule = (() => {
        pubSub.subscribe('gameBoardChanged', render);
        const _gameBoardContainer = document.querySelector("#game-board-container");

        function getGameBoardIndexFromTarget(target) {
            return Array.from(_gameBoardContainer.childNodes).findIndex(item => item === target);
        }

        function render(gameBoard) {
            console.log('rendering');
            console.log(gameBoard);

            _gameBoardContainer.replaceChildren();
            for (let index in gameBoard) {
                const item = gameBoard[index];
    
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('game-board-item')
                itemDiv.textContent = item;
                itemDiv.addEventListener('click', (e) => takeTurn(getGameBoardIndexFromTarget(e.target)))
    
                _gameBoardContainer.appendChild(itemDiv);
            }
        }

        function init(gameBoard) {
            render(gameBoard);
        }

        return { init }

    })();

    const playerFactory = (id, symbol) => {
        return { id, symbol }
    }

    const _player1 = playerFactory(1, 'X');
    const _player2 = playerFactory(2, 'O');
    let _currentPlayer = _player1;
    let _isGameOver = false;

    function takeTurn(gameBoardIndex) {
        if (_isGameOver) {
            return;
        }
        console.log(_currentPlayer);
        if (gameBoardModule.getGameBoard()[gameBoardIndex] !== '') {
            console.log(`index ${gameBoardIndex} already occupied`);
            return;
        }
        gameBoardModule.setGameBoardItemAtIndex(gameBoardIndex, _currentPlayer.symbol);
        if (checkWinState()) {
            console.log(`Player ${_currentPlayer.id} wins!`)
            _isGameOver = true;
        }
        _currentPlayer === _player1 ? _currentPlayer = _player2 : _currentPlayer = _player1;
    }

    function checkWinState() {
        const _gameBoard = gameBoardModule.getGameBoard();
        if (checkRows(_gameBoard) || checkCols(_gameBoard)) {
            return true;
        } else {
            return false;
        }
        
    }
    function checkCols(_gameBoard) {
        for (let i = 0; i < 3; i++) {
            let colMatches = 1;
            let colSymbol = _gameBoard[i];
            if (!colSymbol) {
                continue;
            }
            for (let j = 1; j < 3; j++) {
                let colCurrIndex = i + j * 3;
                if (_gameBoard[colCurrIndex] === colSymbol) {
                    colMatches++;
                }
            }
            if (colMatches === 3) {
                console.log(`player with symbol ${colSymbol} wins (cols)`);   
                return true;
            }
        }
        return false;
    }
    
    function checkRows(_gameBoard) {
        for (let i = 0; i < 3; i++) {
            let rowMatches = 1;
            let rowSymbol = _gameBoard[i * 3];
            if (!rowSymbol) {
                continue;
            }
            for (let j = 1; j < 3; j++) {
                let rowCurrIndex = i * 3 + j;
                if (_gameBoard[rowCurrIndex] === rowSymbol) {
                    rowMatches++;
                }
            }
            if (rowMatches === 3) {
                console.log(`player with symbol ${rowSymbol} wins (rows)`);   
                return true;
            }
        }
        return false;
    }
    
    gameBoardModule.init();
    displayModule.init(gameBoardModule.getGameBoard());
    
    return { checkWinState };
})();

