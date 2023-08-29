import Chart from 'chart.js/auto'
import React, { useEffect, useRef, useState } from 'react'

const Graph = ({ device }) => {
	const chartRef = useRef(null)
	const [chart, setChart] = useState(null)

	useEffect(() => {
		const ctx = chartRef.current.getContext('2d')
		if (chart) {
			chart.destroy()
		}

		const temperatureData = []
		const pressureData = []
		const rotationSpeedData = []

		for (let i = 0; i < 6; i++) {
			const temperatureRandomNumber =
				Math.floor(Math.random() * (5 - -5 + 1)) + -5
			const pressureRandomNumber = Math.floor(Math.random() * (5 - -5 + 1)) + -5
			const rotationSpeedRandomNumber =
				Math.floor(Math.random() * (5 - -5 + 1)) + -5

			temperatureData.push(device.temperature + temperatureRandomNumber)
			pressureData.push(device.pressure + pressureRandomNumber)
			rotationSpeedData.push(device.rotation_speed + rotationSpeedRandomNumber)
		}

		const newChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
				datasets: [
					{
						label: 'Температура',
						data: temperatureData,
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1
					},
					{
						label: 'Давление',
						data: pressureData,
						backgroundColor: 'rgba(192, 75, 192, 0.2)',
						borderColor: 'rgba(192, 75, 192, 1)',
						borderWidth: 1
					},
					{
						label: 'Скорость вращения',
						data: rotationSpeedData,
						backgroundColor: 'rgba(192, 192, 75, 0.2)',
						borderColor: 'rgba(192, 192, 75, 1)',
						borderWidth: 1
					}
				]
			},
			options: {
				aspectRatio: 3,
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		})
		setChart(newChart)
	}, [device])

	return <canvas ref={chartRef} />
}

export default Graph
