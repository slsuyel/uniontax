import { Button, Result } from 'antd';

const ErrorPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={
              <Button type="primary" href="/">
                Back Home
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
