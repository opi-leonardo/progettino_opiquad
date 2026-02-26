import { Head, Link } from '@inertiajs/react';

import { Button, Card, Col, Row, Space } from 'antd';

export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card title="Welcome" style={{ width: 350 }}>
            <Row gutter={[16, 16]}>
                {/* Row 1 */}
                <Col span={12}>
                    <Button color='primary' variant='filled' href="/users/create" block>Create a User</Button> 
                </Col>
                <Col span={12}>
                    <Button href="/users/" block>See all Users</Button>
                </Col>
                {/* Row 2 */}
                <Col span={12}>
                    <Button color='blue' variant='filled' href="/offices/create" block>Create an Office</Button> 
                </Col>
                <Col span={12}>
                    <Button href="/offices/" block>See all Offices</Button>
                </Col>
            </Row>
        </Card>
    </div>
  );
}
