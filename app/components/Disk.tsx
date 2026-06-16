"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";

type DiskProps = {
  value: number;
  fromTowerIndex: number;
  isTopDisk: boolean;
};

export default function Disk({ value, fromTowerIndex, isTopDisk }: DiskProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `disk-${value}`,
      data: {
        diskValue: value,
        fromTowerIndex,
      },
      disabled: !isTopDisk,
    });

  const widthPercent = 20 + value * 5;

  const style = {
    width: `${widthPercent}%`,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`z-10 mb-1 rounded-md h-8 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md border border-white/20 ${
         isTopDisk ? "cursor-grab active:cursor-grabbing" : "cursor-not-allowed"
      }`}
    />
  );
}