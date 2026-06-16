"use client"
import React, { useState, useId } from 'react'
import Tower from './Tower'
import GameHeader from './GameHeader'
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

type DiskDragData = {
  diskValue: number;
  fromTowerIndex: number;
};

type TowerDropData = {
  towerIndex: number;
};

export default function HanoiGame() {
  const [disks, setDisks] = useState<number>(3)
  const [towers, setTower] = useState<number[][]>([[3,2,1],[],[]])
  const [moves, setMoves] = useState<number>(0)

  const dndContextId = useId();
  
  function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;

  if (!over) {
    return;
  }

  const activeData = active.data.current as DiskDragData | undefined;
  const overData = over.data.current as TowerDropData | undefined;

  if (!activeData || !overData) {
    return;
  }

  const { diskValue, fromTowerIndex } = activeData;
  const { towerIndex: toTowerIndex } = overData;

  if (fromTowerIndex === toTowerIndex) {
    return;
  }

  setTower((currentTowers) => {
    const newTowers = currentTowers.map((tower) => [...tower]);

    const fromTower = newTowers[fromTowerIndex];
    const toTower = newTowers[toTowerIndex];

    const topDiskFromSource = fromTower[fromTower.length - 1];

    if (topDiskFromSource !== diskValue) {
      return currentTowers;
    }

    const topDiskFromTarget = toTower[toTower.length - 1];

    const canMove =
      topDiskFromTarget === undefined || diskValue < topDiskFromTarget;

    if (!canMove) {
      return currentTowers;
    }

    fromTower.pop();
    toTower.push(diskValue);
    setMoves(moves+1)

    return newTowers;
  });
}

  const initialTower = (amount: number) => {
    const newTower: number[] = []
    for(let i=amount; i>=1;i--){
      newTower.push(i)
    }
    return [newTower,[],[]];
  }

  const resetGame = () => {
    const newTower: number[] = []
    for(let i=disks; i>=1;i--){
      newTower.push(i)
    }
    setTower([newTower,[],[]])
    setMoves(0)
  }

  function increaseDiskCount() {
  if (disks < 8) {
    const newDiskAmount = disks + 1;

    setDisks(newDiskAmount);
    setTower(initialTower(newDiskAmount));
    setMoves(0)
    }
  }

  function decreaseDiskCount() {
   if (disks > 3) {
      const newDiskAmount = disks - 1;

      setDisks(newDiskAmount);
      setTower(initialTower(newDiskAmount));
      setMoves(0)

    }
  }

  const isSolved = towers[2].length === disks;

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
          <div className='rounded-2xl border border-white/10 bg-white/10 p-6 shadow-lg'>
            <GameHeader disks={disks} increaseCount={increaseDiskCount} decreaseCount={decreaseDiskCount} totalMoves={moves} resetGame={resetGame} solved={isSolved}/>

          </div>
          <DndContext onDragEnd={handleDragEnd} id={dndContextId}>
            <section className= {`w-[90%] bg-slate-400 min-h-125 border mx-auto mt-6 grid grid-cols-3 gap-4 rounded-3xl border border-white/10 bg-slate-800/80 p-8 shadow-2xl
              ${isSolved ? "border-green-400 shadow-green-500/30 ring-2 ring-green-400 ": "border-white/10"}`}>
              {towers.map((tower, index) => (
                <Tower key={index} towerIndex={index} disks={tower} />
              ))}
            </section>
          </DndContext>
      </main>
    </>
)}
