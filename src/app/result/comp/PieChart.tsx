"use client";

import { ResponsivePie } from "@nivo/pie";

const data = [
  { id: "JavaScript", label: "JavaScript", value: 40 },
  { id: "Python", label: "Python", value: 25 },
  { id: "Java", label: "Java", value: 20 },
  { id: "C++", label: "C++", value: 15 },
];

export default function NivoPieChart() {
  return (
    <div style={{ height: 300 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#ccc"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      />
    </div>
  );
}
