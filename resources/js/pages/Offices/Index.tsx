import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Table, Button } from 'antd';
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

interface Props {
  offices: Office[];
}

type Page<P = {}> = React.FC<P> & {
  layout?: (page: React.ReactElement) => React.ReactNode;
};

const Index: Page<Props> = ({ offices }) => {
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
          <Button
            type="link"
            onClick={() => Inertia.get(`/offices/${record.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => Inertia.delete(`/offices/${record.id}`)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 40 }}>
      <h1>All Offices</h1>

      <Link href="/offices/create">
        <Button type="primary">Add Office</Button>
      </Link>

      <Table
        dataSource={offices}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

Index.layout = page => <Layout>{page}</Layout>;

export default Index;