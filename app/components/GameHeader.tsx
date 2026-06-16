import React from "react";

type GameHeaderProps = {
  disks: number;
  totalMoves: number;
  increaseCount: () => void;
  decreaseCount: () => void;
  resetGame: () => void;
  solved: boolean;
};

export default function GameHeader({
  disks,
  increaseCount,
  decreaseCount,
  totalMoves,
  resetGame,
  solved,
}: GameHeaderProps) {
  return (
    <>
      <div className="grid grid-cols-6 gap-4 ">
        <div className="col-span-2 text-center">
          <p className="text-3xl">Welcome Player!</p>
        </div>

        <div className="col-span-5 col-start-3 text-center">
          <p className="text-xl">
            Objective: Move all disks from tower 1 to tower 3
          </p>
        </div>

        <div className="col-start-1 col-end-3 flex justify-evenly text-center">
          <p className="text-xl">Number of disks</p>
          <p className="text-xl">{disks}</p>

          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={disks === 8}
            onClick={increaseCount}
          >
            +
          </button>

          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={disks === 3}
            onClick={decreaseCount}
          >
            -
          </button>
        </div>
        {solved && (
          <div>
            <p className="rounded-md bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-center">Congratulations, You Won!</p>
          </div>
        )}

        <div className="col-span-2 col-end-7">
          <div className="flex justify-evenly">
            <p className="text-xl">
              Total Moves = <span>{totalMoves}</span>
            </p>
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              onClick={resetGame}>
              Reset Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
