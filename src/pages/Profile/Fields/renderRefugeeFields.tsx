import { Form, Input, Select, DatePicker } from 'antd';

const { Option } = Select;

export const renderRefugeeFields = () => (
  <>
    <div className="col-md-4" key="conflict-info-col-1">
      <Form.Item
        label="Country of Conflict"
        name="country_of_conflict"
        key="countryOfConflict"
      >
        <Input
          className="input_bor_edit"
          placeholder="Enter the country you are fleeing from"
          style={{ height: 45, width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        label="Sheltering Country"
        name="sheltering_country"
        key="shelteringCountry"
      >
        <Input
          className="input_bor_edit"
          placeholder="Enter the country you are currently in"
          style={{ height: 45, width: '100%' }}
        />
      </Form.Item>
    </div>

    <div className="col-md-4" key="arrival-info-col-1">
      <Form.Item label="Arriving Date" name="arrivingDate" key="arrivingDate">
        <DatePicker
          className="input_bor_edit"
          placeholder="Select date of arrival"
          style={{ height: 45, width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        label="Arrived Legally or Illegally"
        name="arrival_legality"
        key="arrivalLegality"
      >
        <Select
          className="input_bor_edit rounded-bottom-4"
          placeholder="Select legality of arrival"
          style={{ height: 45, width: '100%' }}
        >
          <Option value="legally">Legally</Option>
          <Option value="illegally">Illegally</Option>
        </Select>
      </Form.Item>
    </div>

    <div className="col-md-4" key="current-living-col-1">
      <Form.Item
        label="Currently Living in Shelter or Rented House"
        name="current_living"
        key="currentLiving"
      >
        <Select
          className="input_bor_edit rounded-bottom-4"
          placeholder="Select current living situation"
          style={{ height: 45, width: '100%' }}
        >
          <Option value="shelter">Shelter</Option>
          <Option value="rented">Rented House</Option>
        </Select>
      </Form.Item>
    </div>

    <div className="row mx-auto" key="family-info-col-1">
      <Form.Item
        className="col-md-4"
        label="Total Family Members"
        name="total_family_members"
        key="totalFamilyMembers"
      >
        <Input
          className="input_bor_edit"
          placeholder="Enter total number of family members"
          style={{ height: 45, width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        className="col-md-4"
        label="Adult Family Members"
        name="adult_family_members"
        key="adultFamilyMembers"
      >
        <Input
          className="input_bor_edit"
          placeholder="Enter number of adults"
          style={{ height: 45, width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        className="col-md-4"
        label="Minor Family Members"
        name="minor_family_members"
        key="minorFamilyMembers"
      >
        <Input
          className="input_bor_edit"
          placeholder="Enter number of minors"
          style={{ height: 45, width: '100%' }}
        />
      </Form.Item>
    </div>
  </>
);
