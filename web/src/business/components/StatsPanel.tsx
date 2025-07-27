import * as React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const stats = [
  { label: '한 큐당 손님의 수 (명)', value: '1.75', color: 'text-success' },
  { label: '평균 대기 시간 (분)', value: '23.65', color: 'text-warning' },
  { label: '피크타임 (시각 / 인원)', value: '15 / 50', color: 'text-danger' },
  { label: '평균 대기열 수', value: '12', color: 'text-light' },
];

const StatsPanel: React.FC = () => {
  return (
    <div>
      {stats.map((s, idx) => (
        <Card key={idx} className="mb-3 bg-secondary text-white">
          <Card.Body>
            <Card.Title className="small">{s.label}</Card.Title>
            <h4 className={s.color}>{s.value}</h4>
          </Card.Body>
        </Card>
      ))}
      <Card className="bg-dark text-light">
        <Card.Body>
          <Card.Title>AI 요약</Card.Title>
          <Card.Text>AI 요약을 생성중입니다...</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StatsPanel;