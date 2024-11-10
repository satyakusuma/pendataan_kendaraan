import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Button, Table, Row } from 'react-bootstrap';
import vehicleService from '../Service/vehicleService';
import { useNavigate } from 'react-router-dom'


const VehicleDataForm = () => {
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
  const [searchTerm, setSearchTerm] = useState(''); 
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
        fuel: 'Merah'
      });
    } catch (error) {
      console.error('Error submitting vehicle data:', error);
    }
  };

  const handleEdit = (vehicle) => {
    setFormData(vehicle);
  };

  const handleDelete = async (id) => {
    try {
      await vehicleService.deleteVehicle(id);
      fetchVehicleData();
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
  return (
    <Container>
      <h2 className="my-4">Aplikasi Data Kendaraan</h2>
        <Form onSubmit={handleSubmit}>
          <Col md={4}>
            <Form.Group controlId="regNumber" >
              <Form.Label>Nomor Registrasi Kendaraan</Form.Label>
              <Form.Control type="text" value={formData.regNumber} onChange={handleChange} required  />
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
              <th>No</th>
              <th>Nomor Registrasi Kendaraan</th>
              <th>Nama Pemilik</th>
              <th>Merk Kendaraan</th>
              <th>Tahun Pembuatan</th>
              <th>Kapasitas Silinder</th>
              <th>Warna Kendaraan</th>
              <th>Bahan Bakar</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicleData.map((vehicle, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{vehicle.regNumber}</td>
                <td>{vehicle.ownerName}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.cylinderCapacity}</td>
                <td>{vehicle.color}</td>
                <td>{vehicle.fuel}</td>
                <td>
                  <Button variant="info" onClick={() => handleEdit(vehicle)} className="mr-2">Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(vehicle.regNumber)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default VehicleDataForm;
