/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useCallback } from "react";

const useConstrainedRanges = (initialValues) => {
  const [ranges, setRanges] = useState(initialValues);

  const setRange = useCallback((index, newValue) => {
    setRanges((prevRanges) => {
      const newRanges = [...prevRanges];
      const oldValue = newRanges[index];
      const oldSum = newRanges.reduce((acc, val) => acc + val, 0);
      const diff = newValue - oldValue;

      newRanges[index] = newValue;

      if (oldSum + diff !== 100) {
        const otherIndices = newRanges.reduce((acc, _, i) => (i !== index ? [...acc, i] : acc), []);

        const totalToAdjust = 100 - (oldSum + diff);
        let remainingAdjustment = totalToAdjust;

        for (let i of otherIndices) {
          if (otherIndices.length === 1) {
            newRanges[i] += remainingAdjustment;
          } else {
            const adjustment = Math.round(totalToAdjust / otherIndices.length);
            newRanges[i] += adjustment;
            remainingAdjustment -= adjustment;
          }
        }

        // Ensure no value goes below 0
        for (let i = 0; i < newRanges.length; i++) {
          if (newRanges[i] < 0) {
            const deficit = -newRanges[i];
            newRanges[i] = 0;
            // Distribute the deficit to other values
            for (let j of otherIndices.filter((x) => x !== i)) {
              newRanges[j] += Math.round(deficit / (otherIndices.length - 1));
            }
          }
        }

        // Final adjustment to ensure sum is exactly 100
        const finalSum = newRanges.reduce((acc, val) => acc + val, 0);
        if (finalSum !== 100) {
          const lastAdjustment = 100 - finalSum;
          const lastAdjustIndex = otherIndices.find((i) => newRanges[i] + lastAdjustment >= 0) ?? index;
          newRanges[lastAdjustIndex] += lastAdjustment;
        }
      }

      return newRanges;
    });
  }, []);

  return [ranges, setRange];
};

export default function Dna() {
  const [ranges, setRange] = useConstrainedRanges([33, 33, 34]);

  return (
    <div className="p-8">
      <div className="flex flex-col w-96 ">
        {ranges.map((range, index) => (
          <div key={index}>
            <input
              type="range"
              value={range}
              onChange={(e) => setRange(index, parseInt(e.target.value, 10))}
              min="0"
              max="100"
            />
            <span>{range}</span>
          </div>
        ))}
        {/* <div>Total: {ranges.reduce((sum, value) => sum + value, 0)}</div> */}
      </div>
      <div className="h-[1000px] w-96 bg-white relative text-black">
        <div>Green: Type 1</div>
        <div>Blue: Type 2</div>
        <div>Orange: Type 3</div>
        <img src="/front.png" className="absolute h-full" alt="front" />
        <div className="w-full bg-lime-500" style={{ height: `${ranges[0]}%` }}></div>
        <div className="w-full bg-cyan-500" style={{ height: `${ranges[1]}%` }}></div>
        <div className="w-full bg-amber-500" style={{ height: `${ranges[2]}%` }}></div>
      </div>
    </div>
  );
}
