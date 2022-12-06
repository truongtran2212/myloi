import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  PointElement,
  PieController,
  ArcElement,
  RadarController,
  RadialLinearScale,
  ScatterController,
} from "chart.js";

import { Bar, Pie, Line, Radar, PolarArea, Scatter } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  PointElement,
  PieController,
  ArcElement,
  LineElement,
  RadarController,
  RadialLinearScale,
  ScatterController
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 18,
        },
      },
    },
    title: {
      display: true,
      text: "Thống kê",
      font: {
        size: 18
      }
    },
  },
  animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true
    }
  },
  scales: {
    y: { // defining min and max so hiding the dataset does not change scale range
      min: 0,
      max: 100
    }
  }
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [5, 2, 54, 5, 6, 2, 3],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Dashboard = () => {
  return (
    <>
      {window.location.width !== 425 ?
       <Bar options={options} data={data} height={100} width={300} />
      :
      <Bar options={options} data={data} height={200} width={300} />
      }
    </>
  );
};

export default Dashboard;
