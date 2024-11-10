import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VehicleDataForm from '../src/monitoring/VehicleDataForm';
import AddVehicleForm from '../src/Tambah Data/AddVehicleForm';
import EditVehicleForm from '../src/Edit Data/EditVehicleForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehicleDataForm />} />
        <Route path="/addvehicleform" element={<AddVehicleForm />} />
        <Route path="/editvehicleform" element={<EditVehicleForm />} />
      </Routes>
    </Router>
  );
}

export default App;
