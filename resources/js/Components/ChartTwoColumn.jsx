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

// const labels = [
//     "07:30-08:30",
//     "08:30-09:30",
//     "09:30-10:30",
//     "10:30-12:00",
//     "12:00-13:30",
//     "13:30-14:30",
//     "14:30-15:30",
//     "15:30-16:30",
//     "16:30-17:30",
//     "17:30-18:30",
//     "18:30-20:30"
// ];

export default function ChartTwoColumn({ name, labels, nameActual = '1', nameTarget = '2', actual = [], target = [], isSmall = false }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                display: true,
                labels: {
                    padding: 10,
                    font: {
                        size: isSmall ? 8 : 14
                    }
                }
            },
            title: {
                display: true,
                text: name
            },
            datalabels: {
                anchor: "end",
                align: "end",
                padding: {
                    bottom: -20
                },
                labels: {
                    font: {
                        size: isSmall ? 8 : 14
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: isSmall ? 8 : 14,
                    },
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return labels[index];
                    }
                }
            }
        },
        maintainAspectRatio: false,
    };

    const data = {
        labels,
        datasets: [
            {
                label: nameActual,
                data: actual,
                backgroundColor: "#1d4ed8"
            },
            {
                label: nameTarget,
                data: target,
                backgroundColor: "orange"
            },
        ],
    };

    return <Bar options={options} data={data} width={"auto"} height={"auto"}  />;
}
