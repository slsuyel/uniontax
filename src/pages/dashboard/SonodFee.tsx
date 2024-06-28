/* eslint-disable @typescript-eslint/no-explicit-any */

import Breadcrumbs from '@/components/reusable/Breadcrumbs';
import { Form, Input, Button, Table } from 'antd';

interface FormData {
  [key: string]: number;
}

const SonodFee = () => {
  const onFinish = (values: FormData) => {
    console.log('Form data:', values);
  };

  const initialValues: FormData = {
    'নাগরিকত্ব সনদ': 1,
    'ট্রেড লাইসেন্স': 1,
    'ওয়ারিশান সনদ': 1,
    'উত্তরাধিকারী সনদ': 1,
    'বিবিধ প্রত্যয়নপত্র': 1,
    'চারিত্রিক সনদ': 1,
    'ভূমিহীন সনদ': 1,
    'পারিবারিক সনদ': 1,
    'অবিবাহিত সনদ': 1,
    'পুনঃ বিবাহ না হওয়া সনদ': 1,
    'বার্ষিক আয়ের প্রত্যয়ন': 1,
    'একই নামের প্রত্যয়ন': 1,
    'প্রতিবন্ধী সনদপত্র': 1,
    'অনাপত্তি সনদপত্র': 1,
    'আর্থিক অস্বচ্ছলতার সনদপত্র': 1,
  };

  const dataSource = Object.keys(initialValues).map(key => ({
    key, // Adding key prop here
    sonadName: key,
    fee: initialValues[key],
  }));

  return (
    <div className="">
      <Breadcrumbs current="সনদ ফি" />
      <Form
        name="sonod_fee_form"
        initialValues={initialValues}
        onFinish={onFinish}
        layout="vertical"
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
          size="middle"
        />

        <Form.Item className="col-md-12 mt-4">
          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const columns = [
  {
    title: 'সনদের নাম',
    dataIndex: 'sonadName',
    key: 'sonadName',
  },
  {
    title: 'সনদের ফি',
    dataIndex: 'fee',
    key: 'fee',
    render: (_: any, record: { sonadName: string }) => (
      <Form.Item
        className="col-8 "
        name={record.sonadName}
        key={record.sonadName}
        rules={[
          {
            required: true,
            message: `Please input সনদের ফি for ${record.sonadName}!`,
          },
        ]}
      >
        <Input
          className="text-center"
          style={{ height: 40 }}
          type="number"
          placeholder="সনদের ফি"
        />
      </Form.Item>
    ),
  },
];

export default SonodFee;
