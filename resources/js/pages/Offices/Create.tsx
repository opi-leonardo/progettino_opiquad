import React, { useState, FormEvent } from 'react';
import { router } from '@inertiajs/react';

import { Button, Input, Form, Select, TimePicker, Typography, notification} from 'antd';
import Layout from '../Layout';


type Page<P = {}> = React.FC<P> & {
  layout?: (page: React.ReactElement) => React.ReactNode;
};

const Create: Page = ({ }) => {
  const [nome, setName] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

    const { Title } = Typography;
    
    const handleSubmit = (values: any) => {
    console.log(values)
      
    const formatted = {
        ...values,
        inizioOrarioIngresso: values.inizioOrarioIngresso.format('HH:mm'),
        fineOrarioIngresso: values.fineOrarioIngresso.format('HH:mm'),
        inizioOrarioUscita: values.inizioOrarioUscita.format('HH:mm'),
        fineOrarioUscita: values.fineOrarioUscita.format('HH:mm'),
    };

    router.post('/offices', formatted, {
        onError: (errors) => {
        console.log(errors);
        notification.error({ title: Object.values(errors)[0] });
        },
    });
  };

  return (
    <div style={{ padding: 40 }}>

      <Title level={2} style={{ margin: 0 , marginBottom: '20px'}}>
        Create Office
      </Title>

      <Form
        onFinish={handleSubmit}
        style={{ maxWidth: 400 }}
      >

      <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
        <Input 
          type='text' 
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
          rules={[ { required: true, message: 'Seleziona l’orario' }]}>
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
          rules={[{ required: true, message: 'Seleziona l’orario' }
        ]}>
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