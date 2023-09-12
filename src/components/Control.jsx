
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import FileSaver from 'react-file-download';
import './Control.css';
import Change from './Change';
import GraphForForm from './GraphForForm';
import Rasp from './Rasp';
const Control = ({ device }) => {
  const [temperature, setTemperature] = useState(device.temperature);
  const [showChange, setShowChange] = useState(false);
  const [unitProducted, setUnitProducted] = useState(device.unit_producted);
  const [rotationSpeed, setRotationSpeed] = useState(device.rotation_speed);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const handleRotationSpeedChange = (newRotationSpeed) => {
    setRotationSpeed(newRotationSpeed);
  };
  const start = (newStart) => {
    setStartTime(newStart)
  }
  const end = (newEnd) => {
    setEndTime(newEnd)
  }
  const handleDownload = () => {
    const efficiency = (unitProducted / device.Energy_consumption) * 100;
    const reportText =
      `Отчёт о работе\n\n` +
      `Название устройства: ${device.name}\n` +
      `Температура: ${temperature}\n` +
      `Скорость вращения: ${rotationSpeed}\n` +
      `Давление: ${device.pressure}\n` +
      `Статус: ${device.Status ? 'Активно' : 'Неактивно'}\n` +
      `Произведено единиц продукции: ${unitProducted}\n` +
      `Потребление энергии: ${device.Energy_consumption}\n` +
      `Дата последнего обслуживания: ${new Date(
        device.data_last_servis * 1000
      )}\n` +
      `Эффективность: ${efficiency.toFixed(2)}%\n` +
      `Устройство ${
        device.name
      } продемонстрировало высокую эффективность в процессе работы. При температуре ${
        temperature
      } градусов, скорости вращения ${
        rotationSpeed
      } оборотов в минуту и давлении ${device.pressure} единиц, оно произвело ${
        unitProducted
      } единицы продукции при потреблении всего ${
        device.Energy_consumption
      } единицы энергии. Дата последнего обслуживания устройства - ${new Date(
        device.data_last_servis * 1000
      )} года. Эффективность устройства составляет ${efficiency}%, что является впечатляющим показателем. Благодаря высокой эффективности и стабильной работе, устройство ${
        device.name
      } является надежным и эффективным решением для вашей компании.`;
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    FileSaver(blob, 'отчёт.txt');
  };

  const handleShowChange = () => {
    setShowChange(true);
  };

  const handleCloseChange = () => {
    setShowChange(false);
  };

  return (
    <div className="main__control">
      <Card className="control-card">
        <Card.Body>
          <Card.Title>{device.name}</Card.Title>
          <div className="control-button-container">
          <Button variant="secondary" onClick={handleShowChange}>
  Скорость вращения: {rotationSpeed}
</Button>
          </div>
          <Card.Text>Температура: {temperature}</Card.Text>
          <Card.Text>Давление: {device.pressure}</Card.Text>
          <Card.Text>Потребление энергии: {device.Energy_consumption}</Card.Text>
          <Card.Text>Статус: {device.Status ? 'Активно' : 'Неактивно'}</Card.Text>
          <div className="schedule-section">
            <Card.Title>Расписание и автоматизация</Card.Title>
            <Card.Text><Button variant='secondary'><Rasp
      onHide={handleCloseChange}
      show={showChange}
      selectedStartTime={startTime}
      selectedEndTime={endTime}
      onStartTimeChange={setStartTime}
      onEndTimeChange={setEndTime}
/></Button></Card.Text>
<div> Изменение Времени{startTime}</div>
<div>{endTime}</div>
          </div>
          <Button variant="secondary" onClick={handleDownload}>
            Сформировать отчёт
          </Button>
        </Card.Body>
        <div></div>
      </Card>
      <Change
        show={showChange}
        onHide={handleCloseChange}
        temperature={temperature}
        unitProducted={unitProducted}
        onRotationSpeedChange={handleRotationSpeedChange}
      />
    </div>
  );
};

export default Control;