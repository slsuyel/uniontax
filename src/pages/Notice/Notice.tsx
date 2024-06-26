import RightSidebar from '../Home/RightSidebar';

const Notice = () => {
  return (
    <div className="container row mx-auto my-3">
      <div className="mainBody col-md-9 ">
        <h4 className="text-center">নোটিশ</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="text-nowrap">
                <th className="text-center">প্রকাশের তারিখ</th>
                <th className="text-center">বিষয়</th>
                <th className="text-center">ডাউনলোড</th>{' '}
                {/* Added header for download */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">২৮ জুন ২০২৪</td>
                <td>2024-2025 অর্থবছরের ইজারা।</td>
                <td className="text-center">
                  <a
                    target="_blank"
                    href="/public/ইজারা নোটিশ বোর্ডে দিয়েন.pdf"
                    className="btn_main ms-2 px-3 text-decoration-none"
                  >
                    Download
                  </a>
                </td>
              </tr>
              <tr>
                <td className="text-center">২৮ জানুয়ারি ২০২৪</td>
                <td>গ্রাম পুলিশ নিয়োগ বিজ্ঞপ্তি।</td>
                <td className="text-center">
                  <a
                    target="_blank"
                    href="/public/Village-Police-22.pdf"
                    className="btn_main ms-2 px-3 text-decoration-none"
                  >
                    Download
                  </a>
                </td>
              </tr>
              <tr>
                <td className="text-center">২৭ নভেম্বর ২০২১</td>
                <td>
                  সন্মাতি সেবা প্রার্থীগণের অবগতির জন্য জানানো যাচ্ছে যে, ইউনিয়ন
                  ডিজিটাল সেবা কার্যক্রমের ট্রায়াল এবং আপগ্রেড চলমান রয়েছে।
                  কতিপয় সেবা ব্যতীত সকল সেবা প্রদান চলমান। শীঘ্রই ইউনিয়ন পরিষদ
                  হতে প্রদত্ত সকল সেবা এই অনলাইন সফটওয়্যারে মাধ্যমে প্রদান করা
                  হবে। আপনাদের সাময়িক অসুবিধার জন্য আমরা আন্তরিকভাবে দু:খিত।
                  আমাদের সাথেই থাকুন। ধন্যবাদ
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Notice;
