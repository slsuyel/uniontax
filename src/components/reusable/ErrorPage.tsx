import { Button, Result } from 'antd';

const NotFoundPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Result
            status="404"
            title="৪০৪"
            subTitle="দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা খুঁজে পাওয়া যায়নি।"
            extra={
              <Button type="primary" href="/" className='text-decoration-none'>
                হোমপেজে ফিরে যান
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
