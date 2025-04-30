import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';

const ClinicInfo = () => {
  const [clinicInfo, setClinicInfo] = useState({
    name: 'Klinik Puskesmas UNKLAB',
    description: 'Pusat layanan kesehatan Universitas Klabat',
    address: 'Jl. Arnold Mononutu, Airmadidi, Minahasa Utara, Sulawesi Utara',
    phone: '(0431) 891035',
    email: 'klinik@unklab.ac.id',
    workingHours: [
      { day: 'Senin - Jumat', hours: '08:00 - 17:00' },
      { day: 'Sabtu', hours: '08:00 - 12:00' },
      { day: 'Minggu', hours: 'Tutup' }
    ],
    services: [
      'Konsultasi Umum',
      'Pemeriksaan Kesehatan',
      'Vaksinasi',
      'Rawat Luka',
      'Laboratorium Dasar',
      'Farmasi'
    ]
  });
  
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isStaff } = useAuth();
  
  useEffect(() => {
    const fetchClinicData = async () => {
      try {
        // Fetch clinic information from API
        const info = await apiService.getClinicInfo();
        if (info) setClinicInfo(info);
        
        // Fetch doctors information
        const doctorsData = await apiService.getDoctors();
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Failed to fetch clinic data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClinicData();
  }, []);
  
  // Function for staff to update clinic information
  const handleUpdateInfo = async (updatedInfo) => {
    if (!isStaff) return;
    
    try {
      const updated = await apiService.updateClinicInfo(updatedInfo);
      setClinicInfo(updated);
    } catch (error) {
      console.error("Failed to update clinic info:", error);
    }
  };
  
  if (loading) {
    return <div className="text-center my-5">Loading clinic information...</div>;
  }
  
  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">{clinicInfo.name}</h1>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Tentang Kami</Card.Title>
              <Card.Text>{clinicInfo.description}</Card.Text>
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Layanan Kami</Card.Title>
              <Row>
                {clinicInfo.services.map((service, index) => (
                  <Col md={6} key={index}>
                    <div className="service-item mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      {service}
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Dokter Kami</Card.Title>
              <Row>
                {doctors.map((doctor) => (
                  <Col md={6} key={doctor.id} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title>Dr. {doctor.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{doctor.specialization}</Card.Subtitle>
                        <Card.Text>
                          {doctor.schedule}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Kontak Kami</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  {clinicInfo.address}
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className="bi bi-telephone-fill me-2"></i>
                  {clinicInfo.phone}
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className="bi bi-envelope-fill me-2"></i>
                  {clinicInfo.email}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Jam Operasional</Card.Title>
              <ListGroup variant="flush">
                {clinicInfo.workingHours.map((schedule, index) => (
                  <ListGroup.Item key={index}>
                    <div className="d-flex justify-content-between">
                      <span>{schedule.day}</span>
                      <span>{schedule.hours}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          
          {isAuthenticated && (
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Buat Janji Temu</Card.Title>
                <Card.Text>
                  Silahkan login untuk membuat janji temu dengan dokter kami.
                </Card.Text>
                <Button variant="primary" className="w-100">Buat Janji</Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      
      {isStaff && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Admin Panel</Card.Title>
            <Button variant="warning" className="me-2">Edit Informasi Klinik</Button>
            <Button variant="info">Kelola Jadwal Dokter</Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ClinicInfo;