import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import vehicleService from '../Service/vehicleService';
import { useNavigate } from 'react-router-dom'



const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    regNumber: '',
    ownerName: '',
    address: '',
    brand: '',
    year: '',
    cylinderCapacity: '',
    color: 'Merah',
    fuel: ''
  });

  const [vehicleData, setVehicleData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [yearError, setYearError] = useState('')
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
    if (id === 'year') {
      if(parseInt(value) > 2024) {
        setYearError('Tahun tidak boleh lebih dari 2024')
      } else {
        setYearError('')
      }
    }
    setFormData({
      ...formData,
      [id]: value
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(yearError) {
      alert(yearError)
      return;
    }
    
    const newVehicle = {
      regNumber: formData.regNumber,
      ownerName: formData.ownerName,
      address: formData.address,
      brand: formData.brand,
      year: parseInt(formData.year, 10),
      cylinderCapacity: parseInt(formData.cylinderCapacity, 10),
      color: formData.color,
      fuel: formData.fuel
    };

    const isRegNumberExists = vehicleData.some(vehicle => vehicle.regNumber === newVehicle.regNumber)

    if (isRegNumberExists) {
      setShowAlert(true);
      return;
    }

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
      navigate('/');
    } catch (error) {
      console.error('Error submitting vehicle data:', error);
    }
  };
  const goBackVehicleDataForm = () => { 
    navigate('/');
  };
  return (
    <Container>
      <h2 className="my-4">Tambah Data Kendaraan</h2>
      {showAlert && <Alert variant="danger">Nomor registrasi kendaraan {formData.regNumber} sudah ada</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="regNumber">
              <Form.Label>Nomor Registrasi Kendaraan</Form.Label>
              <Form.Control type="text" value={formData.regNumber} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="year">
              <Form.Label>Tahun Pembuatan</Form.Label>
              <Form.Control type="number" value={formData.year} onChange={handleChange} max='2024' min='1900' maxLength={4} />
              yearError && <alert variant='danger'>{yearError}</alert>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
        <Col>
            <Form.Group controlId="ownerName">
              <Form.Label>Nama Pemilik</Form.Label>
              <Form.Control type="text" value={formData.ownerName} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="cylinderCapacity">
              <Form.Label>Kapasitas Silinder</Form.Label>
              <Form.Control type="number" value={formData.cylinderCapacity} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="brand">
              <Form.Label>Merk Kendaraan</Form.Label>
              <Form.Control type="text" value={formData.brand} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="color">
                <Form.Label>Warna Kendaraan</Form.Label>
                <Form.Control as="select" value={formData.color} onChange={handleChange}>
                    <option value="Merah">Merah</option>
                    <option value="Hitam">Hitam</option>
                    <option value="Biru">Biru</option>
                    <option value="Abu-Abu">Abu-Abu</option>
                </Form.Control>
            </Form.Group>
          </Col>
          
        </Row>
        <Row className="mb-3">
        <Col>
            <Form.Group controlId="address">
                <Form.Label>Alamat</Form.Label>
                <Form.Control as="textarea" rows={3} value={formData.address} onChange={handleChange} />
            </Form.Group>   
          </Col>
          <Col>
            <Form.Group controlId="fuel">
              <Form.Label>Bahan Bakar</Form.Label>
              <Form.Control type="text" value={formData.fuel} onChange={handleChange} />
            </Form.Group>
          </Col>
          
        </Row>
        
        <Button variant="primary" type="submit" className="mt-3">Simpan</Button>
        <Button variant="secondary" type="submit" className="mt-3" onClick={goBackVehicleDataForm} style={{ marginLeft: '1rem' }}>Kembali</Button>
      </Form>

      
    </Container>
  );
};

export default AddVehicleForm;