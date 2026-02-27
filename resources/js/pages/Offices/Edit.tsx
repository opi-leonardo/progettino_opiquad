import React from 'react';
import { router } from '@inertiajs/react';
import { Form, Input, Button, TimePicker, Typography, notification, Checkbox } from 'antd';
import Layout from '../Layout';
import dayjs from 'dayjs';

interface Office {
  id: number;
  nome: string;
  inizioOrarioIngresso: string;
  fineOrarioIngresso: string;
  inizioOrarioUscita: string;
  fineOrarioUscita: string;
  night_shift: 0 | 1;
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

  const initialValues = office ? {
    ...office,
    inizioOrarioIngresso: office.inizioOrarioIngresso ? dayjs(office.inizioOrarioIngresso, "HH:mm:ss") : null,
    fineOrarioIngresso: office.fineOrarioIngresso ? dayjs(office.fineOrarioIngresso, "HH:mm:ss") : null,
    inizioOrarioUscita: office.inizioOrarioUscita ? dayjs(office.inizioOrarioUscita, "HH:mm:ss") : null,
    fineOrarioUscita: office.fineOrarioUscita ? dayjs(office.fineOrarioUscita, "HH:mm:ss") : null,
    night_shift: office.night_shift === 1,
  } : undefined;


  const handleSubmit = (values: any) => {

    const formatted = {
      ...values,
      inizioOrarioIngresso: values.inizioOrarioIngresso.format('HH:mm'),
      fineOrarioIngresso: values.fineOrarioIngresso.format('HH:mm'),
      inizioOrarioUscita: values.inizioOrarioUscita.format('HH:mm'),
      fineOrarioUscita: values.fineOrarioUscita.format('HH:mm'),
      night_shift: values.night_shift ? 1 : 0,
    };

    if (office) {
      router.put(`/offices/${office.id}`, formatted, {
        onError: (errors) => {
          notification.error({ title: Object.values(errors)[0] });
        },
      });
    } else {
      router.post('/offices', formatted, {
          onError: (errors) => {
          notification.error({ title: Object.values(errors)[0] });
          },
      });
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <Title level={2} style={{ margin: 0, marginBottom:'20px' }}>
        {office ? 'Edit Office' : 'Create Office'}
      </Title>
      <Form
        initialValues={initialValues}
        onFinish={handleSubmit}
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >

        <Form.Item
          name="night_shift"
          label="Abilita Orario Notturno"
          valuePropName="checked"
        >
          <Checkbox style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="inizioOrarioIngresso"
          label="Inizio Ingresso"
          rules={[{ required: true, message: 'Seleziona l’orario'  }]}
        >
          <TimePicker style={{ width: '100%' }} format={FORMAT} />
        </Form.Item>

        <Form.Item
          name="fineOrarioIngresso"
          label="Fine Ingresso"
          rules={[{ required: true, message: 'Seleziona l’orario'  }, 
            ({ getFieldValue }) => ({
            validator: (_, value) => {
              const start = getFieldValue('inizioOrarioIngresso');
              const isNight = getFieldValue('night_shift');

              const isInvalid = !isNight && value && start && value.isBefore(start)
              return isInvalid 
                ? Promise.reject('Deve essere dopo o uguale all’inizio ingresso (o abilita Orario Notturno se va al giorno seguente)')
                : Promise.resolve();
            }
          })]}
        >
          <TimePicker style={{ width: '100%' }} format={FORMAT} />
        </Form.Item>

        <Form.Item
          name="inizioOrarioUscita"
          label="Inizio Uscita"
          rules={[{ required: true, message: 'Seleziona l’orario'  },
            ({ getFieldValue }) => ({
            validator: (_, value) => {
              const start = getFieldValue('inizioOrarioIngresso');
              const isNight = getFieldValue('night_shift');

              const isInvalid = !isNight && value && start && start.isAfter(value)

              return isInvalid
              ? Promise.reject('Deve essere dopo l’inizio ingresso (o abilita Orario Notturno se va al giorno seguente)')
              : Promise.resolve();
            }
          })]}
        >
          <TimePicker style={{ width: '100%' }} format={FORMAT} />
        </Form.Item>

        <Form.Item
          name="fineOrarioUscita"
          label="Fine Uscita"
          rules={[{ required: true, message: 'Seleziona l’orario'  },
            ({ getFieldValue }) => ({
            validator: (_, value) => {
              const start = getFieldValue('inizioOrarioUscita');
              const isNight = getFieldValue('night_shift');

              const isInvalid = !isNight && value && start && value.isBefore(start)
              return isInvalid 
                ? Promise.reject('Deve essere dopo o uguale all’inizio uscita (o abilita Orario Notturno se va al giorno seguente)')
                : Promise.resolve();
            }
          })]}
        >
          <TimePicker style={{ width: '100%' }} format={FORMAT} />
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