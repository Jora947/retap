import React from 'react'
import { Button, Card } from 'react-bootstrap'
import FileSaver from 'react-file-download'
import './Control.css'

const Control = ({ device }) => {
	const handleDownload = () => {
		const efficiency = (device.unit_producted / device.Energy_consumption) * 100
		const reportText =
			`Отчёт о работе\n\n` +
			`Название устройства: ${device.name}\n` +
			`Температура: ${device.temperature}\n` +
			`Скорость вращения: ${device.rotation_speed}\n` +
			`Давление: ${device.pressure}\n` +
			`Статус: ${device.Status ? 'Активно' : 'Неактивно'}\n` +
			`Произведено единиц продукции: ${device.unit_producted}\n` +
			`Потребление энергии: ${device.Energy_consumption}\n` +
			`Дата последнего обслуживания: ${new Date(
				device.data_last_servis * 1000
			)}\n` +
			`Эффективность: ${efficiency.toFixed(2)}%\n` +
			`Устройство ${
				device.name
			} продемонстрировало высокую эффективность в процессе работы. При температуре ${
				device.temperature
			} градусов, скорости вращения ${
				device.rotation_speed
			} оборотов в минуту и давлении ${device.pressure} единиц, оно произвело ${
				device.unit_producted
			} единицы продукции при потреблении всего ${
				device.Energy_consumption
			} единицы энергии. Дата последнего обслуживания устройства - ${new Date(
				device.data_last_servis * 1000
			)} года. Эффективность устройства составляет ${efficiency}%, что является впечатляющим показателем. Благодаря высокой эффективности и стабильной работе, устройство ${
				device.name
			} является надежным и эффективным решением для вашей компании.`

		const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' })
		FileSaver(blob, 'отчёт.txt')
	}

	return (
		<div className='main__control'>
			<Card style={{ width: '18rem' }}>
				<Card.Body>
					<Card.Title>{device.name}</Card.Title>
					<Card.Text>Температура: {device.temperature}</Card.Text>
					<Card.Text>Скорость вращения: {device.rotation_speed}</Card.Text>
					<Card.Text>Давление: {device.pressure}</Card.Text>
					<Card.Text>
						Потребление энергии: {device.Energy_consumption}
					</Card.Text>
					<Card.Text>
						Статус: {device.Status ? 'Активно' : 'Неактивно'}
					</Card.Text>
					<div className='control-section'>
						<Card.Title>Управление входами и выходами</Card.Title>
						<Card.Text>Входные сигналы: {device.input_signals}</Card.Text>
						<Card.Text>Выходные сигналы: {device.output_signals}</Card.Text>
					</div>
					<div className='schedule-section'>
						<Card.Title>Расписание и автоматизация</Card.Title>
						<Card.Text>Расписание работы: {device.schedule}</Card.Text>
					</div>
					<Button variant='secondary' onClick={handleDownload}>
						Сформировать отчёт
					</Button>
				</Card.Body>
			</Card>
		</div>
	)
}

export default Control
