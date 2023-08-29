import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Table from 'react-bootstrap/Table'
import './App.css'
import { getAllDevice } from './api/device'
import Control from './components/Control'
import Crash from './components/Crash'
import Header from './components/Header'
import Stats from './components/Stats'
import { useFetch } from './hooks/useFetch'

function App() {
	const [devices, setDevices] = useState([])
	const [postVisible, setPostVisible] = useState(false)
	const [selectedDevice, setSelectedDevice] = useState(null)
	const [fetchDevices, isDevices, devicesError] = useFetch(async () => {
		const response = await getAllDevice()
		setDevices(response.data.slice(0, 9))
	})

	useEffect(() => {
		fetchDevices()
	}, [])

	const handleDeviceClick = selectedDevice => {
		setSelectedDevice(selectedDevice)
	}

	const renderPopover = () => (
		<Popover id='popover-basic'>
			<Popover.Body>
				Сбой прошел на устройствах:
				<br />
				<span>Name 1, повышение температуры Name 2, повышение давления</span>
			</Popover.Body>
		</Popover>
	)

	return (
		<div className='App'>
			<Header />
			<div className='main'>
				<div>
					<Navbar className='bg-body-tertiary'>
						<Container>
							<Navbar.Brand href='#home'>Мониторинг</Navbar.Brand>
						</Container>
					</Navbar>
					<br />
					<Navbar className='bg-body-tertiary'>
						<Container>
							<Navbar.Brand>Управление</Navbar.Brand>
						</Container>
					</Navbar>
					<br />
					<Navbar className='bg-body-tertiary'>
						<Container>
							<Navbar.Brand href='#home'>Статистика</Navbar.Brand>
						</Container>
					</Navbar>
					<br />
					<Navbar className='bg-body-tertiary'>
						<Container>
							<Navbar.Brand href='#home'>Настройки</Navbar.Brand>
						</Container>
					</Navbar>
				</div>
				<div>
					<h2>Информация об оборудовании</h2>
					<Table bordered hover>
						<thead>
							<tr>
								<th>Название</th>
								<th>Температура</th>
								<th>Давление</th>
								<th>Скорость вращения</th>
							</tr>
						</thead>
						<tbody>
							{devices.map(device => (
								<tr
									key={device.id}
									onClick={() => handleDeviceClick(device)}
									style={{ cursor: 'pointer' }}
								>
									<td>{device.name}</td>
									<td>{device.temperature}</td>
									<td>{device.pressure}</td>
									<td>{device.rotation_speed}</td>
								</tr>
							))}
						</tbody>
					</Table>
					<div className='crash'>
						<OverlayTrigger
							trigger='hover'
							placement='bottom'
							overlay={renderPopover()}
						>
							<div className='crash-info'>
								<div className='crash-name'>Количество сбоев: 2</div>
							</div>
						</OverlayTrigger>
						<Button variant='secondary' onClick={() => setPostVisible(true)}>
							Отправить информацию
						</Button>
					</div>
					<Crash
						crash={2}
						show={postVisible}
						onHide={() => setPostVisible(false)}
					/>
					{devices.map(device => (
						<Control key={device.id} device={device} />
					))}
				</div>
			</div>
			<Stats />
		</div>
	)
}

export default App
