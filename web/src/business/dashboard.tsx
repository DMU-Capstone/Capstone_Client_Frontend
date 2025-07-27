import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import QueueChart from './components/QueueChart'
import StatsPanel from './components/StatsPanel';

const Dashboard: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#1e1e1e', minHeight: '100vh', color: 'white', padding: '50px' }}>
      {/* 상단: 로고 + 사용자 */}
      <Row className="align-items-center mb-4">
        <Col md="auto">
          <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
        </Col>
        <Col>
          <h4 className="mb-0">○○○님</h4>
          <small>2025.05.13 오후 18:30</small>
        </Col>
      </Row>

      {/* 본문: 그래프 + 정보 박스 */}
      <Row className="g-4"> {/* ✅ g-4: 컬럼 간 여백 */}
        <Col md={8}>
          <QueueChart />
        </Col>
        <Col md={4}>
          <StatsPanel />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;