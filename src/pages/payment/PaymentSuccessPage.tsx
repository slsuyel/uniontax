import React from "react";
import { Button, Result, Card } from "antd";

const PaymentSuccessPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <Card className="text-center">
        <Result
          status="success"
          title="Payment Successful!"
          subTitle="Thank you for your purchase. Your payment has been processed successfully."
          extra={[
            <Button type="primary" key="goHome">
              Go to Home
            </Button>,
            <Button key="viewDetails">View Payment Details</Button>,
          ]}
        />
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
