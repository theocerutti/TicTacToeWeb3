import React from "react";
import TicTacToe from "../components/TicTacToe";

const Home = () => {
  const provider = useProvider()

  return (
    <div>
      <TicTacToe gameId={0}/>
    </div>
  );
};

export default Home;