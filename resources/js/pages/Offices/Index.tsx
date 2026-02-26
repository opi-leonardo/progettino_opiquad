import React from 'react';
import { router } from '@inertiajs/react';
import { Table, Button, Typography, Popconfirm, message, Alert } from 'antd';
import Layout from '../Layout';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

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

const { Title } = Typography;

const Index: Page<Props> = ({ offices }) => {

  const { errors } = usePage().props as any;

  // dopo il Title:
  {errors?.error && <Alert message={errors.error} type="error" showIcon style={{ marginBottom: 16 }} />}

  const columns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'Inizio Ingresso', dataIndex: 'inizioOrarioIngresso', key: 'inizioOrarioIngresso' },
    { title: 'Fine Ingresso', dataIndex: 'fineOrarioIngresso', key: 'fineOrarioIngresso' },
    { title: 'Inizio Uscita', dataIndex: 'inizioOrarioUscita', key: 'inizioOrarioUscita' },
    { title: 'Fine Uscita', dataIndex: 'fineOrarioUscita', key: 'fineOrarioUscita' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Office) => (
        <>
          <Link href={`/offices/${record.id}/edit`}>
            <Button type="link">Edit</Button>
          </Link>

          <Popconfirm
            placement="top"
            title="Elimina ufficio"
            description="Sei sicuro di voler eliminare questo ufficio?"
            okText="Sì"
            cancelText="No"
            onConfirm={() => {
              router.delete(`/offices/${record.id}`, {
                onSuccess: () => message.success('Ufficio eliminato con successo!'),
                onError: () => message.error("Errore durante l'eliminazione."),
              });
            }}
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Title level={2} style={{ margin: 0 }}>All Offices</Title>
        <Link href="/offices/create">
          <Button type="primary">Add Office</Button>
        </Link>
      </div>

      <Table dataSource={offices} columns={columns} rowKey="id" />
    </div>
  );
};

Index.layout = page => <Layout>{page}</Layout>;

export default Index;