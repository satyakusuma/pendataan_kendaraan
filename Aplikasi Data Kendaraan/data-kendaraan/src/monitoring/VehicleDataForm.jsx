import './styles.css'
import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Button, Table, Row, Modal } from 'react-bootstrap';
import vehicleService from '../Service/vehicleService';
import { useNavigate } from 'react-router-dom';

const VehicleDataForm = () => {
  const [formData, setFormData] = useState({
    regNumber: '',
    ownerName: '',
    address: '',
    brand: '',
    year: '',
    cylinderCapacity: '',
    color: '',
    fuel: ''
  });

  const [vehicleData, setVehicleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicleData();
  }, []);

  const fetchVehicleData = async () => {
    try {
      const response = await vehicleService.getVehicles();
      setVehicleData(response.data);
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newVehicle = {
      regNumber: formData.regNumber,
      ownerName: formData.ownerName,
      address: formData.address,
      brand: formData.brand,
      year: parseInt(formData.year, 10),
      cylinderCapacity: parseInt(formData.cylinderCapacity, 10),
      fuel: formData.fuel,
      color: formData.color
      
    };

    console.log('Submitting vehicle data:', JSON.stringify(newVehicle, null, 2));
    
    try {
      await vehicleService.createVehicle(newVehicle);
      setVehicleData([...vehicleData, newVehicle]);
      setFormData({
        regNumber: '',
        ownerName: '',
        address: '',
        brand: '',
        year: '',
        cylinderCapacity: '',
        color: '',
        fuel: ''
      });
    } catch (error) {
      console.error('Error submitting vehicle data:', error);
    }
  };

  const handleDelete = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await vehicleService.deleteVehicle(selectedVehicle.regNumber);
      fetchVehicleData();
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredVehicleData = vehicleData.filter((vehicle) => 
    vehicle.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
    vehicle.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    vehicle.address.toLowerCase().includes(searchTerm.toLowerCase()) || 
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
    vehicle.color.toLowerCase().includes(searchTerm.toLowerCase()) || 
    vehicle.fuel.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const handleAddVehicle = () => { 
    navigate('/addvehicleform');
  };

  const handlegoEditVehicleForm = (vehicle) => { 
    navigate('/editvehicleform', { state: { vehicle } });
  };

  const getColorStyle = (color) => {
    console.log("Color received:", color);
    switch (color.toLowerCase()) {
      case 'merah':
        return 'red';  
      case 'biru':
        return 'blue';
      case 'abu-abu':
        return 'grey';
      case 'hitam':
        return 'black';
      default:
        return 'white';  
    }
  };
  
  

  return (
    <Container>
      <h2 className="my-4">Aplikasi Data Kendaraan</h2>
      <Form onSubmit={handleSubmit} style={{ backgroundColor: 'pink', padding: '20px', borderRadius: '5px' }}>
        <Col md={4}>
          <Form.Group controlId="regNumber">
            <Form.Label>Nomor Registrasi Kendaraan</Form.Label>
            <Form.Control type="text" value={formData.regNumber} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="ownerName">
            <Form.Label>Nama Pemilik</Form.Label>
            <Form.Control type="text" value={formData.ownerName} onChange={handleChange} required />
          </Form.Group>
        </Col>
      </Form>
      <Row className="d-flex justify-content-end mt-4"> 
          <Col md="auto">
            <Button variant="primary" onClick={handleAddVehicle} className="mr-2">Tambah Kendaraan</Button>
          </Col>
          <Col md="auto">
            <Button variant="primary" onClick={handleSearch}>Search</Button> 
          </Col> 
      </Row>
      {vehicleData.length > 0 && (
        <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th style={{ textAlign: 'center', backgroundColor: '#add8e6' }}>No</th>
            <th style={{ textAlign: 'center', backgroundColor: '#add8e6' }}>Nomor Registrasi Kendaraan</th>
            <th style={{ textAlign: 'center', backgroundColor: '#add8e6' }}>Nama Pemilik</th>
            <th style={{ textAlign: 'center', backgroundColor: '#add8e6' }}>Merk Kendaraan</th>
            <th style={{ textAlign: 'center', backgroundColor: '#add8e6' }}>Tahun Pembuatan</th>
            <th style={{ textAlign: 'center', backgroundColor: '#add8e6' }}>Kapasitas Silinder</th>
            <th style={{ textAlign: 'center', backgroundColor: '#add8e6' }}>Warna Kendaraan</th>
            <th style={{ textAlign: 'center', backgroundColor: '#add8e6' }}>Bahan Bakar</th>
            <th style={{ textAlign: 'center', backgroundColor: '#add8e6' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicleData.map((vehicle, index) => {
            const rowBackgroundColor = getColorStyle(vehicle.color);
            //console.log("Row color:", rowBackgroundColor);
            return (
              <tr key={index} >
                <td style={{ textAlign: 'center', backgroundColor: rowBackgroundColor }}>{index + 1}</td>
                <td style={{ textAlign: 'center', backgroundColor: rowBackgroundColor }}>{vehicle.regNumber}</td>
                <td style={{ backgroundColor: rowBackgroundColor}}>{vehicle.ownerName} </td>
                <td style={{ textAlign: 'center', backgroundColor: rowBackgroundColor }}>{vehicle.brand}</td>
                <td style={{ backgroundColor: rowBackgroundColor}} >{vehicle.year}</td>
                <td style={{ backgroundColor: rowBackgroundColor}} >{vehicle.cylinderCapacity} cc</td>
                <td style={{ backgroundColor: rowBackgroundColor}} >{vehicle.color}</td>
                <td style={{ backgroundColor: rowBackgroundColor}} >{vehicle.fuel}</td>
                <td style={{ backgroundColor: rowBackgroundColor}} >
                  <span
                    style={{ color: 'blue', cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => handlegoEditVehicleForm(vehicle)}
                  >
                    Detail
                  </span>
                  <span
                    style={{ color: 'blue', cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => handlegoEditVehicleForm(vehicle)}
                  >
                    Edit
                  </span>
                  <span
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => handleDelete(vehicle)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Apakah Anda yakin ingin menghapus data ${selectedVehicle?.regNumber} ?`}
        </Modal.Body>
        <Modal.Footer> 
          <Button variant="primary" onClick={confirmDelete}> 
            OK
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}> 
            Batal 
          </Button>  
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default VehicleDataForm;
