import { Line } from "react-chartjs-2"
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto"

const Chart = ({ chartData }) => {
  return (
    <Line
      data={chartData}
      options={{ maintainAspectRatio: false }}
    />
  )
}

export default Chart
