import { Link } from 'react-router-dom';
import logo from '/main_logo.png';
import SearchBox from '../reusable/SearchBox';
import { useAppSelector } from '@/redux/features/hooks';
import { RootState } from '@/redux/features/store';

const TopHeader = () => {
  const unionData = useAppSelector((state: RootState) => state.union.unionInfo);

  return (
    <>
      <div className="topHeader ">
        <div className="row mx-auto my-1 container">
          <div className="topheaderItem col-md-6 col-6">
            <span>ইউনিয়ন পরিষদ ক্যাশলেস সেবা সিস্টেমে স্বাগতম</span>
          </div>{' '}
          <div className="topheaderItem col-md-6 col-6 text-end">
            <span
              style={{
                borderRight: '1px solid rgba(255, 255, 255, 0.52)',
                padding: '8px 10px',
                marginRight: '9px',
              }}
            >
              2024-06-25
            </span>{' '}
            <span>Visitors : 36470</span>
          </div>
        </div>
      </div>

      <div className=" row mx-auto container">
        <div className="col-md-6 my-3 ps-0">
          <Link to={'/'}>
            <img width={270} src={unionData?.web_logo || logo} alt="" />
          </Link>
        </div>
        <div className="col-md-6  pe-0">
          <h3 className="defaltColor fs-4 searchHeader text-white">
            ইউনিয়ন নির্বাচন করুন{' '}
          </h3>
          <SearchBox />
        </div>
      </div>
    </>
  );
};

export default TopHeader;
