import React from 'react';
import { router } from '@inertiajs/react';
import { Form, Input, Button, TimePicker } from 'antd';
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

const FORMAT = 'HH:mm';

// Converte stringa "08:30" in dayjs sicuro
const StringToTime = (val: any) => {
  if (!val) return null;
  if (dayjs.isDayjs(val)) return val;
  const parsed = dayjs(`1970-01-01T${val}`);
  return parsed.isValid() ? parsed : null;
};

const Edit: Page<Props> = ({ office }) => {

  const handleSubmit = (values: any) => {

    const TimeToString = (val: any) => {
        if (!val) return null;
        if (dayjs.isDayjs(val)) return val.format(FORMAT);
        return val;
    };

    const payload = {
        nome:                 values.nome,
        inizioOrarioIngresso: TimeToString(values.inizioOrarioIngresso),
        fineOrarioIngresso:   TimeToString(values.fineOrarioIngresso),
        inizioOrarioUscita:   TimeToString(values.inizioOrarioUscita),
        fineOrarioUscita:     TimeToString(values.fineOrarioUscita),
    };

    router.put(`/offices/${office.id}`, payload, {
      onError: (errors) => console.log(errors),
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Edit Office</h1>
      <Form
        initialValues={office}
        onFinish={handleSubmit}
        style={{ maxWidth: 400 }}
      >
        <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="inizioOrarioIngresso"
          label="Inizio Ingresso"
          rules={[{ required: true }]}
          getValueProps={(val) => ({ value: StringToTime(val) })}
        >
          <TimePicker format={FORMAT} />
        </Form.Item>

        <Form.Item
          name="fineOrarioIngresso"
          label="Fine Ingresso"
          rules={[{ required: true }]}
          getValueProps={(val) => ({ value: StringToTime(val) })}
        >
          <TimePicker format={FORMAT} />
        </Form.Item>

        <Form.Item
          name="inizioOrarioUscita"
          label="Inizio Uscita"
          rules={[{ required: true }]}
          getValueProps={(val) => ({ value: StringToTime(val) })}
        >
          <TimePicker format={FORMAT} />
        </Form.Item>

        <Form.Item
          name="fineOrarioUscita"
          label="Fine Uscita"
          rules={[{ required: true }]}
          getValueProps={(val) => ({ value: StringToTime(val) })}
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