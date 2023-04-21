import { BigNumber } from 'ethers';

export enum GameState {
  WaitOpponent,
  Draw,
  HasWinner,
  OnGoing
}

export enum SquareType {
  SQUARE_NONE = 0,
  SQUARE_OWNER = 1,
  SQUARE_OPPONENT = 2
}

export type Game = {
  owner: string;
  opponent: string;
  winner: string;
  board: SquareType[];
  isOwnerTurn: boolean;
  gameState: GameState;
  id: BigNumber;
};
