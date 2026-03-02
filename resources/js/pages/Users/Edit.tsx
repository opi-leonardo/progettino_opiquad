import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Form, Input, Button, Typography, Select, notification, Alert } from 'antd';
import Layout from '../Layout';

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
  workingHours: string;
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

  console.log(user)
  const initialValues = user ? {    
    ...user, 
    giornoCorto: Number(user.giornoCorto),
    office_id: Number(user.office_id)
  } : undefined;

  const handleSubmit = (values: any) => {

    if (user) {
      router.put(`/users/${user.id}`, values, {
        onError: (errors) => {
          notification.error({ title: Object.values(errors)[0] });
          },
      });
    } else {
      router.post('/users', values, {
        onError: (errors) => {
          notification.error({ title: Object.values(errors)[0] });
        },
      });
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <Title level={2} style={{ margin: 0, marginBottom:'20px' }}>
        {user ? 'Edit User' : 'Create User'}
      </Title>

  {offices.length === 0 && (
        <Alert
          description={
            <span>
              Nessun ufficio trovato. Devi creare almeno un ufficio prima di poter salvare un utente.{' '}
              <Link href="/offices/create" style={{ fontWeight: 'bold' }}>
                Clicca qui per crearne uno.
              </Link>
            </span>
          }
          type="warning"
          showIcon
          style={{ marginBottom: '20px' }}
        />
      )}

      <Form
        initialValues={initialValues}
        onFinish={handleSubmit}
        labelAlign="left"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}
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

        <Form.Item name="oreDiLavoro" label="Ore di Lavoro" rules={[{ required: true }]}>
          <Input type={'number'} min="0,01" max="24,00"/>
        </Form.Item>

        <Form.Item name="giornoCorto" label="Giorno Corto">
          <Select placeholder="Seleziona un giorno">
            <Select.Option value={null}>Nessun giorno</Select.Option>
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
          name="office_id"
          label="Ufficio"
          rules={[{ required: true }]}
        >
          <Select placeholder="Seleziona un ufficio">
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