import React, { useState, FormEvent } from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Button, Input, Form, Select, TimePicker} from 'antd';
import Layout from '../Layout';


type Page<P = {}> = React.FC<P> & {
  layout?: (page: React.ReactElement) => React.ReactNode;
};

const Create: Page = ({ }) => {
  const [nome, setName] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});


    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const App = () => {
        const [form] = Form.useForm();
    };

    const handleSubmit = (values: any) => {
    const formatted = {
        ...values,
        inizioOrarioIngresso: values.inizioOrarioIngresso.format('HH:mm'),
        fineOrarioIngresso: values.fineOrarioIngresso.format('HH:mm'),
        inizioOrarioUscita: values.inizioOrarioUscita.format('HH:mm'),
        fineOrarioUscita: values.fineOrarioUscita.format('HH:mm'),
    };

    Inertia.post('/offices', formatted, {
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
        Create Office
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

    <Form.Item
    name="inizioOrarioIngresso"
    label="Inizio Orario Ingresso"
    rules={[{ required: true, message: 'Seleziona l’orario' }]}
    >
    <TimePicker format="HH:mm" />
    </Form.Item>

    <Form.Item
        name="fineOrarioIngresso"
        label="Fine Orario Ingresso"
        rules={[{ required: true, message: 'Seleziona l’orario' }]}
        >
        <TimePicker format="HH:mm" />
    </Form.Item>

    <Form.Item
        name="inizioOrarioUscita"
        label="Inizio Orario Uscita"
        rules={[{ required: true, message: 'Seleziona l’orario' }]}
        >
        <TimePicker format="HH:mm" />
    </Form.Item>

    <Form.Item
        name="fineOrarioUscita"
        label="Fine Orario Uscita"
        rules={[{ required: true, message: 'Seleziona l’orario' }]}
        >
        <TimePicker format="HH:mm" />
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