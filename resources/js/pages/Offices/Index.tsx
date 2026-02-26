import React from 'react';
import { router } from '@inertiajs/react';
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
          <Link href={`/offices/${record.id}/edit`}>
            <Button type="link">Edit</Button>
          </Link>
          <Link href={`/offices/delete`}> 
            <Button type="link">Delete</Button>
          </Link>
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