// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TicTacToe {
    Game[] public games;
    uint256 private gameCounterId = 0;

    enum GameState {
        Draw,
        OwnerWon,
        OpponentWon,
        NotFinished
    }

    enum SquareType {
        None,
        Owner,
        Opponent
    }

    struct Game {
        address owner;
        address opponent;
        byte[9] board;
        bool isOwnerTurn;
        GameState gameState;
    }

    function mintGame() public {
        uint8[9] memory board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (uint8 i = 0; i < board.length; i++) {
            board[i] = SquareType.None;
        }
        Game memory game = Game(msg.sender, address(0), board, true, GameState.NotFinished);
        games.push(game);
    }

    function join(uint256 gameId) public {
        require(gameId < games.length, "This game does not exist");
        require(games[gameId].owner != msg.sender, "You cannot join your own game");
        require(games[gameId].opponent == address(0), "This game is already full");
        require(games[gameId].gameState == GameState.NotFinished, "This game is already finished");

        Game storage game = games[gameId];
        game.opponent = msg.sender;
    }

    function checkWinner(uint8[] board) {
        int[] aRow = new int[3];
        int[] aCol = new int[3];
        int[] bRow = new int[3];
        int[] bCol = new int[3];
        int aD1 = 0;
        int aD2 = 0;
        int bD1 = 0;
        int bD2 = 0;
        for (int i = 0; i < board.length; ++i) {
            int r = board[i][0];
            int c = board[i][1];
            if (i % 2 == 1) {
                if (++bRow[r] == 3 || ++bCol[c] == 3 || r == c && ++bD1 == 3 || r + c == 2 && ++bD2 == 3)
                    return GameState.OpponentWon;
            } else {
                if (++aRow[r] == 3 || ++aCol[c] == 3 || r == c && ++aD1 == 3 || r + c == 2 && ++aD2 == 3)
                    return GameState.OwnerWon;
            }
        }
        return board.length == 9 ? GameState.Draw : GameState.NotFinished;
    }

    function play(uint256 gameId, uint8 position) public {
        Game storage game = games[gameId];
        require(game.opponent == msg.sender, "You are not allowed to play this game");
        require(game.board[position] != SquareType.None, "This position is already taken");
        require(game.gameState == GameState.NotFinished, "This game is already finished");
        require(game.isOwnerTurn == (msg.sender == game.owner), "It is not your turn");

        game.board[position] = game.isOwnerTurn ? SquareType.Owner : SquareType.Opponent;
        game.isOwnerTurn = !game.isOwnerTurn;

        game.gameState = checkWinner(game.board);
    }

    function getGame(uint256 gameId) public view returns (Game memory) {
        return games[gameId];
    }
}
