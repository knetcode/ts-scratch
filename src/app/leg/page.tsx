"use client";

import { useEffect, useRef } from "react";

type LegResult = "" | "combination" | "long" | "slightlyLong" | "short" | "slightlyShort" | "balanced";

type TestLeg = {
  lineNumber: number;
  height: number;
  legFull: number;
  waistSize: number;
  hipLow: number;
  expected: LegResult;
};

const testData: TestLeg[] = [
  { height: 157.0, waistSize: 83.0, hipLow: 113.0, legFull: 82.0, expected: "long", lineNumber: 98 },
  { height: 163.5, waistSize: 86.0, hipLow: 108.0, legFull: 75.5, expected: "long", lineNumber: 2 },
  { height: 165.0, waistSize: 77.5, hipLow: 103.0, legFull: 83.0, expected: "long", lineNumber: 23 },
  { height: 168.0, waistSize: 76.5, hipLow: 94.0, legFull: 72.5, expected: "long", lineNumber: 119 },
  { height: 168.0, waistSize: 90.0, hipLow: 105.0, legFull: 76.0, expected: "long", lineNumber: 3 },
  { height: 167.64, waistSize: 78.74, hipLow: 91.4, legFull: 85.0, expected: "long", lineNumber: 126 },
  { height: 170.0, waistSize: 83.0, hipLow: 95.0, legFull: 83.0, expected: "long", lineNumber: 88 },
  { height: 172.0, waistSize: 105.4, hipLow: 137.7, legFull: 80.0, expected: "long", lineNumber: 93 },
  { height: 175.0, waistSize: 73.0, hipLow: 99.0, legFull: 85.0, expected: "long", lineNumber: 34 },
  { height: 157.0, waistSize: 69.5, hipLow: 97.0, legFull: 71.6, expected: "slightlyLong", lineNumber: 124 },
  { height: 157.48, waistSize: 83.3, hipLow: 106.0, legFull: 76.6, expected: "slightlyLong", lineNumber: 18 },
  { height: 165.0, waistSize: 74.0, hipLow: 106.0, legFull: 72.0, expected: "slightlyLong", lineNumber: 17 },
  { height: 165.0, waistSize: 74.3, hipLow: 96.0, legFull: 81.0, expected: "slightlyLong", lineNumber: 16 },
  { height: 167.6, waistSize: 76.75, hipLow: 99.0, legFull: 82.0, expected: "slightlyLong", lineNumber: 19 },
  { height: 168.0, waistSize: 69.0, hipLow: 107.5, legFull: 78.3, expected: "slightlyLong", lineNumber: 120 },
  { height: 168.0, waistSize: 86.6, hipLow: 106.0, legFull: 80.0, expected: "slightlyLong", lineNumber: 79 },
  { height: 170.0, waistSize: 79.0, hipLow: 100.0, legFull: 82.5, expected: "slightlyLong", lineNumber: 122 },
  { height: 173.0, waistSize: 96.2, hipLow: 119.5, legFull: 82.0, expected: "slightlyLong", lineNumber: 14 },
  { height: 152.0, waistSize: 72.0, hipLow: 92.5, legFull: 73.0, expected: "balanced", lineNumber: 121 },
  { height: 163.0, waistSize: 81.7, hipLow: 100.4, legFull: 79.5, expected: "balanced", lineNumber: 9 },
  { height: 164.0, waistSize: 69.5, hipLow: 93.0, legFull: 79.2, expected: "balanced", lineNumber: 123 },
  { height: 168.0, waistSize: 94.0, hipLow: 93.0, legFull: 81.0, expected: "balanced", lineNumber: 15 },
  { height: 163.0, waistSize: 81.0, hipLow: 117.0, legFull: 76.5, expected: "slightlyShort", lineNumber: 101 },
  { height: 169.0, waistSize: 75.0, hipLow: 102.0, legFull: 81.0, expected: "slightlyShort", lineNumber: 38 },
  { height: 164.0, waistSize: 68.0, hipLow: 96.0, legFull: 78.0, expected: "short", lineNumber: 24 },
  { height: 173.0, waistSize: 76.0, hipLow: 92.0, legFull: 80.5, expected: "short", lineNumber: 11 },
  { height: 152.0, waistSize: 99.5, hipLow: 129.0, legFull: 72.0, expected: "combination", lineNumber: 60 },
  { height: 160.0, waistSize: 81.28, hipLow: 93.98, legFull: 78.74, expected: "combination", lineNumber: 114 },
  { height: 177.0, waistSize: 90.0, hipLow: 100.0, legFull: 79.0, expected: "combination", lineNumber: 64 },
];

function calc(height: number, waistSize: number, hipSizeLow: number, legLength: number): LegResult {
  const lowerBody = legLength / height;
  const upperBody = 1 - lowerBody;
  const bodyRatio = upperBody / lowerBody;
  const waistHipRatio = waistSize / hipSizeLow;

  if (waistHipRatio >= 0.86 && bodyRatio >= 1.075) {
    return "combination";
  }

  if (bodyRatio <= 1.025) {
    return "long";
  }

  if (bodyRatio <= 1.05) {
    return "slightlyLong";
  }

  if (bodyRatio >= 1.075) {
    return "slightlyShort";
  }

  if (bodyRatio >= 1.1) {
    return "short";
  }

  return "balanced";
}

// const lookingFor = "long";
// const lookingFor = "slightlyLong";
const lookingFor = "slightlyShort";
// const lookingFor = "short";
// const lookingFor = "combination";
// const lookingFor = "balanced";

function DataCard({ t }: { t: TestLeg }) {
  const lowerBody = t.legFull / t.height;
  const upperBody = 1 - lowerBody;
  const bodyRatio = upperBody / lowerBody;
  const waistHipRatio = t.waistSize / t.hipLow;
  return (
    <div className={`w-64 h-min bg-slate-800 p-2 ${lookingFor === t.expected ? "border-2 border-pink-500" : ""}`}>
      <div className="flex flex-row justify-between items-center">
        <p>Height:</p>
        <p>{t.height}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Waist:</p>
        <p>{t.waistSize}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Hip:</p>
        <p>{t.hipLow}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Leg:</p>
        <p>{t.legFull}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>LowerBody Ratio:</p>
        <p>{lowerBody.toFixed(6)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>UpperBody Ratio:</p>
        <p>{upperBody.toFixed(6)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Body Ratio:</p>
        <p>{bodyRatio.toFixed(6)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>WaistHip Ratio:</p>
        <p>{waistHipRatio.toFixed(6)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Expected:</p>
        <p className={t.expected === lookingFor ? "text-pink-500" : ""}>{t.expected}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Calc:</p>
        <p>{calc(t.height, t.waistSize, t.hipLow, t.legFull)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Match:</p>
        {calc(t.height, t.waistSize, t.hipLow, t.legFull) === t.expected ? (
          <p className="text-green-500">YES</p>
        ) : (
          <p className="text-red-500">NO</p>
        )}
      </div>
    </div>
  );
}

export default function LegPage() {
  const testsPassed = useRef(0);
  const testsFailed = useRef(0);

  useEffect(() => {
    testsPassed.current = 0;
    testsFailed.current = 0;

    return () => {
      testsPassed.current = 0;
      testsFailed.current = 0;
    };
  }, []);

  return (
    <div className="p-2 flex flex-col gap-2">
      <div>
        <h1>Tests Passed: {testsPassed.current}</h1>
        <h1>Tests Failed: {testsFailed.current}</h1>
        <h1>Tests TOTAL: {testData.length}</h1>
        <div className="flex flex-row gap-2 items-start justify-start">
          <div className="flex flex-1 flex-row flex-wrap items-start justify-start gap-2">
            {testData.map((t, i) => {
              if (calc(t.height, t.waistSize, t.hipLow, t.legFull) === t.expected) {
                testsPassed.current = testsPassed.current + 1;
                return <DataCard t={t} key={i} />;
              }
            })}
          </div>
          <div className="flex flex-1 flex-row flex-wrap items-start justify-start gap-2">
            {testData.map((t, i) => {
              if (calc(t.height, t.waistSize, t.hipLow, t.legFull) !== t.expected) {
                testsFailed.current = testsFailed.current + 1;
                return <DataCard t={t} key={i} />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
