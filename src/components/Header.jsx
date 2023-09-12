import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import notif from '../img/notifications.svg'

const Header = () => {
	const [notification, setNotification] = useState(false)
	const [numberNot, setNumberNot] = useState(2)
	const renderPopover = () => (
		<Popover id='popover-basic'>
			<Popover.Body>
				<span>
					Происшествий {numberNot} <br />
					<span> EQUIP-002 повышении температуры </span>
					EQUIP-003 повышение давления
				</span>
				<br />
				<Button
					variant='primary'
					onClick={() => {
						setNotification(false)
						setNumberNot(0)
					}}
				>
					Прочитать
				</Button>
				<Button variant='secondary' onClick={() => setNotification(false)}>
					Закрыть
				</Button>
			</Popover.Body>
		</Popover>
	)

	return (
		<div>
			<header className='header'>
				<div className='notification'>
					<OverlayTrigger
						trigger='click'
						placement='bottom'
						overlay={renderPopover()}
						show={notification}
						onHide={() => setNotification(false)}
					>
						<img src={notif} alt='' onClick={() => setNotification(true)} />
					</OverlayTrigger>
					{numberNot > 0 && (
						<div className='notification-badge'>{numberNot}</div>
					)}
				</div>
				<div className='profiel'>
					<div className='dude'>Вадим</div>
				</div>
			</header>
		</div>
	)
}

export default Header
