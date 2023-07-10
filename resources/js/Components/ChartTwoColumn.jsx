import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const labels = [
    "07:30-08:30",
    "08:30-09:30",
    "09:30-10:30",
    "10:30-11:30",
    "12:30-13:30",
    "13:30-14:30",
    "14:30-15:30",
    "15:30-16:30",
    // "16:30-17:30",
];

export default function ChartTwoColumn({ name, nameActual = '1', nameTarget = '2', actual = [], target = [] }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                display: true,
                labels: {
                    padding: 10
                }
            },
            title: {
                display: true,
                text: name,
            },
            datalabels: {
                anchor: "end",
                align: "end",
                padding: {
                    bottom: -20
                }
            },
        },
        maintainAspectRatio: false,
    };

    const data = {
        labels,
        datasets: [
            {
                label: nameActual,
                data: actual,
                backgroundColor: "#1d4ed8",
            },
            {
                label: nameTarget,
                data: target,
                backgroundColor: "orange",
            },
        ],
    };

    return <Bar options={options} data={data} width={"auto"} height={"auto"} />;
}
