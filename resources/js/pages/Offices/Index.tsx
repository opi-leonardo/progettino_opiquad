import React, { useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Table, Button, Space, Typography, Popconfirm, notification } from 'antd';
import Layout from '../Layout';
import { Link } from '@inertiajs/react';

interface Office {
  id: number;
  nome: string;
  inizioOrarioIngresso: string;
  fineOrarioIngresso: string;
  inizioOrarioUscita: string;
  fineOrarioUscita: string;
}

interface PaginatedData<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Props {
  offices: PaginatedData<Office>;
  success?: string;
  error?: string;
}

type Page<P = {}> = React.FC<P> & {
  layout?: (page: React.ReactElement) => React.ReactNode;
};

const { Title } = Typography;

const Index: Page<Props> = ({ offices, success, error }) => {

  const handleTableChange = (pagination: any) => {
    router.get('/offices', { page: pagination.current }, {
      preserveState: true,
      replace: true
    });
  };

  const handleDelete = (id: number) => {
    router.delete(`/offices/${id}`, {
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

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Inizio Ingresso',
      dataIndex: 'inizioOrarioIngresso',
      key: 'inizioOrarioIngresso',
    },
    {
      title: 'Fine Ingresso',
      dataIndex: 'fineOrarioIngresso',
      key: 'fineOrarioIngresso',
    },
    {
      title: 'Inizio Uscita',
      dataIndex: 'inizioOrarioUscita',
      key: 'inizioOrarioUscita',
    },
    {
      title: 'Fine Uscita',
      dataIndex: 'fineOrarioUscita',
      key: 'fineOrarioUscita',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Office) => (
        <>
          <Link href={`/offices/${record.id}/edit`}>
            <Button type="link">Edit</Button>
          </Link>
          <Popconfirm
            title="Delete office"
            description="Are you sure you want to delete this office and its users?"
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
          All Offices
        </Title>


        <Link href="/offices/create">
          <Button type="primary">Add Office</Button>
        </Link>
      </div>

      <Table
        dataSource={offices.data}
        columns={columns}
        rowKey="id"
        pagination={{
          current: offices.current_page,
          pageSize: offices.per_page,
          total: offices.total,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

Index.layout = page => <Layout>{page}</Layout>;

export default Index;