import React from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'

const Crash = ({ show, onHide, crash }) => {
	return (
		<Modal show={show} onHide={onHide} size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title>
					<i className='fas fa-exclamation-triangle'></i> Форма отправки
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<br />
				{crash > 0 ? (
					<div>
						<h5>Сбои:</h5>
						<Alert variant='danger'>
							{`Неполатки произошли на устройстве EQUIP-002`}
							<br />
							{`Температура поднялась до 95 при возможных 70`}
							<br />
						</Alert>
						<Alert variant='danger'>
							{`Неполатки произошли на устройстве EQUIP-003`}
							<br />
							{`Давление поднялось до 98 при возможных 80`}
						</Alert>
					</div>
				) : (
					<Alert variant='success'>Нет сбоев</Alert>
				)}
				<Form>
					<h5>Можете ввести email адрес для отправки предупреждения:</h5>
					<Form.Control placeholder={'Email адрес'} />
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрыть
				</Button>
				{crash > 0 && (
					<Button variant='outline-warning'>
						Сохранить и отправить на email
					</Button>
				)}
				<Button variant='outline-success' onClick={onHide}>
					Отправить информацию коллеге
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default Crash
