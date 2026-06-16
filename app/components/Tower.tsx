"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import Disk from "./Disk";

type TowerProps = {
  towerIndex: number;
  disks: number[];
};

export default function Tower({ towerIndex, disks }: TowerProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `tower-${towerIndex}`,
    data: {
      towerIndex,
    },
  });

  const topDisk = disks[disks.length - 1];

  return (
    <div
      ref={setNodeRef}
      className={`relative flex flex-col justify-end items-center transition rounded-2xl border border-white/10 bg-slate-900/60 ${
        isOver ? "ring-2 ring-cyan-400 bg-cyan-950/40" : ""
      }`}
    >
      <div className="absolute h-[65%] w-4 bg-black"></div>

      {[...disks].reverse().map((disk) => (
        <Disk
          key={disk}
          value={disk}
          fromTowerIndex={towerIndex}
          isTopDisk={disk === topDisk}
        />
      ))}

      <div className="h-3 w-[65%] bg-black"></div>
    </div>
  );
}