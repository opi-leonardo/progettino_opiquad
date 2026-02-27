import React from 'react';
import { router } from '@inertiajs/react';
import { Form, Input, Button, TimePicker, Typography, Select, notification } from 'antd';
import Layout from '../Layout';
import dayjs from 'dayjs';

interface Office {
  id: number;
  nome: string;
}

interface User {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  giornoCorto: string;
  office_id?: string;
  offices?: { id: number; name: string } | null;
}

interface Props {
  user: User;
  offices: Office[];
}

type Page<P = {}> = React.FC<P> & {
  layout?: (page: React.ReactElement) => React.ReactNode;
};

const Edit: Page<Props> = ({ user, offices }) => {

  const { Title } = Typography; 
  

  const handleSubmit = (values: any) => {

    router.put(`/users/${user.id}`, values, {
      onError: (errors) => {
        notification.error({ title: Object.values(errors)[0] });
        console.log(errors)},
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <Title level={2} style={{ margin: 0, marginBottom:'20px' }}>
        Edit User
      </Title>
      <Form
        initialValues={{    ...user, giornoCorto: Number(user.giornoCorto),officeId: Number(user.office_id),}}
        onFinish={handleSubmit}
        style={{ maxWidth: 400 }}
      >
        <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="cognome" label="Cognome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input type={'email'}/>
        </Form.Item>

        <Form.Item name="giornoCorto" label="Giorno" rules={[{ required: true, message: 'Seleziona un giorno' }]}>
          <Select placeholder="Seleziona un giorno">
          <Select.Option value={0}>Lunedì</Select.Option>
          <Select.Option value={1}>Martedì</Select.Option>
          <Select.Option value={2}>Mercoledì</Select.Option>
          <Select.Option value={3}>Giovedì</Select.Option>
          <Select.Option value={4}>Venerdì</Select.Option>
          <Select.Option value={5}>Sabato</Select.Option>
          <Select.Option value={6}>Domenica</Select.Option>
        </Select>
        </Form.Item>

        <Form.Item
          name="officeId"
          label="Office"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select an office">
            {offices.map((office) => (
              <Select.Option key={office.id} value={office.id}>
                {office.id}: {office.nome}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit">Salva</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

Edit.layout = page => <Layout>{page}</Layout>;

export default Edit;