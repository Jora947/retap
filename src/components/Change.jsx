
import React, { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import GraphForForm from './GraphForForm';

const Change = ({ show, onHide, temperature, unitProducted, onRotationSpeedChange }) => {
  const [value, setValue] = useState('');
  const [showGraph, setShowGraph] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    setShowGraph(true);
  };

  const ChangeValue =  () =>{
    onRotationSpeedChange(value); 
    onHide(false)
    setShowGraph(false)
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fas fa-exclamation-triangle"></i> Форма отправки
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Alert variant="info">
            Возможный диапазон изменений скорости вращения на устройстве EQUIP-001 от 59 до 100
          </Alert>
          <Form.Control
            placeholder={'Введите значение'}
            value={value}
            onChange={handleChange}
            type="number"
          />
        </Form>
        <Button className="mt-3" onClick={handleSubmit}>
          Получить график
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={ChangeValue}>
          Изменить
        </Button>
      </Modal.Footer>
      {showGraph && <GraphForForm temperature={temperature} unit_producted={unitProducted} />}
    </Modal>
  );
};

export default Change;