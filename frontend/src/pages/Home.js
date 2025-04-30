import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, currentUser } = useAuth();

  const carouselItems = [
    {
      id: 1,
      image: '/images/clinic1.jpg',
      title: 'Selamat Datang di Klinik Puskesmas UNKLAB',
      description: 'Melayani dengan sepenuh hati untuk kesehatan Anda'
    },
    {
      id: 2,
      image: '/images/doctor1.jpg',
      title: 'Tim Dokter Profesional',
      description: 'Ditangani oleh dokter-dokter berkualitas dan berpengalaman'
    },
    {
      id: 3,
      image: '/images/facility1.jpg',
      title: 'Fasilitas Modern',
      description: 'Dilengkapi dengan fasilitas kesehatan terkini'
    }
  ];

  const services = [
    {
      title: 'Konsultasi Umum',
      icon: 'bi-heart-pulse',
      description: 'Layanan konsultasi kesehatan umum dengan dokter kami'
    },
    {
      title: 'Pemeriksaan Kesehatan',
      icon: 'bi-clipboard2-pulse',
      description: 'Layanan pemeriksaan kesehatan rutin dan komprehensif'
    },
    {
      title: 'Farmasi',
      icon: 'bi-capsule',
      description: 'Layanan penyediaan obat-obatan dengan farmasis berpengalaman'
    },
    {
      title: 'Vaksinasi',
      icon: 'bi-shield-plus',
      description: 'Layanan vaksinasi untuk berbagai jenis penyakit'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Carousel className="hero-carousel">
        {carouselItems.map(item => (
          <Carousel.Item key={item.id}>
            <div 
              className="carousel-image"
              style={{
                backgroundImage: `url(${item.image})`,
                height: '500px',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="carousel-overlay"></div>
            </div>
            <Carousel.Caption>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {!isAuthenticated && (
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="primary" 
                  size="lg" 
                  className="mt-3"
                >
                  Daftar Sekarang
                </Button>
              )}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Welcome Section */}
      <Container className="my-5">
        <Row>
          <Col lg={6}>
            <h2 className="mb-4">Selamat Datang di Klinik Puskesmas UNKLAB</h2>
            <p className="lead">
              Klinik Puskesmas UNKLAB merupakan pusat layanan kesehatan Universitas Klabat yang 
              berkomitmen memberikan layanan kesehatan terbaik bagi mahasiswa, staf, dan masyarakat umum.
            </p>
            <p>
              Dengan tenaga medis profesional dan fasilitas modern, kami siap melayani berbagai kebutuhan 
              kesehatan Anda. Kami percaya bahwa kesehatan yang baik adalah kunci keberhasilan pendidikan dan kehidupan.
            </p>
            <Button as={Link} to="/clinic-info" variant="outline-primary" className="mt-3">
              Selengkapnya Tentang Kami
            </Button>
          </Col>
          <Col lg={6} className="d-flex align-items-center justify-content-center">
            <div 
              className="welcome-image rounded shadow"
              style={{
                backgroundImage: 'url(/images/clinic-building.jpg)',
                height: '350px',
                width: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
          </Col>
        </Row>
      </Container>

      {/* Services Section */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Layanan Kami</h2>
          <Row>
            {services.map((service, index) => (
              <Col md={3} key={index} className="mb-4">
                <Card className="h-100 text-center service-card shadow-sm">
                  <Card.Body>
                    <div className="service-icon mb-3">
                      <i className={`bi ${service.icon} fs-1 text-primary`}></i>
                    </div>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button as={Link} to="/clinic-info" variant="primary">
              Lihat Semua Layanan
            </Button>
          </div>
        </Container>
      </div>

      {/* User Dashboard Shortcut Section */}
      {isAuthenticated && (
        <Container className="my-5">
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <h3>Selamat Datang, {currentUser.name}</h3>
                  <p>
                    Akses dashboard Anda untuk mengelola informasi kesehatan dan janji temu dengan dokter.
                  </p>
                </Col>
                <Col md={4} className="text-end">
                  <Button 
                    as={Link} 
                    to={`/${currentUser.role}/dashboard`} 
                    variant="success" 
                    size="lg"
                  >
                    Dashboard {currentUser.role === 'doctor' ? 'Dokter' : 
                              currentUser.role === 'staff' ? 'Staff' : 'Pasien'}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      )}

      {/* Contact Section */}
      <Container className="my-5">
        <Row>
          <Col md={6} className="mb-4">
            <h2>Hubungi Kami</h2>
            <p>Jika Anda memiliki pertanyaan atau membutuhkan informasi lebih lanjut, silakan hubungi kami:</p>
            <ul className="list-unstyled contact-list">
              <li className="mb-3">
                <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                Jl. Arnold Mononutu, Airmadidi, Minahasa Utara, Sulawesi Utara
              </li>
              <li className="mb-3">
                <i className="bi bi-telephone-fill me-2 text-primary"></i>
                (0431) 891035
              </li>
              <li className="mb-3">
                <i className="bi bi-envelope-fill me-2 text-primary"></i>
                klinik@unklab.ac.id
              </li>
              <li className="mb-3">
                <i className="bi bi-clock-fill me-2 text-primary"></i>
                Senin - Jumat: 08:00 - 17:00, Sabtu: 08:00 - 12:00
              </li>
            </ul>
          </Col>
          <Col md={6}>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5768188661125!2d124.9822799!3d1.4170598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870a9a66e48649%3A0x138668cbf31ef8c0!2sUniversitas%20Klabat!5e0!3m2!1sid!2sid!4v1651234567890!5m2!1sid!2sid" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Klinik Puskesmas UNKLAB Location"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;