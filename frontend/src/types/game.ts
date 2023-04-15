import { BigNumber } from "ethers";

export enum GameState {
  Draw,
  HasWinner,
  OnGoing
}

export type Game = {
  owner: string;
  opponent: string;
  winner: string;
  board: number[];
  isOwnerTurn: boolean;
  gameState: GameState;
  id: BigNumber;
}
