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
        const _gameBoard = [
            'X', '', 'O',     
            '', 'X', '',
            '', '', ''
        ];
        const _gameBoardContainer = document.querySelector("#game-board-container");

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
            setGameBoardItemAtIndex
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

    function takeTurn(gameBoardIndex) {
        console.log(_currentPlayer);
        if (gameBoardModule.getGameBoard()[gameBoardIndex] !== '') {
            console.log(`index ${gameBoardIndex} already occupied`);
            return;
        }
        gameBoardModule.setGameBoardItemAtIndex(gameBoardIndex, _currentPlayer.symbol);
        _currentPlayer === _player1 ? _currentPlayer = _player2 : _currentPlayer = _player1;
    }
    
    displayModule.init(gameBoardModule.getGameBoard());
    
})();

