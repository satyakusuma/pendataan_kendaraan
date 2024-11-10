import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import vehicleService from '../Service/vehicleService';

const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    regNumber: '',
    ownerName: '',
    address: '',
    brand: '',
    year: '',
    cylinderCapacity: '',
    color: '',
    fuel: 'Merah'
  });

  const [vehicleData, setVehicleData] = useState([]);

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
      color: formData.color,
      fuel: formData.fuel
    };

    console.log('Submitting vehicle data:', JSON.stringify(newVehicle, null, 2));
    
    try {
      await vehicleService.createVehicle(newVehicle);
      setVehicleData([...vehicleData, newVehicle]); // Update state directly
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

  return (
    <Container>
      <h2 className="my-4">Aplikasi Data Kendaraan</h2>
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
              <Form.Control type="number" value={formData.year} onChange={handleChange} maxLength={4} />
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
            <Form.Group controlId="fuel">
                <Form.Label>Warna Kendaraan</Form.Label>
                <Form.Control as="select" value={formData.fuel} onChange={handleChange}>
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
            <Form.Group controlId="color">
              <Form.Label>Bahan Bakar</Form.Label>
              <Form.Control type="text" value={formData.color} onChange={handleChange} />
            </Form.Group>
          </Col>
          
        </Row>
        
        <Button variant="primary" type="submit" className="mt-3">Simpan</Button>
        <Button variant="primary" type="submit" className="mt-3" style={{ marginLeft: '1rem' }}>Kembali</Button>
      </Form>

      
    </Container>
  );
};

export default AddVehicleForm;