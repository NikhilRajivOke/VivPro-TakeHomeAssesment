import React from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
} from "recharts";

export const SimpleScatterChart = ({ danceabilityData }) => {
  return (
    <ResponsiveContainer>
      <ScatterChart>
        <CartesianGrid />
        <XAxis
          dataKey="x"
          name="Song"
          label={{
            value: "Song",
            position: "insideBottom",
            offset: -10,
          }}
        ></XAxis>
        <YAxis
          type="number"
          dataKey="y"
          name="Danceability"
          unit="ms"
          label={{ value: "Danceability", angle: -90, position: "insideLeft" }}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Danceability" data={danceabilityData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
