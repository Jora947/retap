import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { utils, writeFile } from 'xlsx'
import { getAllDevice } from '../api/device'
import { useFetch } from '../hooks/useFetch'
import './Stats.css'

const Stats = () => {
	const columnLabels = {
		temperature: 'Температура',
		name: 'Название',
		avatar: 'Изображение',
		rotation_speed: 'Скорость вращения',
		pressure: 'Давление',
		Status: 'Статус',
		unit_producted: 'Единицы продукции',
		Energy_consumption: 'Потребление энергии',
		data_last_servis: 'Дата последнего обслуживания',
		id: 'Порядковый номер'
	}

	const [device, setDevice] = useState([])
	const [fetchdevice, isDevice, deviceError] = useFetch(async () => {
		const response = await getAllDevice()
		setDevice(response.data)
	})

	const [showForm, setShowForm] = useState(false)
	const [selectedColumns, setSelectedColumns] = useState([])
	const [sortOrder, setSortOrder] = useState({
		temperature: 'asc',
		rotation_speed: 'asc',
		pressure: 'asc'
	})

	const handleDownload = () => {
		const dataToDownload = device.map(item => {
			return {
				Название: item.name,
				Температура: item.temperature,
				'Скорость вращения': item.rotation_speed,
				Давление: item.pressure,
				Статус: item.Status ? 'Активно' : 'Неактивно',
				'Изготовлено продукции': item.unit_producted,
				'Потребление энергии': item.Energy_consumption,
			}
		})

		let wb = utils.book_new()
		let ws = utils.json_to_sheet(dataToDownload)
		utils.book_append_sheet(wb, ws, 'Stats')
		writeFile(wb, 'Stats.xlsx')
	}

	const handleColumnSelect = column => {
		if (selectedColumns.includes(column)) {
			setSelectedColumns(selectedColumns.filter(col => col !== column))
		} else {
			setSelectedColumns([...selectedColumns, column])
		}

		setSortOrder(prevSortOrder => ({
			...prevSortOrder,
			[column]: prevSortOrder[column] === 'asc' ? 'desc' : 'asc'
		}))

		setDevice(prevDevice => {
			const sortedDevice = [...prevDevice]
			sortedDevice.sort((a, b) => {
				const valueA = Number(a[column])
				const valueB = Number(b[column])

				if (sortOrder[column] === 'asc') {
					return valueA - valueB
				} else {
					return valueB - valueA
				}
			})

			return sortedDevice
		})
	}

	const handleDownloadChoose = () => {
		const dataToDownload = device.map(item => {
			const selectedData = {}

			selectedColumns.forEach(column => {
				selectedData[columnLabels[column]] = item[column]
			})

			return selectedData
		})

		let wb = utils.book_new()
		let ws = utils.json_to_sheet(dataToDownload)
		utils.book_append_sheet(wb, ws, 'Stats')
		writeFile(wb, 'Stats.xlsx')

		setShowForm(false)
		setSelectedColumns([])
	}

	useEffect(() => {
		fetchdevice()
	}, [])

	return (
		<div>
			<h2>Статистика</h2>

			{!showForm ? (
				<>
					<Button variant='success' onClick={handleDownload}>
						Скачать весь Excel файл
					</Button>

					<Button variant='success' onClick={() => setShowForm(true)}>
						Экспортировать выбранные столбцы в Excel
					</Button>
				</>
			) : (
				<Modal show={showForm} onHide={() => setShowForm(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Выберите атрибуты для экспорта</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form style={{ fontSize: 20 }}>
							{Object.keys(device[0]).map(column => (
								<Form.Check
									key={column}
									type='checkbox'
									label={columnLabels[column]}
									checked={selectedColumns.includes(column)}
									onChange={() => handleColumnSelect(column)}
								/>
							))}
						</Form>
					</Modal.Body>

					<Modal.Footer>
						<Button variant='success' onClick={handleDownloadChoose}>
							Скачать выбранные атрибуты
						</Button>

						<Button variant='secondary' onClick={() => setShowForm(false)}>
							Отмена
						</Button>
					</Modal.Footer>
				</Modal>
			)}

			<Table bordered hover id='table-to-export' style={{ width: 1400 }}>
				<thead>
					<tr className='hover'>
						<th onClick={() => handleColumnSelect('name')}>Название</th>
						<th onClick={() => handleColumnSelect('temperature')}>
							Температура {sortOrder.temperature === 'asc' ? '' : ''}
						</th>
						<th onClick={() => handleColumnSelect('rotation_speed')}>
							Скорость вращения {sortOrder.rotation_speed === 'asc' ? '' : ''}
						</th>
						<th onClick={() => handleColumnSelect('pressure')}>
							Давление {sortOrder.pressure === 'asc' ? '' : ''}
						</th>
						<th >Статус</th>
						<th >
							Изготовлено продукции
						</th>
						<th >
							Потребление энергии
						</th>
					</tr>
				</thead>

				<tbody>
					{device.map(item => (
						<tr key={item.id}>
							<td>{item.name}</td>
							<td>{item.temperature}</td>
							<td>{item.rotation_speed}</td>
							<td>{item.pressure}</td>
							<td>{item.Status ? 'Активно' : 'Неактивно'}</td>
							<td>{item.unit_producted}</td>
							<td>{item.Energy_consumption}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export default Stats
