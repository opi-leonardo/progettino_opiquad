import React, { useState, FormEvent } from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Button, Input, Form, Select } from 'antd';
import Layout from '../Layout';


interface Office {
  id: number;
  name: string;
}

interface Props {
  offices: Office[];
}

type Page<P = {}> = React.FC<P> & {
  layout?: (page: React.ReactElement) => React.ReactNode;
};

const Create: Page<Props> = ({ offices }) => {
  const [nome, setName] = useState<string>('');
  const [cognome, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});


  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const App = () => {
    const [form] = Form.useForm();
  };

  const handleSubmit = (values: any) => {
    Inertia.post('/users', values, {
      onError: (errors) => {
        console.log(errors);
      },
    });
  };

  return (
    <div style={{     
      height: '100vh',
      width: '100vh',
      display: 'flex',
      padding: 70,
      flexDirection: 'column',
      }}>

      <h1>
        Create User
      </h1>

      <Form
        {...layout}
        onFinish={handleSubmit}
        style={{ maxWidth: 400 }}
      >

      <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
      <Input 
        type='text' 
        value={nome}
        onChange={e => setName(e.target.value)}
        required
      />
      </Form.Item>

      <Form.Item name="cognome" label="Cognome" rules={[{ required: true }]}>
      <Input 
        type='text' 
        value={cognome}
        onChange={e => setLastname(e.target.value)}
        required
      />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
      <Input 
        type='email' 
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      </Form.Item>

      <Form.Item
        name="giornoCorto"
        label="Giorno"
        rules={[{ required: true, message: 'Seleziona un giorno' }]}
      >
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
                {office.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
  );
};

Create.layout = page => <Layout>{page}</Layout>;

export default Create;