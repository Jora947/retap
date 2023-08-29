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
							{`Сбой произошел на устройстве 2`}
							<br />
							{`Температура поднялась до 4 при возможных 60`}
							<br />
						</Alert>
						<Alert variant='danger'>
							{`Сбой произошел на устройстве 3`}
							<br />
							{`Давление поднялось до 4 при возможных 50`}
						</Alert>
					</div>
				) : (
					<Alert variant='success'>Нет сбоев</Alert>
				)}
				<Form>
					<h5>Введите email адрес для отправки предупреждения:</h5>
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
					Отправить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default Crash
