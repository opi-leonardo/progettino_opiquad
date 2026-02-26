import React, { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

import { Table, Button, notification, Typography } from 'antd';
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

  const { Title } = Typography;

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom:"10px" }}>
        <Title level={2} style={{ margin: 0 }}>
          All Offices
        </Title>


        <Link href="/offices/create">
          <Button type="primary">Add Office</Button>
        </Link>
      </div>

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
