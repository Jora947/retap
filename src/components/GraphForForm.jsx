import Chart from 'chart.js/auto'
import React, { useEffect, useRef, useState } from 'react'

const GraphForForm = ({ temperature, unit_producted  }) => {
	const chartRef = useRef(null)
	const [chart, setChart] = useState(null)

	useEffect(() => {
		const ctx = chartRef.current.getContext('2d')
		if (chart) {
			chart.destroy()
		}

		const temperatureData = [temperature]
		const pressureData = [unit_producted]

		for (let i = 0; i < 6; i++) {
			const temperatureRandomNumber =
  Math.floor(Math.random() * (10 - -1 + 1)) + 4;
const pressureRandomNumber =
  Math.floor(Math.random() * (10 - -1 + 1)) + 4;
			temperatureData.push(temperature + temperatureRandomNumber)
			pressureData.push(unit_producted + pressureRandomNumber)
		}

		const newChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: ['12:00', '14:00', '16:00', '18:00', '20:00'],
				datasets: [
					{
						label: 'Температура',
						data: temperatureData,
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1
					},
					{
						label: 'Потребление энергии',
						data: pressureData,
						backgroundColor: 'rgba(192, 75, 192, 0.2)',
						borderColor: 'rgba(192, 75, 192, 1)',
						borderWidth: 1
					},
				]
			},
			options: {
				aspectRatio: 1,
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		})
		setChart(newChart)
	}, [])

	return <canvas ref={chartRef} />
}

export default GraphForForm