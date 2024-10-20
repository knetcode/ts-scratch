"use client";

import { useEffect, useRef } from "react";

type TummyResult = "" | "Flat" | "Rounded" | "unknown";

type OgResult = { waist: number; lowHip: number; expected: TummyResult };

type TestResult = {
  waistHipRatio: number;
} & OgResult;

function getWaistHipRatio(waist: number, hip: number) {
  return waist / hip;
}

const ogData: OgResult[] = [
  { waist: 86, lowHip: 108, expected: "Rounded" },
  { waist: 90, lowHip: 105, expected: "Rounded" },
  { waist: 77, lowHip: 98.2, expected: "Flat" },
  { waist: 81.7, lowHip: 100.4, expected: "Flat" },
  { waist: 76, lowHip: 92, expected: "Flat" },
  { waist: 79.5, lowHip: 97.5, expected: "Flat" },
  { waist: 96.2, lowHip: 119.5, expected: "Rounded" },
  { waist: 94, lowHip: 93, expected: "Rounded" },
  { waist: 74.3, lowHip: 96, expected: "Flat" },
  { waist: 74, lowHip: 106, expected: "Flat" },
  { waist: 83.3, lowHip: 106, expected: "Flat" },
  { waist: 76.75, lowHip: 99, expected: "Flat" },
  { waist: 99.5, lowHip: 129, expected: "Rounded" },
  { waist: 86.6, lowHip: 106, expected: "Rounded" },
  { waist: 105.4, lowHip: 137.7, expected: "Rounded" },
  { waist: 83, lowHip: 113, expected: "Rounded" },
  { waist: 73.66, lowHip: 96.5, expected: "Rounded" },
  { waist: 81.28, lowHip: 93.98, expected: "Rounded" },
  { waist: 72, lowHip: 92.5, expected: "Rounded" },
  { waist: 79, lowHip: 100, expected: "Rounded" },
  { waist: 69.5, lowHip: 93, expected: "Flat" },
  { waist: 69.5, lowHip: 97, expected: "Flat" },
  { waist: 90, lowHip: 111, expected: "Rounded" },
  { waist: 78.74, lowHip: 91.4, expected: "Rounded" },
];

new Error("asd", { cause: "zxc" });

const ogDataMapped = ogData.map((t) => {
  return {
    waist: t.waist,
    lowHip: t.lowHip,
    waistHipRatio: getWaistHipRatio(t.waist, t.lowHip),
    expected: t.expected,
  };
});

const testDataSorted = ogDataMapped.sort((a, b) => {
  if (a.waistHipRatio !== b.waistHipRatio) return b.waistHipRatio - a.waistHipRatio;
  if (a.waist !== b.waist) return b.waist - a.waist;
  return b.lowHip - a.lowHip;
});

const testData: TestResult[] = testDataSorted;

function calc(t: TestResult): TummyResult {
  if (t.waist >= 100) {
    if (t.waistHipRatio >= 0.5) {
      return "Rounded";
    }
    return "Flat";
  }
  if (t.waist >= 80) {
    if (t.waistHipRatio >= 0.77) {
      return "Rounded";
    }
    return "Flat";
  }
  if (t.waist >= 60) {
    if (t.waistHipRatio >= 0.75) {
      return "Rounded";
    }
    return "Flat";
  }

  return "Flat";
}

// const lookingFor = "Rounded";
// const lookingFor = "Flat";
const lookingFor = "unknown";

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
        <p>waist:</p>
        <p>{t.waist.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>lowHip:</p>
        <p>{t.lowHip.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>waistHipRatio:</p>
        <p>{t.waistHipRatio.toFixed(2)}</p>
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
