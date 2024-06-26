import React, { useState } from 'react';
import Breadcrumbs from '@/components/reusable/Breadcrumbs';

const Student = () => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const isChecked = (e.target as HTMLInputElement).checked;

    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? isChecked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className=" ">
      <Breadcrumbs
        items={[{ name: 'Home', path: '/' }]}
        current="Student Application Form"
      />

      <form
        className="application-form col-md-10 mx-auto"
        onSubmit={handleSubmit}
      >
        <fieldset className="row mx-auto col-md-10 p-1 personal-information">
          <legend>Personal Information:</legend>
          <div className="form-group col-md-6">
            <label htmlFor="full_name">Full Name:</label>
            <input
              required
              type="text"
              id="full_name"
              name="full_name"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="date_of_birth">Date of Birth:</label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" onChange={handleInputChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="nationality">Nationality:</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email_address">Email Address:</label>
            <input
              type="email"
              id="email_address"
              name="email_address"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset className="row mx-auto col-md-10 p-1 address-details">
          <legend>Address Details:</legend>
          <div className="form-group col-md-6">
            <label htmlFor="current_address">
              Current Residential Address:
            </label>
            <input
              type="text"
              id="current_address"
              name="current_address"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="permanent_address">Permanent Address:</label>
            <input
              type="text"
              id="permanent_address"
              name="permanent_address"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset className="row mx-auto col-md-10 p-1 address-details">
          <legend>Educational Background:</legend>
          <div className="form-group col-md-6">
            <label htmlFor="current_school">
              Name of Current School/College/University:
            </label>
            <input
              type="text"
              id="current_school"
              name="current_school"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="grade_level">Grade/Level or Year of Study:</label>
            <input
              type="text"
              id="grade_level"
              name="grade_level"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="field_study">Major or Field of Study:</label>
            <input
              type="text"
              id="field_study"
              name="field_study"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="graduation_date">Expected Graduation Date:</label>
            <input
              type="text"
              id="graduation_date"
              name="graduation_date"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="academic_achievements">
              Academic Achievements (if applicable):
            </label>
            <input
              type="text"
              id="academic_achievements"
              name="academic_achievements"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset className="row mx-auto col-md-10 p-1 family-info">
          <legend>Family Information:</legend>
          <div className="form-group col-md-6">
            <label htmlFor="parent_names">Parent(s)/Guardian(s) Name(s):</label>
            <input
              type="text"
              id="parent_names"
              name="parent_names"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="parent_occupation">
              Occupation of Parent(s)/Guardian(s):
            </label>
            <input
              type="text"
              id="parent_occupation"
              name="parent_occupation"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="family_income">Total Family Income:</label>
            <input
              type="text"
              id="family_income"
              name="family_income"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="siblings_info">
              Number of Siblings and their Education Status:
            </label>
            <input
              type="text"
              id="siblings_info"
              name="siblings_info"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset className="row mx-auto col-md-10 p-1 financial-info">
          <legend>Financial Information:</legend>
          <div className="form-group col-md-6">
            <label htmlFor="funding_source">
              Source of Funding for Education:
            </label>
            <input
              type="text"
              id="funding_source"
              name="funding_source"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="financial_need">Financial Need Description:</label>
            <input
              type="text"
              id="financial_need"
              name="financial_need"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="scholarships_grants">
              Any Current Scholarships or Grants:
            </label>
            <input
              type="text"
              id="scholarships_grants"
              name="scholarships_grants"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset className="row mx-auto col-md-10 p-1 assistance-needed">
          <legend>Assistance Needed:</legend>
          <div className="form-group col-md-6">
            <label htmlFor="assistance_type">
              Type of Assistance Required:
            </label>
            <input
              type="text"
              id="assistance_type"
              name="assistance_type"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="assistance_amount">
              Amount of Financial Assistance Needed:
            </label>
            <input
              type="text"
              id="assistance_amount"
              name="assistance_amount"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset className="row mx-auto col-md-10 p-1 academic-extracurricular-activities">
          <legend>Academic and Extracurricular Activities:</legend>
          <div className="form-group col-md-6">
            <label htmlFor="academic_awards">
              List of Academic Awards or Honors:
            </label>
            <input
              type="text"
              id="academic_awards"
              name="academic_awards"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="extracurricular_activities">
              Extracurricular Activities:
            </label>
            <input
              type="text"
              id="extracurricular_activities"
              name="extracurricular_activities"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="leadership_positions">
              Leadership Positions Held:
            </label>
            <input
              type="text"
              id="leadership_positions"
              name="leadership_positions"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset className="row mx-auto col-md-10 p-1 essay-questions">
          <legend>Essay Questions:</legend>
          <div className="form-group col-md-6">
            <label htmlFor="educational_career_goals">
              Describe your educational and career goals:
            </label>
            <textarea
              id="educational_career_goals"
              name="educational_career_goals"
              rows={4}
              style={{ width: '100%' }}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="assistance_benefits">
              Explain how this assistance will help you achieve your goals:
            </label>
            <textarea
              style={{ width: '100%' }}
              id="assistance_benefits"
              name="assistance_benefits"
              rows={4}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="challenges_overcome">
              Discuss any challenges or obstacles you have overcome in your
              educational journey:
            </label>
            <textarea
              style={{ width: '100%' }}
              id="challenges_overcome"
              name="challenges_overcome"
              rows={4}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset className="row mx-auto col-md-10 p-1 references">
          <legend>References:</legend>
          <div className="form-group col-md-6">
            <label htmlFor="reference1_name">
              Name, Relationship, and Contact Information of Reference 1:
            </label>
            <input
              type="text"
              id="reference1_name"
              name="reference1_name"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="reference2_name">
              Name, Relationship, and Contact Information of Reference 2:
            </label>
            <input
              type="text"
              id="reference2_name"
              name="reference2_name"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset className="row mx-auto col-md-10 p-1 documents">
          <legend>Documents:</legend>
          <div className="form-group col-md-6">
            <label htmlFor="academic_transcripts">
              Upload Academic Transcripts:
            </label>
            <input
              type="file"
              id="academic_transcripts"
              name="academic_transcripts"
              accept=".pdf,.doc,.docx"
              onChange={handleInputChange}
            />
          </div>
          <hr />
          <br />
          <div className="form-group col-md-6">
            <label htmlFor="proof_of_income">
              Upload Proof of Income (if required):
            </label>
            <input
              type="file"
              id="proof_of_income"
              name="proof_of_income"
              accept=".pdf,.doc,.docx"
              onChange={handleInputChange}
            />
          </div>
          <hr />
          <br />
          <div className="form-group col-md-6">
            <label htmlFor="letters_of_recommendation">
              Upload Letters of Recommendation (if applicable):
            </label>
            <input
              type="file"
              id="letters_of_recommendation"
              name="letters_of_recommendation"
              accept=".pdf,.doc,.docx"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset className="row mx-auto col-md-10 p-1 consent-declaration aligned-checkbox-label">
          <legend>Consent and Declaration:</legend>
          <div className="form-group col-md-6">
            <input
              type="checkbox"
              id="personal_information_consent"
              name="personal_information_consent"
              onChange={handleInputChange}
            />
            <label htmlFor="personal_information_consent">
              Consent to Process Personal Information:
            </label>
          </div>
          <div className="form-group col-md-6">
            <input
              type="checkbox"
              id="information_declaration"
              name="information_declaration"
              onChange={handleInputChange}
            />
            <label htmlFor="information_declaration">
              Declaration that all Information Provided is True and Accurate:
            </label>
          </div>
        </fieldset>
        <fieldset className="row mx-auto col-md-10 p-1 signature-date">
          <legend>Signature and Date:</legend>
          <div className="form-group col-md-6">
            <label htmlFor="applicant_signature">
              Signature of the Applicant:
            </label>
            <input
              type="text"
              id="applicant_signature"
              name="applicant_signature"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="submission_date">Date of Submission:</label>
            <input
              type="date"
              id="submission_date"
              name="submission_date"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Student;
