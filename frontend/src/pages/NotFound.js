import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="text-center my-5 py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="error-container">
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="mb-4">Halaman Tidak Ditemukan</h2>
            <p className="lead mb-4">
              Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau dihapus.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button as={Link} to="/" variant="primary" size="lg">
                <i className="bi bi-house-door me-2"></i>
                Kembali ke Beranda
              </Button>
              <Button as={Link} to="/clinic-info" variant="outline-primary" size="lg">
                <i className="bi bi-info-circle me-2"></i>
                Informasi Klinik
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;