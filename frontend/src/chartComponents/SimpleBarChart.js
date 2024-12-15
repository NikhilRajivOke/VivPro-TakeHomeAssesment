import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

export const SimpleBarChart = ({ data }) => {
  return (
    <ResponsiveContainer height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="acousticness"
          fill="#8884d8"
          activeBar={<Rectangle fill="blue" stroke="blue" />}
        />
        <Bar
          dataKey="tempo"
          fill="#82ca9d"
          activeBar={<Rectangle fill="purple" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
