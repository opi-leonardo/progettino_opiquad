import React from 'react';
import { router } from '@inertiajs/react';
import { Form, Input, Button, TimePicker, Typography, notification } from 'antd';
import Layout from '../Layout';
import dayjs from 'dayjs';

interface Office {
  id: number;
  nome: string;
  inizioOrarioIngresso: string;
  fineOrarioIngresso: string;
  inizioOrarioUscita: string;
  fineOrarioUscita: string;
}

interface Props {
  office: Office;
}

type Page<P = {}> = React.FC<P> & {
  layout?: (page: React.ReactElement) => React.ReactNode;
};

const FORMAT = "HH:mm";

const Edit: Page<Props> = ({ office }) => {

  const { Title } = Typography; 

  const initialValues = {
    ...office,
    inizioOrarioIngresso: office.inizioOrarioIngresso ? dayjs(office.inizioOrarioIngresso, "HH:mm:ss") : null,
    fineOrarioIngresso: office.fineOrarioIngresso ? dayjs(office.fineOrarioIngresso, "HH:mm:ss") : null,
    inizioOrarioUscita: office.inizioOrarioUscita ? dayjs(office.inizioOrarioUscita, "HH:mm:ss") : null,
    fineOrarioUscita: office.fineOrarioUscita ? dayjs(office.fineOrarioUscita, "HH:mm:ss") : null,
  };


  const handleSubmit = (values: any) => {
    console.log(values)

    const formatted = {
      ...values,
      inizioOrarioIngresso: values.inizioOrarioIngresso.format('HH:mm'),
      fineOrarioIngresso: values.fineOrarioIngresso.format('HH:mm'),
      inizioOrarioUscita: values.inizioOrarioUscita.format('HH:mm'),
      fineOrarioUscita: values.fineOrarioUscita.format('HH:mm'),
    };

    router.put(`/offices/${office.id}`, formatted, {
      onError: (errors) => {
        notification.error({ title: Object.values(errors)[0] });
        console.log(errors)},
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <Title level={2} style={{ margin: 0, marginBottom:'20px' }}>
        Edit Office
      </Title>
      <Form
        initialValues={initialValues}
        onFinish={handleSubmit}
        style={{ maxWidth: 400 }}
      >
        <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="inizioOrarioIngresso"
          label="Inizio Ingresso"
          rules={[{ required: true, message: 'Seleziona l’orario'  }]}
        >
          <TimePicker format={FORMAT} />
        </Form.Item>

        <Form.Item
          name="fineOrarioIngresso"
          label="Fine Ingresso"
          rules={[{ required: true, message: 'Seleziona l’orario'  }]}
        >
          <TimePicker format={FORMAT} />
        </Form.Item>

        <Form.Item
          name="inizioOrarioUscita"
          label="Inizio Uscita"
          rules={[{ required: true, message: 'Seleziona l’orario'  }]}
        >
          <TimePicker format={FORMAT} />
        </Form.Item>

        <Form.Item
          name="fineOrarioUscita"
          label="Fine Uscita"
          rules={[{ required: true, message: 'Seleziona l’orario'  }]}
        >
          <TimePicker format={FORMAT} />
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