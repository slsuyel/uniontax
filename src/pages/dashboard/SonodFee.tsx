/* eslint-disable @typescript-eslint/no-explicit-any */
import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import { TSonod } from "@/types";
import { Form, Input, Button, Table } from "antd";

interface FormData {
  [key: string]: number;
}

const SonodFee = () => {
  // Fetch the sonod information from the state
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList);
  console.log(sonodInfo);

  // Initialize the form data based on the sonod information
  const initialValues: FormData = sonodInfo.reduce(
    (acc: FormData, sonod: TSonod) => {
      acc[sonod.bnname] = sonod.sonod_fees; // Set the fee value from sonodInfo
      return acc;
    },
    {}
  );

  const onFinish = (values: FormData) => {
    console.log("Form data:", values);
  };

  // Prepare the dataSource for the table
  const dataSource = sonodInfo.map((sonod) => ({
    key: sonod.id,
    sonadName: sonod.bnname,
    fee: sonod.sonod_fees,
  }));

  // Define table columns
  const columns = [
    {
      title: "সনদের নাম",
      dataIndex: "sonadName",
      key: "sonadName",
    },
    {
      title: "সনদের ফি",
      dataIndex: "fee",
      key: "fee",
      render: (_: any, record: { sonadName: string }) => (
        <Form.Item
          className="col-8"
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

export default SonodFee;
