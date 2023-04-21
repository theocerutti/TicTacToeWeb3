// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TicTacToe {
    Game[] private games;

    // SquareType
    uint8 constant SQUARE_NONE = 0;
    uint8 constant SQUARE_OWNER = 1;
    uint8 constant SQUARE_OPPONENT = 2;

    enum GameState {
        Draw,
        HasWinner,
        OnGoing
    }

    struct Game {
        address owner;
        address opponent;
        address winner;
        uint8[9] board;
        bool isOwnerTurn;
        GameState gameState;
        uint256 id;
    }

    event NewGame(address owner);
    event JoinGame(uint256 gameId, address opponent);

    function mintGame() external {
        uint8[9] memory board;
        for (uint8 i = 0; i < board.length; i++) {
            board[i] = SQUARE_NONE;
        }
        uint256 id = games.length;
        Game memory game = Game(msg.sender, address(0), address(0), board, true, GameState.OnGoing, id);
        games.push(game);

        emit NewGame(msg.sender);
    }

    function join(uint256 gameId) external {
        require(gameId < games.length, "This game does not exist");
        require(games[gameId].owner != msg.sender, "You cannot join your own game");
        require(games[gameId].opponent == address(0), "This game is already full");
        require(games[gameId].gameState == GameState.OnGoing, "This game is already finished");

        Game storage game = games[gameId];
        game.opponent = msg.sender;

        emit JoinGame(gameId, msg.sender);
    }

    function _checkWinner(uint8[9] storage board, uint8 square) internal view returns (GameState) {
        for (uint8 i = 0; i < 3; i++) {
            // vertical checks
            if ((board[i] == square && board[i + 3] == square && board[i + 6] == square) ||
                // horizontal checks
                (board[i * 3] == square && board[i * 3 + 1] == square && board[i * 3 + 2] == square)) {
                return GameState.HasWinner;
            }
        }

        // major diagonal
        if ((board[0] == square && board[4] == square && board[8] == square) ||
            // minor diagonal
            (board[3] == square && board[4] == square && board[6] == square)) {
            return GameState.HasWinner;
        }

        uint8 j = 0;
        for (uint8 i = 0; i < 9; i++) // TODO: to refactor don't want to do two loops
            if (board[i] != SQUARE_NONE)
                j++;
        return j == 9 ? GameState.Draw : GameState.OnGoing;
    }

    function play(uint256 gameId, uint8 position) external {
        Game storage game = games[gameId];
        require(game.opponent != address(0), "You don't have any opponent");
        require(game.board[position] == SQUARE_NONE, "This position is already taken");
        require(game.gameState == GameState.OnGoing, "This game is already finished");
        require(game.isOwnerTurn == (msg.sender == game.owner), "It is not your turn");

        uint8 playerSquare = game.isOwnerTurn ? SQUARE_OWNER : SQUARE_OPPONENT;
        game.board[position] = game.isOwnerTurn ? SQUARE_OWNER : SQUARE_OPPONENT;
        game.isOwnerTurn = !game.isOwnerTurn;
        game.gameState = _checkWinner(game.board, playerSquare);
        if (game.gameState == GameState.HasWinner)
            game.winner = msg.sender;
    }

    function getGame(uint256 gameId) external view returns (Game memory) {
        require(gameId < games.length, "This game does not exist");
        return games[gameId];
    }

    function getGamesCount() external view returns (uint256) {
        return games.length;
    }

    function getGames() external view returns (Game[] memory) {
        return games;
    }

    fallback() external {
    }
}
