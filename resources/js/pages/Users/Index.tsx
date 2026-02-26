import React, { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

import { Table, Button, notification } from 'antd';
import Layout from '../Layout';

type Page<P = {}> = React.FC<P> & {
  layout?: (page: React.ReactElement) => React.ReactNode;
};

interface Props {
    users: {
        id: number;
        nome: string;
        cognome: string;
        email: string;
        giornoCorto: number;
        offices?: { id: number; name: string } | null;
    }[];
    success?: string;
    error?: string;
}

const Index: Page<Props> = ({ users, success, error }) => {

  useEffect(() => {
    if (success) {
      notification.success({ message: success });
    }
  }, [success]);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Cognome',
      dataIndex: 'cognome',
      key: 'cognome',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Giorno',
      dataIndex: 'giornoCorto',
      key: 'giornoCorto',
      render: (day: number) => {
        const giorni = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];
        return giorni[day] ?? '';
      }
    },
    {
      title: 'Office',
      dataIndex: ['office', 'nome'],
      key: 'office',
      render: (office: any) => office || '-',
    },
  ];

    return (
    <div style={{ padding: 40 }}>
      <h1>All Users</h1>

      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => Inertia.get('/users/create')}
      >
        Add User
      </Button>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

Index.layout = page => <Layout>{page}</Layout>;


export default Index;
