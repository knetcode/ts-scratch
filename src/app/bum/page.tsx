"use client";

import { useEffect, useRef } from "react";

type BumResult = "" | "broad" | "flat" | "rounded" | "unknown";

type OgResult = { highHip: number; lowHip: number; expected: BumResult };

type TestResult = {
  hipRatio: number;
} & OgResult;

const ogData: OgResult[] = [
  { highHip: 107.3, lowHip: 108, expected: "broad" },
  { highHip: 102, lowHip: 105, expected: "flat" },
  { highHip: 96.5, lowHip: 98.2, expected: "rounded" },
  { highHip: 98.3, lowHip: 100.4, expected: "flat" },
  { highHip: 89, lowHip: 92, expected: "flat" },
  { highHip: 92, lowHip: 97.5, expected: "rounded" },
  { highHip: 116.6, lowHip: 119.5, expected: "broad" },
  { highHip: 94, lowHip: 93, expected: "flat" },
  { highHip: 85.7, lowHip: 96, expected: "rounded" },
  { highHip: 100.5, lowHip: 106, expected: "broad" },
  { highHip: 102.5, lowHip: 106, expected: "broad" },
  { highHip: 95.25, lowHip: 99, expected: "flat" },
  { highHip: 93, lowHip: 103, expected: "rounded" },
  { highHip: 84, lowHip: 96, expected: "broad" },
  { highHip: 93.5, lowHip: 98.5, expected: "rounded" },
  { highHip: 87, lowHip: 99, expected: "rounded" },
  { highHip: 93, lowHip: 102, expected: "rounded" },
  { highHip: 96.4, lowHip: 98.4, expected: "flat" },
  { highHip: 93, lowHip: 97, expected: "flat" },
  { highHip: 94, lowHip: 100, expected: "flat" },
  { highHip: 81, lowHip: 101.5, expected: "rounded" },
  { highHip: 131, lowHip: 129, expected: "broad" },
  { highHip: 92, lowHip: 104, expected: "broad" },
  { highHip: 102, lowHip: 100, expected: "flat" },
  { highHip: 91.6, lowHip: 96, expected: "flat" },
  { highHip: 106, lowHip: 106, expected: "flat" },
  { highHip: 106, lowHip: 105, expected: "rounded" },
  { highHip: 99, lowHip: 99, expected: "flat" },
  { highHip: 95, lowHip: 95, expected: "flat" },
  { highHip: 130.8, lowHip: 137.7, expected: "broad" },
  { highHip: 103, lowHip: 113, expected: "rounded" },
  { highHip: 108, lowHip: 117, expected: "broad" },
  { highHip: 120, lowHip: 119, expected: "broad" },
  { highHip: 86.36, lowHip: 96.5, expected: "rounded" },
  { highHip: 96.52, lowHip: 93.5, expected: "flat" },
  { highHip: 93, lowHip: 95, expected: "flat" },
  { highHip: 95.1, lowHip: 94, expected: "flat" },
  { highHip: 97.5, lowHip: 107.5, expected: "rounded" },
  { highHip: 90.5, lowHip: 92.5, expected: "flat" },
  { highHip: 96, lowHip: 100, expected: "broad" },
  { highHip: 89, lowHip: 93, expected: "flat" },
  { highHip: 87.4, lowHip: 97, expected: "rounded" },
  { highHip: 109, lowHip: 111, expected: "rounded" },
  { highHip: 86.3, lowHip: 91.4, expected: "flat" },
];

function getHipRatio(highHip: number, lowHip: number) {
  const x = lowHip - highHip;
  return x / lowHip;
}

const ogDataMapped = ogData.map((t) => {
  return {
    highHip: t.highHip,
    lowHip: t.lowHip,
    hipRatio: getHipRatio(t.highHip, t.lowHip),
    expected: t.expected,
  };
});

const testDataSorted = ogDataMapped.sort((a, b) => {
  if (a.hipRatio !== b.hipRatio) return b.hipRatio - a.hipRatio;
  if (a.highHip !== b.highHip) return b.highHip - a.highHip;
  return b.lowHip - a.lowHip;
});

console.log("||||| NEW DATA |||||");
console.log(testDataSorted);
console.log("||||| NEW DATA |||||");

const testData: TestResult[] = testDataSorted;

function calc(t: TestResult): BumResult {
  if (t.lowHip >= 100) {
    if (t.hipRatio >= 0.08) {
      return "rounded";
    }
    if (t.hipRatio >= 0.03) {
      return "broad";
    }
    return "flat";
  }
  if (t.lowHip >= 90) {
    if (t.hipRatio > 0.05) {
      return "rounded";
    }
    if (t.hipRatio == 0.05) {
      return "broad";
    }
    return "flat";
  }
  if (t.lowHip >= 80) {
    if (t.hipRatio >= 0.07) {
      return "rounded";
    }
    if (t.hipRatio >= 0.06) {
      return "broad";
    }
    return "flat";
  }

  return "rounded";
}

const lookingFor = "unknown";
// const lookingFor = "flat";
// const lookingFor = "broad";
// const lookingFor = "rounded";

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
        <p>highHip:</p>
        <p>{t.highHip.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>lowHip:</p>
        <p>{t.lowHip.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>hipRatio:</p>
        <p>{t.hipRatio.toFixed(2)}</p>
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
