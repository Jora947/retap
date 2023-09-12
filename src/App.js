import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Table from 'react-bootstrap/Table';
import './App.css';
import { getAllDevice } from './api/device';
import Control from './components/Control';
import Crash from './components/Crash';
import Header from './components/Header';
import Stats from './components/Stats';
import { useFetch } from './hooks/useFetch';
import Graph from './components/Graph';
import USBDevices from './components/usb/USBDevices';

const App = () => {
  const [devices, setDevices] = useState([]);
  const [usb, setUsb] = useState([])
  const [blu,setBlue] = useState([])
  const [postVisible, setPostVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [activeSection, setActiveSection] = useState('monitoring');
  const [fetchDevices, isDevices, devicesError] = useFetch(async () => {
    const response = await getAllDevice();
    setDevices(response.data.slice(0, 9));
  });

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleDeviceClick = (selectedDevice) => {
    setSelectedDevice({
      temperature: selectedDevice.temperature,
      pressure: selectedDevice.pressure,
      rotation_speed: selectedDevice.rotation_speed,
    });
  };

  const renderPopover = () => (
    <Popover id="popover-basic">
      <Popover.Body>
        Неполадки произошли на устройствах:
        <br />
        <span>EQUIP-003 повышение температуры EQUIP-002 повышение давления</span>
      </Popover.Body>
    </Popover>
  );

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  async function getDevice(){
    navigator.usb.requestDevice({ filters: [] })
      .then(device => {
        console.log(device);   
        setUsb(device)    
      })
      .catch(error => { console.error(error); });
  }
  async function getTel(){    const device = await navigator.bluetooth.requestDevice({
    services: ["battery_service", "device_information"],
    acceptAllDevices: true,
  }).then(device => {
    setBlue(device)
  })
  .catch(error => { console.error(error); });
}
  return (
    <div>
      <Header />
      <div className="main">
        <div>
          <Navbar className="bg-body-tertiary hover">
            <Container>
              <Navbar.Brand
                href="#home"
                onClick={() => handleSectionClick('monitoring')}
              >
                Мониторинг
              </Navbar.Brand>
            </Container>
          </Navbar>
          <br />
          <Navbar className="bg-body-tertiary hover">
            <Container>
              <Navbar.Brand onClick={() => handleSectionClick('control')}>
                Управление
              </Navbar.Brand>
            </Container>
          </Navbar>
          <br />
          <Navbar className="bg-body-tertiary hover">
            <Container>
              <Navbar.Brand
                href="#home"
                onClick={() => handleSectionClick('statistics')}
              >
                Статистика
              </Navbar.Brand>
            </Container>
          </Navbar>
          <br />
          <Navbar className="bg-body-tertiary">
            <Container>
              <Navbar.Brand
                href="#home"
                onClick={() => handleSectionClick('settings')}
              >
                Настройки
              </Navbar.Brand>
            </Container>
          </Navbar>
        </div>
        <div>
          {activeSection === 'monitoring' && (
            <>
              <h2>Информация об оборудовании</h2>
              <div className="table-container">
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
                    {devices.map((device) => (
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
              </div>
              <div className="crash">
                <OverlayTrigger
                  trigger="hover"
                  placement="bottom"
                  overlay={renderPopover()}
                >
                  <div className="crash-info">
                    <div className="crash-name">Количество Происшествий: 2</div>
                  </div>
                </OverlayTrigger>
                <Button variant="secondary" onClick={() => setPostVisible(true)}>
                  Отправить информацию
                </Button>
                
              </div>
              <div className='crash' style={{marginTop:20}}>
              <Button variant="secondary" onClick={getDevice}>Подключенние устройства по USB</Button>
              <Button variant="secondary" onClick={getTel}>Подключенние устройства по Bluetooth</Button>
              </div>
              <div className='crash'>
                <div style={{ fontSize: 20 }}>{usb && [usb.productName," ", usb.manufacturerName]}</div>
                <div style={{ fontSize: 20 }}>{blu && blu.name}</div>
              </div>
              <Crash
                crash={2}
                show={postVisible}
                onHide={() => setPostVisible(false)}
              />
			                <div className="graph-container">
                {selectedDevice && <Graph device={selectedDevice} />}
              </div>
            </>
          )}
          {activeSection === 'control' && (
  <div className="grid-container">
    {devices.map((device) => (
      <div className="grid-item" key={device.id}>
        <Control device={device} />
      </div>
    ))}
  </div>
)}
          {activeSection === 'statistics' && <Stats />}
        </div>
      </div>
    </div>
  );
};

export default App;