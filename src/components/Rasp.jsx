import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Rasp = ({ onHide, show, selectedStartTime, selectedEndTime, onStartTimeChange, onEndTimeChange }) => {
    const [showModal, setShowModal] = useState(false);
    const [isScheduleChanged, setIsScheduleChanged] = useState(false);
    const [value, setValue] = useState('');
    const handleShowModal = () => {
      setShowModal(true);
    };
    const handleStart = (event) => {
        setValue(event.target.value);
      };
      const handleEnd = (event) => {
        setValue(event.target.value);
      };
    const handleSave = () => {
      setIsScheduleChanged(true);
      setShowModal(false);
    };
  
    return (
      <div>
        <Button variant="secondary" onClick={handleShowModal}>
          Изменить расписание работы
        </Button>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Изменение расписания работы</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="startTime">
                <Form.Label>Начало работы</Form.Label>
                <Form.Control
  type="time"
  value={selectedStartTime}
  onChange={(e) => onStartTimeChange(e.target.value)}
/>
              </Form.Group>
              <Form.Group controlId="endTime">
                <Form.Label>Конец работы</Form.Label>
                <Form.Control
  type="time"
  value={selectedEndTime}
  onChange={(e) => onEndTimeChange(e.target.value)}
/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  export default Rasp;