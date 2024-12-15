import {
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const getBins = (data, binCount = 5) => {
  const durations = data.map((item) => item.duration);
  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);
  const binSize = Math.ceil((maxDuration - minDuration) / binCount); // Calculate bin size based on range

  const bins = Array.from({ length: binCount }, (_, index) => {
    const binStart = minDuration + index * binSize;
    const binEnd = binStart + binSize;
    const binName = `${binStart}-${binEnd}`;
    const binData = data.filter(
      (item) => item.duration >= binStart && item.duration < binEnd
    );
    return { name: binName, value: binData.length };
  });
  return bins;
};
export const HistogramChart = ({ durationData }) => {
  console.log(durationData);
  const histogramData = getBins(durationData, 5);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart>
        data={histogramData}
        margin=
        {{
          top: 20,
          right: 20,
          bottom: 30,
          left: 20,
        }}
      </BarChart>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </ResponsiveContainer>
  );
};
