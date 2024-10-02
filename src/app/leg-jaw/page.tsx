"use client";

import { useEffect, useRef } from "react";

type LegResult = "long" | "slightlyLong" | "combination" | "slightlyShort" | "short" | "balanced" | "unknown";

type OgResult = {
  height: number;
  jaw: number;
  waist: number;
  hip: number;
  leg: number;
  expected: LegResult;
};

type TestResult = {
  waistHipRatio: number;
  ratio: number;
} & OgResult;

const ogData: OgResult[] = [
  { height: 177, jaw: 11.75, waist: 90, hip: 100, leg: 79, expected: "combination" },
  { height: 175, jaw: 13.5, waist: 73, hip: 99, leg: 85, expected: "long" },
  { height: 173, jaw: 12.5, waist: 76, hip: 92, leg: 80.5, expected: "short" },
  { height: 172, jaw: 13.5, waist: 105.4, hip: 137.7, leg: 80, expected: "long" },
  { height: 170, jaw: 12.8, waist: 83, hip: 95, leg: 83, expected: "long" },
  { height: 170, jaw: 26, waist: 79, hip: 100, leg: 82.5, expected: "slightlyLong" },

  { height: 169, jaw: 12.5, waist: 75, hip: 102, leg: 81, expected: "slightlyShort" },
  { height: 168, jaw: 12, waist: 94, hip: 93, leg: 81, expected: "balanced" },
  { height: 168, jaw: 14, waist: 90, hip: 105, leg: 76, expected: "long" },
  { height: 168, jaw: 23, waist: 76.5, hip: 94, leg: 72.5, expected: "long" },
  { height: 168, jaw: 12.05, waist: 86.6, hip: 106, leg: 80, expected: "slightlyLong" },
  { height: 167.64, jaw: 12.8, waist: 78.74, hip: 91.4, leg: 85, expected: "long" },
  { height: 167.6, jaw: 12.5, waist: 76.75, hip: 99, leg: 82, expected: "slightlyLong" },
  { height: 165, jaw: 13.25, waist: 74.3, hip: 96, leg: 81, expected: "balanced" },
  { height: 165, jaw: 13, waist: 74, hip: 106, leg: 72, expected: "slightlyLong" },
  { height: 165, jaw: 11.5, waist: 77.5, hip: 103, leg: 83, expected: "long" },

  { height: 164, jaw: 13.75, waist: 68, hip: 96, leg: 78, expected: "short" },
  { height: 164, jaw: 14.1, waist: 69.5, hip: 93, leg: 79.2, expected: "balanced" },
  { height: 163.5, jaw: 12.2, waist: 86, hip: 108, leg: 75.5, expected: "long" },
  { height: 163, jaw: 13.5, waist: 81, hip: 117, leg: 76.5, expected: "slightlyShort" },
  { height: 163, jaw: 12.25, waist: 81.7, hip: 100.4, leg: 79.5, expected: "long" },
  { height: 160, jaw: 12.2, waist: 81.28, hip: 93.98, leg: 78.74, expected: "combination" },

  { height: 157.48, jaw: 12.7, waist: 83.3, hip: 106, leg: 76.6, expected: "slightlyLong" },
  { height: 157, jaw: 13.5, waist: 83, hip: 113, leg: 82, expected: "long" },
  { height: 157, jaw: 11.6, waist: 69.5, hip: 97, leg: 71.6, expected: "slightlyLong" },
  { height: 152, jaw: 13.2, waist: 99.5, hip: 129, leg: 72, expected: "combination" },
  { height: 152.4, jaw: 13.5, waist: 90, hip: 111, leg: 66, expected: "short" },
  { height: 152, jaw: 20.8, waist: 72, hip: 92.5, leg: 73, expected: "slightlyLong" },
];

function getWaistHipRatio(waist: number, hip: number, height: number) {
  return Number((height / (hip - waist)).toFixed(4));
}

function getJawLowerRatio(jaw: number, leg: number, height: number) {
  return Number(((height / leg) * (leg - jaw)).toFixed(4));
}

const ogDataMapped = ogData.map((t) => {
  return {
    height: t.height,
    waist: t.waist,
    hip: t.hip,
    leg: t.leg,
    jaw: t.jaw,
    waistHipRatio: getWaistHipRatio(t.waist, t.hip, t.height),
    ratio: getJawLowerRatio(t.jaw, t.leg, t.height),
    expected: t.expected,
  };
});

const testDataSorted = ogDataMapped.sort((a, b) => {
  return b.ratio - a.ratio;
});

const testData: TestResult[] = testDataSorted;

function calc(t: TestResult): LegResult {
  if (t.waistHipRatio < 0) {
    return "balanced";
  }
  if (t.height >= 170) {
    if (t.waistHipRatio >= 17.7) {
      return "combination";
    }
    if (t.ratio >= 142) {
      return "long";
    }
    return "short";
  }

  if (t.height >= 165) {
    if (t.ratio >= 114.7) {
      return "long";
    }
    return "short";
  }

  if (t.height >= 160) {
    if (t.waistHipRatio >= 12.5) {
      return "combination";
    }
    if (t.ratio >= 137) {
      return "long";
    }
    return "short";
  }

  if (t.ratio >= 131) {
    return "long";
  }

  return "short";
}

// const lookingFor = "combination";
// const lookingFor = "short";
// const lookingFor = "slightlyShort";
// const lookingFor = "balanced";
// const lookingFor = "slightlyLong";
// const lookingFor = "long";
const lookingFor = "unknown";

console.log(testData.map((x) => ({ ...x, calc: calc(x) })));

function DataCard({ t }: { t: TestResult }) {
  return (
    <div
      className={`
        w-64 h-min bg-slate-800 p-2 
        ${lookingFor === t.expected ? "border-4 border-pink-500" : ""}
        ${lookingFor === calc(t) ? "ring-4 ring-blue-500" : ""}
      `}
    >
      {/* <div className="flex flex-row justify-between items-center">
        <p>lowerBodyRatio:</p>
        <p>{t.lowerBodyRatio.toFixed(4)}</p>
      </div> */}
      <div className="flex flex-row justify-between items-center">
        <p>ratio:</p>
        <p>{t.ratio.toFixed(4)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>waistHipRatio:</p>
        <p>{t.waistHipRatio.toFixed(4)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>height:</p>
        <p>{t.height.toFixed(4)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>leg:</p>
        <p>{t.leg.toFixed(4)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>jaw:</p>
        <p>{t.jaw.toFixed(4)}</p>
      </div>
      {/* <div className="flex flex-row justify-between items-center">
        <p>waist:</p>
        <p>{t.waist.toFixed(4)}</p>
      </div> */}
      {/* <div className="flex flex-row justify-between items-center">
        <p>hip:</p>
        <p>{t.hip.toFixed(4)}</p>
      </div> */}
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
  return (
    <div className="p-2 flex flex-col gap-2">
      <div>
        <h1>Tests TOTAL: {testData.length}</h1>
        <div className="flex flex-row gap-2 items-start justify-start">
          <div className="flex flex-1 flex-row flex-wrap items-start justify-start gap-4">
            {testData.map((t, i) => {
              if (calc(t) === t.expected) {
                return <DataCard t={t} key={i} />;
              }
              if (calc(t) === "long" && t.expected === "slightlyLong") {
                return <DataCard t={t} key={i} />;
              }
              if (calc(t) === "slightlyLong" && t.expected === "long") {
                return <DataCard t={t} key={i} />;
              }
              if (calc(t) === "short" && t.expected === "slightlyShort") {
                return <DataCard t={t} key={i} />;
              }
              if (calc(t) === "slightlyShort" && t.expected === "short") {
                return <DataCard t={t} key={i} />;
              }
            })}
          </div>
          <div className="flex flex-1 flex-row flex-wrap items-start justify-start gap-4">
            {testData.map((t, i) => {
              if (calc(t) === "short" && t.expected === "slightlyShort") {
                return;
              }
              if (calc(t) === "slightlyShort" && t.expected === "short") {
                return;
              }
              if (calc(t) === "long" && t.expected === "slightlyLong") {
                return;
              }
              if (calc(t) === "slightlyLong" && t.expected === "long") {
                return;
              }
              if (calc(t) !== t.expected) {
                return <DataCard t={t} key={i} />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const d = [
  { height: 177, waist: 90, hip: 100, leg: 79, jaw: 11.75, waistHipRatio: 17.7, ratio: 150.6741, expected: "combination", calc: "combination" },
  { height: 175, waist: 73, hip: 99, leg: 85, jaw: 13.5, waistHipRatio: 6.7308, ratio: 147.2059, expected: "long", calc: "long" },
  { height: 173, waist: 76, hip: 92, leg: 80.5, jaw: 12.5, waistHipRatio: 10.8125, ratio: 146.1366, expected: "short", calc: "long" },
  { height: 170, waist: 83, hip: 95, leg: 83, jaw: 12.8, waistHipRatio: 14.1667, ratio: 143.7831, expected: "long", calc: "long" },
  { height: 168, waist: 94, hip: 93, leg: 81, jaw: 12, waistHipRatio: -168, ratio: 143.1111, expected: "balanced", calc: "balanced" },
  { height: 172, waist: 105.4, hip: 137.7, leg: 80, jaw: 13.5, waistHipRatio: 5.3251, ratio: 142.975, expected: "long", calc: "long" },
  { height: 169, waist: 75, hip: 102, leg: 81, jaw: 12.5, waistHipRatio: 6.2593, ratio: 142.9198, expected: "slightlyShort", calc: "long" },
  { height: 168, waist: 86.6, hip: 106, leg: 80, jaw: 12.05, waistHipRatio: 8.6598, ratio: 142.695, expected: "slightlyLong", calc: "long" },
  { height: 167.64, waist: 78.74, hip: 91.4, leg: 85, jaw: 12.8, waistHipRatio: 13.2417, ratio: 142.3954, expected: "long", calc: "long" },
  { height: 165, waist: 77.5, hip: 103, leg: 83, jaw: 11.5, waistHipRatio: 6.4706, ratio: 142.1386, expected: "long", calc: "long" },
  { height: 167.6, waist: 76.75, hip: 99, leg: 82, jaw: 12.5, waistHipRatio: 7.5326, ratio: 142.0512, expected: "slightlyLong", calc: "long" },
  { height: 165, waist: 74.3, hip: 96, leg: 81, jaw: 13.25, waistHipRatio: 7.6037, ratio: 138.0093, expected: "balanced", calc: "long" },
  { height: 163, waist: 81.7, hip: 100.4, leg: 79.5, jaw: 12.25, waistHipRatio: 8.7166, ratio: 137.8836, expected: "long", calc: "long" },
  { height: 163.5, waist: 86, hip: 108, leg: 75.5, jaw: 12.2, waistHipRatio: 7.4318, ratio: 137.0801, expected: "long", calc: "long" },
  { height: 168, waist: 90, hip: 105, leg: 76, jaw: 14, waistHipRatio: 11.2, ratio: 137.0526, expected: "long", calc: "long" },
  { height: 160, waist: 81.28, hip: 93.98, leg: 78.74, jaw: 12.2, waistHipRatio: 12.5984, ratio: 135.2096, expected: "combination", calc: "combination" },
  { height: 165, waist: 74, hip: 106, leg: 72, jaw: 13, waistHipRatio: 5.1563, ratio: 135.2083, expected: "slightlyLong", calc: "long" },
  { height: 164, waist: 68, hip: 96, leg: 78, jaw: 13.75, waistHipRatio: 5.8571, ratio: 135.0897, expected: "short", calc: "short" },
  { height: 164, waist: 69.5, hip: 93, leg: 79.2, jaw: 14.1, waistHipRatio: 6.9787, ratio: 134.803, expected: "balanced", calc: "short" },
  { height: 163, waist: 81, hip: 117, leg: 76.5, jaw: 13.5, waistHipRatio: 4.5278, ratio: 134.2353, expected: "slightlyShort", calc: "short" },
  { height: 157, waist: 69.5, hip: 97, leg: 71.6, jaw: 11.6, waistHipRatio: 5.7091, ratio: 131.5642, expected: "slightlyLong", calc: "long" },
  { height: 157.48, waist: 83.3, hip: 106, leg: 76.6, jaw: 12.7, waistHipRatio: 6.9374, ratio: 131.3704, expected: "slightlyLong", calc: "long" },
  { height: 157, waist: 83, hip: 113, leg: 82, jaw: 13.5, waistHipRatio: 5.2333, ratio: 131.1524, expected: "long", calc: "long" },
  { height: 152, waist: 99.5, hip: 129, leg: 72, jaw: 13.2, waistHipRatio: 5.1525, ratio: 124.1333, expected: "combination", calc: "short" },
  { height: 152.4, waist: 90, hip: 111, leg: 66, jaw: 13.5, waistHipRatio: 7.2571, ratio: 121.2273, expected: "short", calc: "short" },
  { height: 170, waist: 79, hip: 100, leg: 82.5, jaw: 26, waistHipRatio: 8.0952, ratio: 116.4242, expected: "slightlyLong", calc: "short" },
  { height: 168, waist: 76.5, hip: 94, leg: 72.5, jaw: 23, waistHipRatio: 9.6, ratio: 114.7034, expected: "long", calc: "long" },
  { height: 152, waist: 72, hip: 92.5, leg: 73, jaw: 20.8, waistHipRatio: 7.4146, ratio: 108.6904, expected: "slightlyLong", calc: "short" },
];
