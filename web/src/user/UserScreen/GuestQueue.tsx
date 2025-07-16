import React, { useEffect, useState } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { data, useNavigate, useSearchParams } from 'react-router-dom';
import GuestService, { getQueueDetail } from '../Service/GuestService';

const GuestQueue = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queueCode = searchParams.get("code") || "";  // URL로부터 대기코드 전달받음
  const queueId = searchParams.get("id") || "";             // 큐 ID
  const phoneNumber = searchParams.get("id") || "";
  const name = searchParams.get("name") || "";
  const count = Number(searchParams.get("count")) || 0;

  const [peopleAhead, setPeopleAhead] = useState<number>(0);

  
  useEffect(() => {
    const fetchDetails = async () => {
      if (!queueId) return;
      try {
        const details = await getQueueDetail(Number(queueId));
        const totalCount = details.reduce((sum: number, item: { count: number }) => sum + item.count, 0);
        setPeopleAhead(totalCount);
      } catch (err) {
        console.error("대기열 정보 불러오기 실패", err);
      }
    };
    fetchDetails();
  }, [queueId]);
  

  const handleCopy = () => {
    navigator.clipboard.writeText(queueCode);
    alert("대기 코드를 복사했습니다.");
  };

  const identity = { phoneNumber, name, count };

  const handleCancel = async () => {
    try {
      await GuestService.cancelQueue(queueId, identity);
      alert("대기열이 취소되었습니다.");
      navigate("/");
    } catch (err) {
      console.error("대기열 취소 실패", err);
      alert("대기열 취소 중 오류가 발생했습니다.");
    }
  };

  const handleDelay = async () => {
    if (!queueId || !queueCode) return;
    try {
      await GuestService.delayQueue(queueId, identity);
      alert("대기가 미뤄졌습니다.");
      window.location.reload();
    } catch (err) {
      console.error("대기 미루기 실패", err);
      alert("대기를 미루는 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container style={{ maxWidth: 480, minHeight: '100vh' }} className="d-flex flex-column justify-content-start align-items-center py-4">
      <div className="w-100 px-3">
        <Card className="text-center p-4 shadow-sm border-0">
          <Card.Body>
            <div className="mb-2">
              <span role="img" aria-label="user">👥</span> 앞에 <strong>{peopleAhead}명</strong> 대기 중
            </div>

            <div className="progress mb-3" style={{ height: 6 }}>
              <div className="progress-bar bg-primary" style={{ width: `${Math.min((peopleAhead / 10) * 100, 100)}%` }}></div>
            </div>

            <div className="mb-2">나의 대기열 코드</div>
            <div
              className="border rounded py-2 px-3 mb-2"
              style={{ fontWeight: 'bold', letterSpacing: 1.2, backgroundColor: '#f5f5f5', cursor: 'pointer' }}
              onClick={handleCopy}
            >
              {queueCode}
            </div>
            <div className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>누르면 복사됩니다</div>

            <Row className="mb-2 gx-2">
              <Col>
                <Button variant="secondary" className="w-100" disabled>
                  로그인 후 알림받기
                </Button>
              </Col>
              <Col>
                <Button variant="outline-danger" className="w-100" onClick={handleCancel}>
                  대기 취소
                </Button>
              </Col>
            </Row>

            <Button variant="primary" className="w-100" onClick={handleDelay}>
              대기 미루기
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default GuestQueue;