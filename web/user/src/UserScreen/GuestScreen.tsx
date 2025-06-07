import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, Form, Button } from 'react-bootstrap';


type FormData = {
  phoneNumber: string;
  name: string;
  peopleCount: number;
};

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^010-\d{4}-\d{4}$/, '휴대폰 번호 형식이 올바르지 않습니다.')
    .required('휴대폰 번호는 필수입니다.'),
  name: yup.string().required('대표자 이름은 필수입니다.'),
  peopleCount: yup
    .number()
    .typeError('인원수는 숫자여야 합니다.')
    .min(1, '최소 1명 이상이어야 합니다.')
    .required('인원수는 필수입니다.'),
});

export default function QueueRegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log('전송할 데이터:', data);
    // 여기에 API 연동하면 됨
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', maxWidth: 480 }}>
      <div className="w-100 px-3">
        <Button variant="link" className="mb-3 px-0" onClick={() => window.history.back()}>
          ←
        </Button>
        <h5 className="fw-bold mb-4">대기열에 등록하기 위한 정보를 입력해주세요.</h5>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>휴대폰 번호</Form.Label>
            <Form.Control type="text" placeholder="010-1111-1111" {...register('phoneNumber')} />
            <Form.Text className="text-danger">{errors.phoneNumber?.message}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>대표자 이름</Form.Label>
            <Form.Control type="text" placeholder="홍길동" {...register('name')} />
            <Form.Text className="text-danger">{errors.name?.message}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>인원수</Form.Label>
            <Form.Control type="number" placeholder="1" {...register('peopleCount')} />
            <Form.Text className="text-danger">{errors.peopleCount?.message}</Form.Text>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            확인
          </Button>
        </Form>
      </div>
    </Container>
  );
}