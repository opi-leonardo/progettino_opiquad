import React, { useEffect } from 'react';
import { Link, router } from '@inertiajs/react';

import { Table, Button, notification, Typography, Popconfirm } from 'antd';
import Layout from '../Layout';

type Page<P = {}> = React.FC<P> & {
  layout?: (page: React.ReactElement) => React.ReactNode;
};

interface PaginatedData<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface User {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  giornoCorto: number;
  offices?: { id: number; name: string } | null;
}

interface Props {
    users: PaginatedData<User>;
    success?: string;
    error?: string;
}

const Index: Page<Props> = ({ users, success, error }) => {

  const handleTableChange = (pagination: any) => {
    router.get('/offices', { page: pagination.current }, {
      preserveState: true,
      replace: true
    });
  };

  const handleDelete = (id: number) => {
    router.delete(`/users/${id}`, {
      onError: (errors) => {
        notification.error({ title: Object.values(errors)[0] });
      },
    });
  };

  useEffect(() => {
    if (success) {
      notification.success({ title: success });
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
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <>
          <Link href={`/users/${record.id}/edit`}>
            <Button type="link">Edit</Button>
          </Link>
          <Popconfirm
            title="Delete user"
            description="Are you sure you want to delete this user?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

    return (
    <div style={{ padding: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom:"10px" }}>
        <Title level={2} style={{ margin: 0 }}>
          All Users
        </Title>


        <Link href="/users/create">
          <Button type="primary">Add User</Button>
        </Link>
      </div>

      <Table
        dataSource={users.data}
        columns={columns}
        rowKey="id"
        pagination={{
          current: users.current_page,
          pageSize: users.per_page,
          total: users.total,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

Index.layout = page => <Layout>{page}</Layout>;


export default Index;
