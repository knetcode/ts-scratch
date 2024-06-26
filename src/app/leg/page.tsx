"use client";

import { useEffect, useRef } from "react";

type LegResult = "" | "combination" | "long" | "slightlyLong" | "short" | "slightlyShort" | "balanced" | "unknown";

type TestResult = {
  bodySplitRatio: number;
  upperLowerDiff: number;
  upperBodyLength: number;
  legFull: number;
  height: number;
  waistHipRatio: number;
  waistSize: number;
  hipLow: number;
  lineNumber: number;
  expected: LegResult;
};

// function getUpperBodyLength(height: number, legLength: number): number {
//   return Number((height - legLength).toFixed(6));
// }

// function getWaistHipRatio(waistSize: number, hipSizeLow: number): number {
//   return Number((waistSize / hipSizeLow).toFixed(6));
// }

// function getBodySplitRatio(upperBodyLength: number, legLength: number): number {
//   return Number((upperBodyLength / legLength).toFixed(6));
// }

// function getBodyDifference(upperBodyLength: number, legLength: number): number {
//   return Number((upperBodyLength - legLength).toFixed(6));
// }

// const ogData = [
//   { height: 157.0, waistSize: 83.0, hipLow: 113.0, legFull: 82.0, expected: "long", lineNumber: 98 },
//   { height: 163.5, waistSize: 86.0, hipLow: 108.0, legFull: 75.5, expected: "long", lineNumber: 2 },
//   { height: 165.0, waistSize: 77.5, hipLow: 103.0, legFull: 83.0, expected: "long", lineNumber: 23 },
//   { height: 168.0, waistSize: 76.5, hipLow: 94.0, legFull: 72.5, expected: "long", lineNumber: 119 },
//   { height: 168.0, waistSize: 90.0, hipLow: 105.0, legFull: 76.0, expected: "long", lineNumber: 3 },
//   { height: 167.64, waistSize: 78.74, hipLow: 91.4, legFull: 85.0, expected: "long", lineNumber: 126 },
//   { height: 170.0, waistSize: 83.0, hipLow: 95.0, legFull: 83.0, expected: "long", lineNumber: 88 },
//   { height: 172.0, waistSize: 105.4, hipLow: 137.7, legFull: 80.0, expected: "long", lineNumber: 93 },
//   { height: 175.0, waistSize: 73.0, hipLow: 99.0, legFull: 85.0, expected: "long", lineNumber: 34 },
//   { height: 157.0, waistSize: 69.5, hipLow: 97.0, legFull: 71.6, expected: "slightlyLong", lineNumber: 124 },
//   { height: 157.48, waistSize: 83.3, hipLow: 106.0, legFull: 76.6, expected: "slightlyLong", lineNumber: 18 },
//   { height: 165.0, waistSize: 74.0, hipLow: 106.0, legFull: 72.0, expected: "slightlyLong", lineNumber: 17 },
//   { height: 165.0, waistSize: 74.3, hipLow: 96.0, legFull: 81.0, expected: "slightlyLong", lineNumber: 16 },
//   { height: 167.6, waistSize: 76.75, hipLow: 99.0, legFull: 82.0, expected: "slightlyLong", lineNumber: 19 },
//   { height: 168.0, waistSize: 69.0, hipLow: 107.5, legFull: 78.3, expected: "slightlyLong", lineNumber: 120 },
//   { height: 168.0, waistSize: 86.6, hipLow: 106.0, legFull: 80.0, expected: "slightlyLong", lineNumber: 79 },
//   { height: 170.0, waistSize: 79.0, hipLow: 100.0, legFull: 82.5, expected: "slightlyLong", lineNumber: 122 },
//   { height: 173.0, waistSize: 96.2, hipLow: 119.5, legFull: 82.0, expected: "slightlyLong", lineNumber: 14 },
//   { height: 152.0, waistSize: 72.0, hipLow: 92.5, legFull: 73.0, expected: "balanced", lineNumber: 121 },
//   { height: 163.0, waistSize: 81.7, hipLow: 100.4, legFull: 79.5, expected: "balanced", lineNumber: 9 },
//   { height: 164.0, waistSize: 69.5, hipLow: 93.0, legFull: 79.2, expected: "balanced", lineNumber: 123 },
//   { height: 168.0, waistSize: 94.0, hipLow: 93.0, legFull: 81.0, expected: "balanced", lineNumber: 15 },
//   { height: 163.0, waistSize: 81.0, hipLow: 117.0, legFull: 76.5, expected: "balanced", lineNumber: 101 },
//   { height: 169.0, waistSize: 75.0, hipLow: 102.0, legFull: 81.0, expected: "slightlyShort", lineNumber: 38 },
//   { height: 164.0, waistSize: 68.0, hipLow: 96.0, legFull: 78.0, expected: "short", lineNumber: 24 },
//   { height: 173.0, waistSize: 76.0, hipLow: 92.0, legFull: 80.5, expected: "short", lineNumber: 11 },
//   { height: 160.0, waistSize: 81.28, hipLow: 93.98, legFull: 78.74, expected: "combination", lineNumber: 114 },
//   { height: 152.0, waistSize: 99.5, hipLow: 129.0, legFull: 72.0, expected: "combination", lineNumber: 60 },
//   { height: 177.0, waistSize: 90.0, hipLow: 100.0, legFull: 79.0, expected: "combination", lineNumber: 64 },
// ];

// const ogDataMapped = ogData.map((t) => {
//   return {
//     bodySplitRatio: getBodySplitRatio(getUpperBodyLength(t.height, t.legFull), t.legFull),
//     upperLowerDiff: getBodyDifference(getUpperBodyLength(t.height, t.legFull), t.legFull),
//     upperBodyLength: getUpperBodyLength(t.height, t.legFull),
//     legFull: t.legFull,
//     height: t.height,
//     waistHipRatio: getWaistHipRatio(t.waistSize, t.hipLow),
//     waistSize: t.waistSize,
//     hipLow: t.hipLow,
//     lineNumber: t.lineNumber,
//     expected: t.expected,
//   };
// });

// const testDataSorted = ogDataMapped.sort((a, b) => {
//   if (a.bodySplitRatio !== b.bodySplitRatio) return b.bodySplitRatio - a.bodySplitRatio;
//   if (a.upperLowerDiff !== b.upperLowerDiff) return b.upperLowerDiff - a.upperLowerDiff;
//   if (a.upperBodyLength !== b.upperBodyLength) return b.upperBodyLength - a.upperBodyLength;
//   if (a.legFull !== b.legFull) return b.legFull - a.legFull;
//   if (a.height !== b.height) return b.height - a.height;
//   if (a.waistHipRatio !== b.waistHipRatio) return b.waistHipRatio - a.waistHipRatio;
//   if (a.waistSize !== b.waistSize) return b.waistSize - a.waistSize;
//   if (a.hipLow !== b.hipLow) return b.hipLow - a.hipLow;
//   return b.lineNumber - a.lineNumber;
// });

// console.log("||||| NEW DATA |||||");
// console.log(testDataSorted);
// console.log("||||| NEW DATA |||||");

const testData: TestResult[] = [
  {
    bodySplitRatio: 1.317241,
    upperLowerDiff: 23,
    upperBodyLength: 95.5,
    legFull: 72.5,
    height: 168,
    waistHipRatio: 0.81383,
    waistSize: 76.5,
    hipLow: 94,
    lineNumber: 119,
    expected: "long",
  },
  {
    bodySplitRatio: 1.291667,
    upperLowerDiff: 21,
    upperBodyLength: 93,
    legFull: 72,
    height: 165,
    waistHipRatio: 0.698113,
    waistSize: 74,
    hipLow: 106,
    lineNumber: 17,
    expected: "slightlyLong",
  },
  {
    bodySplitRatio: 1.240506,
    upperLowerDiff: 19,
    upperBodyLength: 98,
    legFull: 79,
    height: 177,
    waistHipRatio: 0.9,
    waistSize: 90,
    hipLow: 100,
    lineNumber: 64,
    expected: "combination",
  },
  {
    bodySplitRatio: 1.210526,
    upperLowerDiff: 16,
    upperBodyLength: 92,
    legFull: 76,
    height: 168,
    waistHipRatio: 0.857143,
    waistSize: 90,
    hipLow: 105,
    lineNumber: 3,
    expected: "long",
  },
  {
    bodySplitRatio: 1.192737,
    upperLowerDiff: 13.8,
    upperBodyLength: 85.4,
    legFull: 71.6,
    height: 157,
    waistHipRatio: 0.716495,
    waistSize: 69.5,
    hipLow: 97,
    lineNumber: 124,
    expected: "slightlyLong",
  },
  {
    bodySplitRatio: 1.165563,
    upperLowerDiff: 12.5,
    upperBodyLength: 88,
    legFull: 75.5,
    height: 163.5,
    waistHipRatio: 0.796296,
    waistSize: 86,
    hipLow: 108,
    lineNumber: 2,
    expected: "long",
  },
  {
    bodySplitRatio: 1.15,
    upperLowerDiff: 12,
    upperBodyLength: 92,
    legFull: 80,
    height: 172,
    waistHipRatio: 0.765432,
    waistSize: 105.4,
    hipLow: 137.7,
    lineNumber: 93,
    expected: "long",
  },
  {
    bodySplitRatio: 1.149068,
    upperLowerDiff: 12,
    upperBodyLength: 92.5,
    legFull: 80.5,
    height: 173,
    waistHipRatio: 0.826087,
    waistSize: 76,
    hipLow: 92,
    lineNumber: 11,
    expected: "short",
  },
  {
    bodySplitRatio: 1.145594,
    upperLowerDiff: 11.4,
    upperBodyLength: 89.7,
    legFull: 78.3,
    height: 168,
    waistHipRatio: 0.64186,
    waistSize: 69,
    hipLow: 107.5,
    lineNumber: 120,
    expected: "slightlyLong",
  },
  {
    bodySplitRatio: 1.130719,
    upperLowerDiff: 10,
    upperBodyLength: 86.5,
    legFull: 76.5,
    height: 163,
    waistHipRatio: 0.692308,
    waistSize: 81,
    hipLow: 117,
    lineNumber: 101,
    expected: "balanced",
  },
  {
    bodySplitRatio: 1.111111,
    upperLowerDiff: 8,
    upperBodyLength: 80,
    legFull: 72,
    height: 152,
    waistHipRatio: 0.771318,
    waistSize: 99.5,
    hipLow: 129,
    lineNumber: 60,
    expected: "combination",
  },
  {
    bodySplitRatio: 1.109756,
    upperLowerDiff: 9,
    upperBodyLength: 91,
    legFull: 82,
    height: 173,
    waistHipRatio: 0.805021,
    waistSize: 96.2,
    hipLow: 119.5,
    lineNumber: 14,
    expected: "slightlyLong",
  },
  {
    bodySplitRatio: 1.102564,
    upperLowerDiff: 8,
    upperBodyLength: 86,
    legFull: 78,
    height: 164,
    waistHipRatio: 0.708333,
    waistSize: 68,
    hipLow: 96,
    lineNumber: 24,
    expected: "short",
  },
  {
    bodySplitRatio: 1.1,
    upperLowerDiff: 8,
    upperBodyLength: 88,
    legFull: 80,
    height: 168,
    waistHipRatio: 0.816981,
    waistSize: 86.6,
    hipLow: 106,
    lineNumber: 79,
    expected: "slightlyLong",
  },
  {
    bodySplitRatio: 1.08642,
    upperLowerDiff: 7,
    upperBodyLength: 88,
    legFull: 81,
    height: 169,
    waistHipRatio: 0.735294,
    waistSize: 75,
    hipLow: 102,
    lineNumber: 38,
    expected: "slightlyShort",
  },
  {
    bodySplitRatio: 1.082192,
    upperLowerDiff: 6,
    upperBodyLength: 79,
    legFull: 73,
    height: 152,
    waistHipRatio: 0.778378,
    waistSize: 72,
    hipLow: 92.5,
    lineNumber: 121,
    expected: "balanced",
  },
  {
    bodySplitRatio: 1.074074,
    upperLowerDiff: 6,
    upperBodyLength: 87,
    legFull: 81,
    height: 168,
    waistHipRatio: 1.010753,
    waistSize: 94,
    hipLow: 93,
    lineNumber: 15,
    expected: "balanced",
  },
  {
    bodySplitRatio: 1.070707,
    upperLowerDiff: 5.6,
    upperBodyLength: 84.8,
    legFull: 79.2,
    height: 164,
    waistHipRatio: 0.747312,
    waistSize: 69.5,
    hipLow: 93,
    lineNumber: 123,
    expected: "balanced",
  },
  {
    bodySplitRatio: 1.060606,
    upperLowerDiff: 5,
    upperBodyLength: 87.5,
    legFull: 82.5,
    height: 170,
    waistHipRatio: 0.79,
    waistSize: 79,
    hipLow: 100,
    lineNumber: 122,
    expected: "slightlyLong",
  },
  {
    bodySplitRatio: 1.058824,
    upperLowerDiff: 5,
    upperBodyLength: 90,
    legFull: 85,
    height: 175,
    waistHipRatio: 0.737374,
    waistSize: 73,
    hipLow: 99,
    lineNumber: 34,
    expected: "long",
  },
  {
    bodySplitRatio: 1.055875,
    upperLowerDiff: 4.28,
    upperBodyLength: 80.88,
    legFull: 76.6,
    height: 157.48,
    waistHipRatio: 0.785849,
    waistSize: 83.3,
    hipLow: 106,
    lineNumber: 18,
    expected: "slightlyLong",
  },
  {
    bodySplitRatio: 1.050314,
    upperLowerDiff: 4,
    upperBodyLength: 83.5,
    legFull: 79.5,
    height: 163,
    waistHipRatio: 0.813745,
    waistSize: 81.7,
    hipLow: 100.4,
    lineNumber: 9,
    expected: "balanced",
  },
  {
    bodySplitRatio: 1.048193,
    upperLowerDiff: 4,
    upperBodyLength: 87,
    legFull: 83,
    height: 170,
    waistHipRatio: 0.873684,
    waistSize: 83,
    hipLow: 95,
    lineNumber: 88,
    expected: "long",
  },
  {
    bodySplitRatio: 1.043902,
    upperLowerDiff: 3.6,
    upperBodyLength: 85.6,
    legFull: 82,
    height: 167.6,
    waistHipRatio: 0.775253,
    waistSize: 76.75,
    hipLow: 99,
    lineNumber: 19,
    expected: "slightlyLong",
  },
  {
    bodySplitRatio: 1.037037,
    upperLowerDiff: 3,
    upperBodyLength: 84,
    legFull: 81,
    height: 165,
    waistHipRatio: 0.773958,
    waistSize: 74.3,
    hipLow: 96,
    lineNumber: 16,
    expected: "slightlyLong",
  },
  {
    bodySplitRatio: 1.032004,
    upperLowerDiff: 2.52,
    upperBodyLength: 81.26,
    legFull: 78.74,
    height: 160,
    waistHipRatio: 0.864865,
    waistSize: 81.28,
    hipLow: 93.98,
    lineNumber: 114,
    expected: "combination",
  },
  {
    bodySplitRatio: 0.987952,
    upperLowerDiff: -1,
    upperBodyLength: 82,
    legFull: 83,
    height: 165,
    waistHipRatio: 0.752427,
    waistSize: 77.5,
    hipLow: 103,
    lineNumber: 23,
    expected: "long",
  },
  {
    bodySplitRatio: 0.972235,
    upperLowerDiff: -2.36,
    upperBodyLength: 82.64,
    legFull: 85,
    height: 167.64,
    waistHipRatio: 0.861488,
    waistSize: 78.74,
    hipLow: 91.4,
    lineNumber: 126,
    expected: "long",
  },
  {
    bodySplitRatio: 0.914634,
    upperLowerDiff: -7,
    upperBodyLength: 75,
    legFull: 82,
    height: 157,
    waistHipRatio: 0.734513,
    waistSize: 83,
    hipLow: 113,
    lineNumber: 98,
    expected: "long",
  },
];

function calc(t: TestResult): LegResult {
  if (t.bodySplitRatio >= 1.15) {
    return "long";
  }
  if (t.bodySplitRatio >= 1.04) {
    return "slightlyLong";
  }
  if (t.bodySplitRatio >= 0.98) {
    return "balanced";
  }
  if (t.bodySplitRatio > 0.9) {
    return "slightlyShort";
  }
  if (t.bodySplitRatio > 0.8) {
    return "short";
  }

  return "unknown";
}

// const lookingFor = "";
const lookingFor = "long";
// const lookingFor = "slightlyLong";
// const lookingFor = "slightlyShort";
// const lookingFor = "short";
// const lookingFor = "balanced";
// const lookingFor = "combination";

function DataCard({ t }: { t: TestResult }) {
  return (
    <div
      className={`
        w-64 h-min bg-slate-800 p-2 
        ${lookingFor === t.expected ? "border-4 border-pink-500" : ""}
        ${lookingFor === calc(t) ? "ring-4 ring-blue-500" : ""}
      `}
    >
      <div className="flex flex-row justify-between items-center">
        <p>bodySplitRatio:</p>
        <p>{t.bodySplitRatio.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>upperLowerDiff:</p>
        <p>{t.upperLowerDiff.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>upperBodyLength:</p>
        <p>{t.upperBodyLength.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>legFull:</p>
        <p>{t.legFull.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>height:</p>
        <p>{t.height.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>waistHipRatio:</p>
        <p>{t.waistHipRatio.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>waistSize:</p>
        <p>{t.waistSize.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>hipLow:</p>
        <p>{t.hipLow.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Expected:</p>
        <p className={t.expected === lookingFor ? "text-pink-500" : ""}>{t.expected}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Calc:</p>
        <p className={calc(t) === "unknown" ? "text-yellow-500" : ""}>{calc(t)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Match:</p>
        {calc(t) === t.expected ? <p className="text-green-500">YES</p> : <p className="text-red-500">NO</p>}
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
          <div className="flex flex-1 flex-row flex-wrap items-start justify-start gap-4">
            {testData.map((t, i) => {
              if (calc(t) === t.expected) {
                testsPassed.current = testsPassed.current + 1;
                return <DataCard t={t} key={i} />;
              }
            })}
          </div>
          <div className="flex flex-1 flex-row flex-wrap items-start justify-start gap-4">
            {testData.map((t, i) => {
              if (calc(t) !== t.expected) {
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
