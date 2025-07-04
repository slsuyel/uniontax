// BusinessDirectoryPage.tsx

import { useState } from "react";
import { Form, Modal, message } from "antd";

import {
  useGetBusinessDirectoriesQuery,
  useDeleteBusinessDirectoryMutation,
} from "@/redux/api/business/businessApi";
import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import CreateBusinessModal from "./CreateBusinessModal";
import EditBusinessModal from "./EditBusinessModal";

import { useTradeInfoQuery } from "@/redux/api/user/userApi";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";

export interface BusinessDirectory {
  id: number;
  union_name: string;
  applicant_owner_type: string;
  applicant_name_of_the_organization: string;
  organization_address: string;
  applicant_occupation: string;
  applicant_vat_id_number: string;
  applicant_tax_id_number: string;
  applicant_type_of_businessKhat: string;
  applicant_type_of_businessKhatAmount: string;
  last_years_money: string;
  applicant_type_of_business: string;
  name: string;
  gender: string;
  father_name: string;
  mother_name: string;
  nid_no: string;
  birth_id_no: string;
  mobile_no: string;
  applicant_holding_tax_number: string;
  holding_owner_name: string;
  holding_owner_relationship: string;
  holding_owner_mobile: string;
  applicant_date_of_birth: string;
  applicant_religion: string;
  status: string;
}

const BusinessDirectoryPage = () => {
  const user = useAppSelector((state: RootState) => state.user.user);

  const { data, isLoading, error, refetch } = useGetBusinessDirectoriesQuery({});

  const { data: tradeInfoDataRaw, isLoading: tradeInfoLoading } = useTradeInfoQuery({
    unionName: user?.unioun,
  });

  const tradeInfoData = tradeInfoDataRaw?.data || tradeInfoDataRaw || [];

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessDirectory | null>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const [deleteBusiness, { isLoading: deleting }] = useDeleteBusinessDirectoryMutation();

  // Open/close modals with form reset on close
  const openCreateModal = () => setCreateModalVisible(true);
  const closeCreateModal = () => {
    setCreateModalVisible(false);
    form.resetFields();
  };

  const openEditModal = (business: BusinessDirectory) => {
    setSelectedBusiness(business);
    setEditModalVisible(true);
  };
  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedBusiness(null);
    form.resetFields();
  };

  const openDetailsModal = (business: BusinessDirectory) => {
    setSelectedBusiness(business);
    setDetailsModalVisible(true);
  };
  const closeDetailsModal = () => {
    setSelectedBusiness(null);
    setDetailsModalVisible(false);
  };

  // Handlers for after create/update to refresh list and close modals
  const handleCreated = () => {
    refetch();
    closeCreateModal();
  };
  const handleUpdated = () => {
    refetch();
    closeEditModal();
  };

  // Delete confirmation and handler
  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "আপনি কি নিশ্চিত এই ব্যবসাটি মুছে ফেলতে চান?",
      okText: "হ্যাঁ, মুছে ফেলুন",
      okType: "danger",
      cancelText: "বাতিল",
      onOk: async () => {
        try {
          await deleteBusiness(id).unwrap();
          message.success("ব্যবসা সফলভাবে মুছে ফেলা হয়েছে");
          refetch();
        } catch (error) {
          message.error("ব্যবসা মুছে ফেলা যায়নি, আবার চেষ্টা করুন");
        }
      },
    });
  };

  if (tradeInfoLoading || isLoading) {
    return <div className="text-center mt-5">লোড হচ্ছে...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-4">ডেটা লোড করতে ব্যর্থ হয়েছে!</div>;
  }

  return (
    <div className="card p-3 border-0">
      <Breadcrumbs current="ব্যবসা প্রতিষ্ঠানের তালিকা" />
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-primary btn-sm" onClick={openCreateModal}>
          <i className="fas fa-plus me-1"></i> নতুন যুক্ত করুন
        </button>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">প্রতিষ্ঠানের নাম</th>
                <th scope="col">ধরণ</th>
                <th scope="col">এনআইডি</th>
                <th scope="col">মোবাইল</th>
                <th scope="col">ধর্ম</th>
                <th scope="col" style={{ minWidth: 150 }}>
                  অ্যাকশন
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center">
                    কোন ব্যবসা তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
              {data?.data?.map((business: BusinessDirectory, index: number) => (
                <tr key={business.id}>
                  <td>{index + 1}</td>
                  <td>{business.applicant_name_of_the_organization || business.name}</td>
                  <td>{business.applicant_type_of_business || "N/A"}</td>
                  <td>{business.nid_no}</td>
                  <td>{business.mobile_no}</td>
                  <td>{business.applicant_religion}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Actions">
                      <button
                        className="btn btn-sm btn-info text-white"
                        title="বিস্তারিত দেখুন"
                        onClick={() => openDetailsModal(business)}
                      >
                        বিস্তারিত
                      </button>
                      <button
                        className="btn btn-sm btn-warning ms-2"
                        title="সম্পাদনা করুন"
                        onClick={() => openEditModal(business)}
                      >
                        সম্পাদনা
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        title="মুছে ফেলুন"
                        onClick={() => handleDelete(business.id)}
                        disabled={deleting}
                      >
                        মুছে ফেলুন
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <CreateBusinessModal
        open={createModalVisible}
        onClose={closeCreateModal}
        onCreated={handleCreated}
        form={form}
        tradeInfoData={tradeInfoData}
      />

      {/* Edit Modal */}
      <EditBusinessModal
        open={editModalVisible}
        onClose={closeEditModal}
        form={form}
        business={selectedBusiness}
        onUpdated={handleUpdated}
        tradeInfoData={tradeInfoData}
      />


     {/* Details Modal */}
<Modal
  title="ব্যবসার বিস্তারিত তথ্য"
  visible={detailsModalVisible}
  onCancel={closeDetailsModal}
  footer={null}
  width={800}
>
  {selectedBusiness ? (
    <div className="row">
      <div className="col-md-6">
        <p><strong>প্রতিষ্ঠানের নাম:</strong> {selectedBusiness.applicant_name_of_the_organization}</p>
        <p><strong>প্রতিষ্ঠানের ঠিকানা:</strong> {selectedBusiness.organization_address}</p>
        <p><strong>ব্যবসার ধরণ:</strong> {selectedBusiness.applicant_type_of_business}</p>
        <p><strong>ব্যবসা খাত:</strong> {selectedBusiness.applicant_type_of_businessKhat}</p>
        <p><strong>খাতের পরিমাণ:</strong> {selectedBusiness.applicant_type_of_businessKhatAmount}</p>
        <p><strong>গত বছরের আয়:</strong> {selectedBusiness.last_years_money}</p>
        <p><strong>ভ্যাট আইডি:</strong> {selectedBusiness.applicant_vat_id_number}</p>
        <p><strong>ট্যাক্স আইডি:</strong> {selectedBusiness.applicant_tax_id_number}</p>
        <p><strong>হোল্ডিং নম্বর:</strong> {selectedBusiness.applicant_holding_tax_number}</p>
        <p><strong>ইউনিয়ন:</strong> {selectedBusiness.union_name}</p>
      </div>

      <div className="col-md-6">
        <p><strong>আবেদনকারীর নাম:</strong> {selectedBusiness.name}</p>
        <p><strong>পিতা’র নাম:</strong> {selectedBusiness.father_name}</p>
        <p><strong>মাতা’র নাম:</strong> {selectedBusiness.mother_name}</p>
        <p><strong>জন্ম তারিখ:</strong> {selectedBusiness.applicant_date_of_birth}</p>
        <p><strong>ধর্ম:</strong> {selectedBusiness.applicant_religion}</p>
        <p><strong>লিঙ্গ:</strong> {selectedBusiness.gender}</p>
        <p><strong>জাতীয় পরিচয়পত্র (NID):</strong> {selectedBusiness.nid_no}</p>
        <p><strong>জন্ম সনদ নম্বর:</strong> {selectedBusiness.birth_id_no}</p>
        <p><strong>মোবাইল নম্বর:</strong> {selectedBusiness.mobile_no}</p>
        <p><strong>অকুপেশন:</strong> {selectedBusiness.applicant_occupation}</p>
      </div>

      <div className="col-12 mt-3 border-top pt-3">
        <h6 className="text-secondary fw-bold">হোল্ডিং মালিকের তথ্য</h6>
        <p><strong>মালিকের নাম:</strong> {selectedBusiness.holding_owner_name}</p>
        <p><strong>সম্পর্ক:</strong> {selectedBusiness.holding_owner_relationship}</p>
        <p><strong>মোবাইল:</strong> {selectedBusiness.holding_owner_mobile}</p>
      </div>
    </div>
  ) : (
    <p>কোন তথ্য পাওয়া যায়নি।</p>
  )}
</Modal>

    </div>
  );
};

export default BusinessDirectoryPage;
