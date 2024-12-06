<template>
  <div>
    <form @submit.stop.prevent="onSubmit">
      <!-- <div class="panel-heading" style="font-weight: bold; font-size: 20px;background:#159513;text-align:center;color:white">{{ sonodnamedata.bnname }} </div> -->
      <div
        class="panel-heading"
        style="
          font-weight: bold;
          font-size: 20px;
          background: #159513;
          text-align: center;
          color: white;
        "
      >
        {{ form.sonod_name }}
      </div>

      <div class="form-pannel">
        <input
          type="hidden"
          v-model="(form.unioun_name = getUnion.subdomainget)"
        />

        <div
          class="row"
          v-if="
            sonodnamedata.enname == 'Certificate of Inheritance' ||
            sonodnamedata.enname == 'Inheritance certificate' ||
            sonodnamedata.enname == 'Certification of the same name' ||
            sonodnamedata.enname == 'Miscellaneous certificates'
          "
        >
          <div class="col-md-4">
            <div class="form-group">
              <label
                for=""
                class="labelColor"
                v-if="sonodnamedata.enname == 'Certificate of Inheritance'"
                >মৃত ব্যাক্তির নাম *</label
              >
              <label
                for=""
                class="labelColor"
                v-if="sonodnamedata.enname == 'Inheritance certificate'"
                >জীবিত ব্যক্তির নাম *</label
              >
              <label
                for=""
                class="labelColor"
                v-if="
                  sonodnamedata.enname == 'Certification of the same name' ||
                  sonodnamedata.enname == 'Miscellaneous certificates'
                "
                >সনদ ধারীর নাম</label
              >
              <input type="text" class="form-control" v-model="form.utname" />
            </div>
          </div>

          <div
            class="col-md-4"
            v-if="sonodnamedata.enname == 'Certification of the same name'"
          >
            <div class="form-group">
              <label for="" class="labelColor">সনদ ধারীর দ্বিতীয় নাম</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_second_name"
              />
            </div>
          </div>

          <div
            class="col-md-4"
            v-if="sonodnamedata.enname == 'Miscellaneous certificates'"
          >
            <div class="form-group">
              <label for="" class="labelColor">জীবিত/মৃত </label>
              <select class="form-control" v-model="form.alive_status">
                <option value="">নির্বাচন করুন</option>
                <option value="1">জীবিত</option>
                <option value="0">মৃত</option>
              </select>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">লিঙ্গ</label>
              <select class="form-control" v-model="form.applicant_gender">
                <option value="">লিঙ্গ নির্বাচন করুন</option>
                <option>পুরুষ</option>
                <option>মহিলা</option>
              </select>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">ধর্ম</label>
              <select class="form-control" v-model="form.ut_religion">
                <option value="">নির্বাচন করুন</option>
                <option>ইসলাম</option>
                <option>হিন্দু</option>
                <option>বৌদ্ধ</option>
                <option>খ্রিস্টান</option>
              </select>
            </div>
          </div>

          <!--
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="" class="labelColor">বৈবাহিক সম্পর্ক</label>
                            <select class="form-control" v-model="form.applicant_marriage_status">
                                <option value="">নির্বাচন করুন</option>
                                <option>বিবাহিত</option>
                                <option>অবিবাহিত</option>
                                <option>তালাক প্রাপ্ত</option>
                                <option>বিধবা</option>
                                <option>অন্যান্য</option>
                            </select>
                        </div>
                    </div> -->

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">পিতা/স্বামীর নাম</label>
              <input
                type="text"
                class="form-control"
                v-model="form.ut_father_name"
              />
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">মাতার নাম</label>
              <input
                type="text"
                class="form-control"
                v-model="form.ut_mother_name"
              />
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">গ্রাম</label>
              <input
                type="text"
                class="form-control"
                v-model="form.ut_grame"
                required
              />
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">ওয়ার্ড নং</label>
              <select
                v-model="form.ut_word"
                id="word_no"
                class="form-control"
                required
              >
                <option value="">ওয়াড নং</option>
                <option value="1">১</option>
                <option value="2">২</option>
                <option value="3">৩</option>
                <option value="4">৪</option>
                <option value="5">৫</option>
                <option value="6">৬</option>
                <option value="7">৭</option>
                <option value="8">৮</option>
                <option value="9">৯</option>
              </select>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">ডাকঘর</label>
              <input
                type="text"
                class="form-control"
                v-model="form.ut_post"
                required
              />
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">উপজেলা</label>
              <input
                type="text"
                class="form-control"
                v-model="form.ut_thana"
                required
              />
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">জেলা</label>
              <input
                type="text"
                class="form-control"
                v-model="form.ut_district"
                required
              />
            </div>
          </div>

          <!--
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="" class="labelColor">পিতা জীবিত কিনা</label>
                            <select class="form-control" v-model="form.successor_father_alive_status">
                                <option value="">নির্বাচন করুন</option>
                                <option>হ্যাঁ</option>
                                <option>না</option>
                            </select>
                        </div>
                    </div> -->

          <!--
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="" class="labelColor">মাতা জীবিত কিনা</label>
                            <select class="form-control" v-model="form.successor_mother_alive_status">
                                <option value="">নির্বাচন করুন</option>
                                <option>হ্যাঁ</option>
                                <option>না</option>
                            </select>
                        </div>
                    </div> -->

          <!--
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="" class="labelColor">পেশা</label>
                            <input type="text" class="form-control" v-model="form.applicant_occupation">
                        </div>
                    </div> -->

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">বাসিন্দার ধরণ</label>
              <select
                class="form-control"
                v-model="form.applicant_resident_status"
              >
                <option value="">নির্বাচন করুন</option>
                <option>স্থায়ী</option>
                <option>অস্থায়ী</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="app-heading">আবেদনকারীর তথ্য</div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor"
                >আবেদনকারীর নাম <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_name"
                required
              />
            </div>
          </div>

          <div
            class="col-md-4"
            style="display: none"
            v-if="
              sonodnamedata.enname == 'Certificate of Inheritance' ||
              sonodnamedata.enname == 'Inheritance certificate'
            "
          ></div>

          <div class="col-md-4" v-else>
            <div class="form-group">
              <label for="" class="labelColor">লিঙ্গ</label>
              <select class="form-control" v-model="form.applicant_gender">
                <option value="">লিঙ্গ নির্বাচন করুন</option>
                <option>পুরুষ</option>
                <option>মহিলা</option>
              </select>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">পিতা/স্বামীর নাম</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_father_name"
              />
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">মাতার নাম</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_mother_name"
              />
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">জাতীয় পরিচয়পত্র নং</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_national_id_number"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">জন্ম নিবন্ধন নং</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_birth_certificate_number"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">হোল্ডিং নং</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_holding_tax_number"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">জন্ম তারিখ</label>
              <input
                type="date"
                class="form-control"
                v-model="form.applicant_date_of_birth"
              />
            </div>
          </div>
          <div
            class="col-md-4"
            v-if="sonodnamedata.enname == 'Family certificate'"
          >
            <div class="form-group">
              <label for="" class="labelColor">বংশের নাম</label>
              <input
                type="text"
                class="form-control"
                v-model="form.family_name"
              />
            </div>
          </div>
          <div
            class="col-md-4"
            v-if="
              sonodnamedata.enname == 'Certificate of annual income' ||
              sonodnamedata.enname == 'Parents Income Certificate'
            "
          >
            <div class="form-group">
              <label for="" class="labelColor">বার্ষিক আয়</label>
              <input
                type="number"
                class="form-control"
                v-model="form.Annual_income"
              />
            </div>
          </div>
          <div class="col-md-4" v-if="sonodnamedata.enname == 'permit'">
            <div class="form-group">
              <label for="" class="labelColor">অনুমতি এর বিষয়</label>
              <input
                type="text"
                class="form-control"
                v-model="form.Subject_to_permission"
              />
            </div>
          </div>
          <div
            class="col-md-4"
            v-if="sonodnamedata.bnname == 'প্রতিবন্ধী সনদপত্র'"
          >
            <div class="form-group">
              <label for="" class="labelColor">প্রতিবন্ধী</label>
              <select class="form-control" v-model="form.disabled">
                <option value="">নির্বাচন করুন</option>
                <option>শারীরিক</option>
                <option>দৃষ্টি</option>
                <option>শ্রবন</option>
                <option>বাক</option>
                <option>বুদ্ধি</option>
                <option>বহুবিধ</option>
                <option>মানসিক</option>
              </select>
            </div>
          </div>
          <div
            class="col-md-4"
            v-if="
              sonodnamedata.enname ==
              'No Objection Letter to Transfer of Constituency'
            "
          >
            <div class="form-group">
              <label for="" class="labelColor">স্থানান্তরিত এলাকার নাম</label>
              <input
                type="text"
                class="form-control"
                v-model="form.Name_of_the_transferred_area"
              />
            </div>
          </div>
          <div class="col-md-4" v-if="sonodnamedata.enname == 'Certificate'">
            <div class="form-group">
              <label for="" class="labelColor">প্রত্যয়নপত্র এর বিষয়</label>
              <input
                type="text"
                class="form-control"
                v-model="form.The_subject_of_the_certificate"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-md-4"
            v-if="sonodnamedata.enname != 'Certificate of Inheritance'"
          >
            <div class="form-group">
              <label for="" class="labelColor">ছবি</label>
              <input
                type="file"
                accept="image/*"
                class="custom-file-input"
                @change="FileSelected2($event, 'image')"
                id="image"
              />
              <label
                class="custom-file-label"
                style="margin: 0px auto; margin-top: 32px; width: 93%"
                for="image"
                >Choose file</label
              >
              <img
                style="width: 100%"
                thumbnail
                fluid
                v-if="form.image != null"
                :src="form.image"
                alt="Image 3"
              />
            </div>
          </div>
          <div class="col-md-4" v-if="sonodnamedata.enname == 'Trade license'">
            <div class="form-group">
              <label for="" class="labelColor"
                >প্রতিষ্ঠানের মালিকানার ধরণ *</label
              >
              <select class="form-control" v-model="form.applicant_owner_type">
                <option value="">নির্বাচন করুন</option>
                <option>ব্যক্তি মালিকানাধীন</option>
                <option>যৌথ মালিকানা</option>
                <option>কোম্পানী</option>
              </select>
            </div>
          </div>

          <!-- <div class="col-md-4">
                        <div class="form-group">
                            <label for="" class="labelColor">সেবার ধরণ</label>
                            <select class="form-control" v-model="form.sonod_name" disabled>
                                <option value="">নির্বাচন করুন</option>
                                <option v-for="(sName, index) in SonodNames" :value="sName.bnname" :key="index">{{
                                sName.bnname }}</option>
                            </select>
                        </div>
                    </div> -->

          <!--
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="" class="labelColor">পাসপোর্ট নং ( ইংরেজিতে )</label>
                            <input type="text" class="form-control" v-model="form.applicant_passport_number">
                        </div>
                    </div> -->

          <div class="col-md-4" v-if="sonodnamedata.enname == 'Trade license'">
            <div class="form-group">
              <label for="" class="labelColor">প্রতিষ্ঠানের নাম</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_name_of_the_organization"
              />
            </div>
          </div>

          <div class="col-md-4" v-if="sonodnamedata.enname == 'Trade license'">
            <div class="form-group">
              <label for="" class="labelColor">প্রতিষ্ঠানের ঠিকানা</label>
              <input
                type="text"
                class="form-control"
                v-model="form.organization_address"
              />
            </div>
          </div>

          <!--
                    <div class="col-md-4" style="display:none" v-if="sonodnamedata.enname == 'Certificate of Inheritance' || sonodnamedata.enname == 'Inheritance certificate'"></div>
                    <div class="col-md-4" v-else>
                        <div class="form-group">
                            <label for="" class="labelColor">বৈবাহিক সম্পর্ক</label>
                            <select class="form-control" v-model="form.applicant_marriage_status">
                                <option value="">নির্বাচন করুন</option>
                                <option>বিবাহিত</option>
                                <option>অবিবাহিত</option>
                                <option>তালাক প্রাপ্ত</option>
                                <option>বিধবা</option>
                                <option>অন্যান্য</option>
                            </select>
                        </div>
                    </div> -->

          <div class="col-md-4" v-if="sonodnamedata.enname == 'Trade license'">
            <div class="form-group">
              <label for="" class="labelColor">পেশা</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_occupation"
              />
            </div>
          </div>

          <!--
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="" class="labelColor">শিক্ষাগত যোগ্যতা</label>
                            <input type="text" class="form-control" v-model="form.applicant_education">
                        </div>
                    </div> -->

          <!--
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="" class="labelColor">ধর্ম</label>
                            <select class="form-control" v-model="form.applicant_religion">
                                <option value="">নির্বাচন করুন</option>
                                <option>ইসলাম</option>
                                <option>হিন্দু</option>
                                <option>বৌদ্ধ</option>
                                <option>খ্রিস্টান</option>
                                <option>অন্যান্য</option>
                            </select>
                        </div>
                    </div> -->

          <div class="col-md-4" v-if="sonodnamedata.enname == 'Trade license'">
            <div class="form-group">
              <label for="" class="labelColor">ভ্যাট আইডি (যদি থাকে)</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_vat_id_number"
              />
            </div>
          </div>
          <div class="col-md-4" v-if="sonodnamedata.enname == 'Trade license'">
            <div class="form-group">
              <label for="" class="labelColor">ট্যাক্স আইডি (যদি থাকে)</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_tax_id_number"
              />
            </div>
          </div>

          <div class="col-md-4" v-if="sonodnamedata.enname == 'Trade license'">
            <div class="form-group">
              <label for="" class="labelColor"
                >ব্যবসা, বৃত্তি, পেশা, বা শিল্প প্রতিষ্ঠানের শ্রেণী</label
              >
              <select
                class="form-control"
                v-model="form.applicant_type_of_businessKhat"
                @change="GetKhatSubCate"
                required
              >
                <option value="">নির্বাচন করুন</option>

                <option
                  v-for="(TradeLicenseKhat, indexs) in TradeLicenseKhats"
                  :key="indexs"
                  :value="TradeLicenseKhat.khat_id"
                >
                  {{ TradeLicenseKhat.name }}
                </option>
              </select>
            </div>
          </div>

          <div
            class="col-md-4"
            v-if="
              sonodnamedata.enname == 'Trade license' && businessType == true
            "
          >
            <div class="form-group">
              <label for="" class="labelColor">মূলধন/ব্যবসার ধরন</label>
              <select
                class="form-control"
                v-model="form.applicant_type_of_businessKhatAmount"
                @change="GetKhatSubCateAmount"
                required
              >
                <option value="">নির্বাচন করুন</option>

                <option
                  v-for="(
                    TradeLicenseKhatAmout, indexs
                  ) in TradeLicenseKhatAmouts"
                  :key="indexs"
                  :value="TradeLicenseKhatAmout.khat_id"
                >
                  {{ TradeLicenseKhatAmout.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="col-md-4" v-if="sonodnamedata.enname == 'Trade license'">
            <div class="form-group">
              <label for="" class="labelColor">বকেয়া</label>
              <input
                type="tel"
                class="form-control"
                v-model="form.last_years_money"
                required
              />
            </div>
          </div>

          <div class="col-md-4" v-if="sonodnamedata.enname == 'Trade license'">
            <div class="form-group">
              <label for="" class="labelColor">ব্যবসার বিবরণ</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_type_of_business"
                required
              />
            </div>
          </div>

          <div class="col-md-4" v-if="sonodnamedata.enname == 'Trade license'">
            <div class="form-group">
              <label for="" class="labelColor">অর্থ বছর</label>
              <select class="form-control" v-model="form.orthoBchor" required>
                <option value="">অর্থ বছর নির্বাচন করুন</option>
                <option value="2024-25">২০২৪-২৫</option>
                <option value="2023-24">২০২৩-২৪</option>
                <!-- <option value="2022-23">২০২২-২৩</option> -->
              </select>
            </div>
          </div>

          <div
            class="col-md-4"
            style="display: none"
            v-if="
              sonodnamedata.enname == 'Certificate of Inheritance' ||
              sonodnamedata.enname == 'Inheritance certificate' ||
              sonodnamedata.enname == 'Trade license'
            "
          ></div>
          <div class="col-md-4" v-else>
            <div class="form-group">
              <label for="" class="labelColor">বাসিন্দার ধরণ</label>
              <select
                class="form-control"
                v-model="form.applicant_resident_status"
              >
                <option value="">নির্বাচন করুন</option>
                <option>স্থায়ী</option>
                <option>অস্থায়ী</option>
              </select>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">মোবাইল</label>
              <input
                type="tel"
                class="form-control"
                name="phone"
                minlength="11"
                maxlength="11"
                v-model="form.applicant_mobile"
                required
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="labelColor">ই-মেইল</label>
              <input
                type="email"
                class="form-control"
                v-model="form.applicant_email"
              />
            </div>
          </div>

          <div
            class="col-md-12"
            v-if="
              sonodnamedata.enname == 'Miscellaneous certificates' ||
              sonodnamedata.enname == 'Certificate of No Objection'
            "
          >
            <div class="form-group">
              <label for="" class="labelColor"
                >আবেদনকৃত প্রত্যয়নের বিবরণ উল্লেখ করুন</label
              >
              <textarea
                class="form-control"
                v-model="form.prottoyon"
                cols="30"
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="app-heading">বর্তমান ঠিকানা</div>
            <div class="col-md-12"></div>

            <div class="form-group" style="margin-top: 66px !important">
              <label for="" class="labelColor">বিভাগ</label>

              <select
                class="form-control"
                name="division"
                id="division"
                v-model="Pdivision"
                @change="getdistrictFun"
              >
                <option value="">বিভাগ নির্বাচন করুন</option>
                <option
                  v-for="div in getdivisions"
                  :key="div.id"
                  :value="div.id"
                >
                  {{ div.bn_name }}
                </option>
              </select>

              <!-- <input type="text" class="form-control" v-model="form.applicant_present_district"> -->
            </div>

            <div class="form-group">
              <label for="" class="labelColor">জেলা</label>

              <select
                class="form-control"
                name="district"
                id="district"
                v-model="applicant_present_district"
                @change="getthanaFun"
              >
                <option value="">জেলা নির্বাচন করুন</option>
                <option
                  v-for="dist in getdistricts"
                  :key="dist.id"
                  :value="dist.id"
                >
                  {{ dist.bn_name }}
                </option>
              </select>

              <!-- <input type="text" class="form-control" v-model="form.applicant_present_district"> -->
            </div>
            <div class="form-group">
              <label for="" class="labelColor">উপজেলা/থানা</label>

              <select
                class="form-control"
                name="thana"
                id="thana"
                v-model="form.applicant_present_Upazila"
                @change="getuniounFun"
              >
                <option value="">উপজেলা নির্বাচন করুন</option>
                <option
                  v-for="thana in getthanas"
                  :key="thana.id"
                  :value="thana.bn_name"
                >
                  {{ thana.bn_name }}
                </option>
              </select>

              <!-- <input type="text" class="form-control" v-model="form.applicant_present_Upazila"> -->
            </div>
            <div class="form-group">
              <label for="" class="labelColor">পোষ্ট অফিস</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_present_post_office"
              />
            </div>
            <div class="form-group">
              <label for="" class="labelColor">ওয়ার্ড নং</label>
              <select
                v-model="form.applicant_present_word_number"
                id="word_no"
                class="form-control"
                required
              >
                <option value="">ওয়াড নং</option>
                <option value="1">১</option>
                <option value="2">২</option>
                <option value="3">৩</option>
                <option value="4">৪</option>
                <option value="5">৫</option>
                <option value="6">৬</option>
                <option value="7">৭</option>
                <option value="8">৮</option>
                <option value="9">৯</option>
              </select>
              <!-- <input type="text" class="form-control" v-model="form.applicant_present_word_number"> -->
            </div>
            <div class="form-group">
              <label for="" class="labelColor">গ্রাম/মহল্লা</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_present_village"
              />
            </div>
            <!-- <div class="form-group">
                            <label for="" class="labelColor">রোড/ব্লক/সেক্টর</label>
                            <input type="text" class="form-control" v-model="form.applicant_present_road_block_sector">
                        </div> -->
          </div>
          <div class="col-md-6">
            <div class="app-heading">স্থায়ী ঠিকানা</div>
            <div class="col-md-12">
              <input
                type="checkbox"
                id="checkbox"
                v-model="sameStatus"
                @change="sameAddress"
              />
              <label for="checkbox">
                বর্তমান ঠিকানা ও স্থায়ী ঠিকানা একই হলে</label
              >
            </div>

            <div class="form-group">
              <label for="" class="labelColor">বিভাগ</label>

              <select
                class="form-control"
                name="division"
                id="division"
                v-model="Perdivision"
                @change="getdistrictFunPer"
              >
                <option value="">বিভাগ নির্বাচন করুন</option>
                <option
                  v-for="div in getdivisionsPer"
                  :key="div.id"
                  :value="div.id"
                >
                  {{ div.bn_name }}
                </option>
              </select>

              <!-- <input type="text" class="form-control" v-model="form.applicant_present_district"> -->
            </div>

            <div class="form-group">
              <label for="" class="labelColor">জেলা</label>

              <select
                class="form-control"
                name="district"
                id="district"
                v-model="applicant_permanent_district"
                @change="getthanaFunPer"
              >
                <option value="">জেলা নির্বাচন করুন</option>
                <option
                  v-for="dist in getdistrictsPer"
                  :key="dist.id"
                  :value="dist.id"
                >
                  {{ dist.bn_name }}
                </option>
              </select>

              <!-- <input type="text" class="form-control" v-model="form.applicant_permanent_district"> -->
            </div>
            <div class="form-group">
              <label for="" class="labelColor">উপজেলা/থানা</label>
              <select
                class="form-control"
                name="thana"
                id="thana"
                v-model="form.applicant_permanent_Upazila"
                @change="getuniounFunPer"
              >
                <option value="">উপজেলা নির্বাচন করুন</option>
                <option
                  v-for="thana in getthanasPer"
                  :key="thana.id"
                  :value="thana.bn_name"
                >
                  {{ thana.bn_name }}
                </option>
              </select>
              <!-- <input type="text" class="form-control" v-model="form.applicant_permanent_Upazila"> -->
            </div>
            <div class="form-group">
              <label for="" class="labelColor">পোষ্ট অফিস</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_permanent_post_office"
              />
            </div>

            <div class="form-group">
              <label for="" class="labelColor">ওয়ার্ড নং</label>
              <select
                v-model="form.applicant_permanent_word_number"
                id="word_no"
                class="form-control"
                required
              >
                <option value="">ওয়াড নং</option>
                <option value="1">১</option>
                <option value="2">২</option>
                <option value="3">৩</option>
                <option value="4">৪</option>
                <option value="5">৫</option>
                <option value="6">৬</option>
                <option value="7">৭</option>
                <option value="8">৮</option>
                <option value="9">৯</option>
              </select>
              <!-- <input type="text" class="form-control" v-model="form.applicant_permanent_word_number"> -->
            </div>

            <div class="form-group">
              <label for="" class="labelColor">গ্রাম/মহল্লা</label>
              <input
                type="text"
                class="form-control"
                v-model="form.applicant_permanent_village"
              />
            </div>
            <!-- <div class="form-group">
                            <label for="" class="labelColor">রোড/ব্লক/সেক্টর</label>
                            <input type="text" class="form-control"
                                v-model="form.applicant_permanent_road_block_sector">
                        </div> -->
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="app-heading">সংযুক্ত</div>
          </div>

          <div class="col-md-12 row mb-3">
            <div class="col-md-4">
              <label for="" class="labelColor">সংযুক্তির ধরণ</label>
              <select class="form-control" v-model="attactType" required>
                <option value="">নির্বাচন করুন</option>
                <option value="nid">জাতীয় পরিচয়পত্র</option>
                <option value="dob">জন্ম নিবন্ধন</option>
              </select>
            </div>
          </div>

          <!-- col-md-4 -->
          <div class="col-md-4" v-if="attactType == 'nid'">
            <div class="form-group">
              <label for="" class="labelColor"
                >জাতীয় পরিচয়পত্র (Front page) <br /><span
                  style="font-size: 11px; color: red"
                  >(ছবি অবশ্যই 100KB এর উপরে হতে হবে!)</span
                ></label
              >
              <input
                type="file"
                accept="image/*"
                class="form-control custom-file-input"
                @change="
                  FileSelected($event, 'applicant_national_id_front_attachment')
                "
                id="applicant_national_id_front_attachment"
                required
              />
              <label
                class="custom-file-label"
                style="margin: 0px auto; margin-top: 56px; width: 93%"
                for="applicant_national_id_front_attachment"
                >Choose file</label
              >
              <img
                style="width: 100%"
                thumbnail
                fluid
                v-if="form.applicant_national_id_front_attachment != null"
                :src="form.applicant_national_id_front_attachment"
                alt="Image 3"
              />
            </div>
          </div>
          <!-- col-md-4 -->
          <!-- col-md-4 -->
          <div class="col-md-4" v-if="attactType == 'nid'">
            <div class="form-group">
              <label for="" class="labelColor"
                >জাতীয় পরিচয়পত্র (Back page) <br /><span
                  style="font-size: 11px; color: red"
                  >(ছবি অবশ্যই 100KB এর উপরে হতে হবে!)</span
                ></label
              >
              <input
                type="file"
                accept="image/*"
                class="form-control custom-file-input"
                @change="
                  FileSelected($event, 'applicant_national_id_back_attachment')
                "
                id="applicant_national_id_back_attachment"
                required
              />
              <label
                class="custom-file-label"
                style="margin: 0px auto; margin-top: 56px; width: 93%"
                for="applicant_national_id_back_attachment"
                >Choose file</label
              >
              <img
                style="width: 100%"
                thumbnail
                fluid
                v-if="form.applicant_national_id_back_attachment != null"
                :src="form.applicant_national_id_back_attachment"
                alt="Image 3"
              />
            </div>
          </div>
          <!-- col-md-4 -->
          <!-- col-md-4 -->
          <div class="col-md-4" v-if="attactType == 'dob'">
            <div class="form-group">
              <label for="" class="labelColor"
                >জন্ম নিবন্ধন <br /><span style="font-size: 11px; color: red"
                  >(ছবি অবশ্যই 100KB এর উপরে হতে হবে!)</span
                ></label
              >
              <input
                type="file"
                accept="image/*"
                class="form-control custom-file-input"
                @change="
                  FileSelected($event, 'applicant_birth_certificate_attachment')
                "
                id="applicant_birth_certificate_attachment"
                required
              />
              <label
                class="custom-file-label"
                style="margin: 0px auto; margin-top: 56px; width: 93%"
                for="applicant_birth_certificate_attachment"
                >Choose file</label
              >
              <img
                style="width: 100%"
                thumbnail
                fluid
                v-if="form.applicant_birth_certificate_attachment != null"
                :src="form.applicant_birth_certificate_attachment"
                alt="Image 3"
              />
            </div>
          </div>
          <!-- col-md-4 -->
        </div>

        <div
          class="app-heading"
          v-if="
            sonodnamedata.enname == 'Certificate of Inheritance' ||
            sonodnamedata.enname == 'Inheritance certificate'
          "
        >
          ওয়ারিশগণের তালিকা
        </div>
        <table
          class="table"
          v-if="
            sonodnamedata.enname == 'Certificate of Inheritance' ||
            sonodnamedata.enname == 'Inheritance certificate'
          "
        >
          <tr>
            <th>নাম</th>
            <th>সম্পর্ক</th>
            <th>জন্ম তারিখ</th>
            <th>জাতীয় পরিচয়পত্র/জন্মনিবন্ধন নম্বর</th>
            <th>
              <button
                type="button"
                class="flex justify-start btn btn-info"
                @click="addMore()"
              >
                যোগ করুন
              </button>
            </th>
          </tr>
          <tr v-for="(successor, index) in form.successors" :key="index">
            <input type="hidden" v-model="(successor.w_id = index)" />
            <th>
              <input
                v-model="successor.w_name"
                placeholder="নাম"
                class="form-control"
              />
            </th>
            <th>
              <select v-model="successor.w_relation" class="form-control">
                <option value="">সম্পর্ক</option>
                <option>স্ত্রী</option>
                <option>পুত্র</option>
                <option>কন্যা</option>
                <option>পিতা</option>
                <option>মাতা</option>
                <option>স্বামী</option>
                <option>ভাই</option>
                <option>বোন</option>
                <option>নাতি</option>
                <option>নাতনি</option>
                <option>ভাতিজা</option>
                <option>ভাতিজী</option>
                <option>চাচা</option>
              </select>
              <!-- <input v-model="successor.w_relation" placeholder="সম্পর্ক" class="form-control" /> -->
            </th>
            <th>
              <input
                v-model="successor.w_age"
                type="date"
                placeholder="জন্ম তারিখ"
                class="form-control"
              />
            </th>
            <th>
              <input
                v-model="successor.w_nid"
                type="text"
                @keydown="portKeydown($event)"
                placeholder="জাতীয় পরিচয়পত্র নাম্বার/জন্মনিবন্ধন নাম্বার"
                class="form-control"
              />
            </th>
            <th>
              <button
                type="button"
                class="ml-2 btn btn-danger"
                @click="remove(index)"
                v-show="index != 0"
              >
                মুছন
              </button>
            </th>
          </tr>
        </table>
        <div style="text-align: center">
          <b-button type="submit" variant="primary">সাবমিট</b-button>
        </div>
        <!-- <b-button class="ml-2" @click="resetForm()">রিসেট</b-button> -->
      </div>
    </form>
    <!-- Info modal -->
    <b-modal
      :id="infoModal.id"
      size="xl"
      :title="infoModal.title"
      ok-only
      ok-disabled
      no-close-on-esc
      no-close-on-backdrop
    >
      <div
        class="row"
        v-if="
          sonodnamedata.enname == 'Certificate of Inheritance' ||
          sonodnamedata.enname == 'Inheritance certificate'
        "
      >
        <div
          class="col-md-4 col-6 mt-3"
          v-if="sonodnamedata.enname == 'Certificate of Inheritance'"
        >
          <b>মৃত ব্যাক্তির নাম : </b>{{ form.utname }}
        </div>
        <div
          class="col-md-4 col-6 mt-3"
          v-if="sonodnamedata.enname == 'Inheritance certificate'"
        >
          <b>জীবিত ব্যক্তির নাম : </b>{{ form.utname }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>লিঙ্গ : </b>{{ form.applicant_gender }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>বৈবাহিক সম্পর্ক : </b>{{ form.applicant_marriage_status }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>পিতা/স্বামীর নাম : </b>{{ form.ut_father_name }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>মাতার নাম : </b>{{ form.ut_mother_name }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>পিতা জীবিত কিনা : </b>{{ form.successor_father_alive_status }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>মাতা জীবিত কিনা : </b>{{ form.successor_mother_alive_status }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>পেশা : </b>{{ form.applicant_occupation }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>বাসিন্দা : </b>{{ form.applicant_resident_status }}
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="app-heading">আবেদনকারীর তথ্য</div>
        </div>
        <div class="col-md-4 mt-3"></div>
        <div class="col-md-4 mt-3">
          <img width="100%" :src="form.image" alt="" />
        </div>
        <div class="col-md-4 mt-3"></div>
        <div class="col-md-4 col-6 mt-3">
          <b>আবেদনকারীর নাম : </b>{{ form.applicant_name }}
        </div>
        <div
          class="col-md-4 col-6 mt-3"
          v-if="sonodnamedata.enname == 'Certification of the same name'"
        >
          <b>দ্বিতীয় নাম : </b>{{ form.applicant_second_name }}
        </div>

        <div
          class="col-md-4 col-6 mt-3"
          style="display: none"
          v-if="
            sonodnamedata.enname == 'Certificate of Inheritance' ||
            sonodnamedata.enname == 'Inheritance certificate'
          "
        ></div>

        <div class="col-md-4 col-6 mt-3" v-else>
          <b>লিঙ্গ : </b>{{ form.applicant_gender }}
        </div>

        <div
          class="col-md-4 col-6 mt-3"
          style="display: none"
          v-if="
            sonodnamedata.enname == 'Certificate of Inheritance' ||
            sonodnamedata.enname == 'Inheritance certificate'
          "
        ></div>
        <div class="col-md-4 col-6 mt-3" v-else>
          <b>পিতা/স্বামীর নাম : </b>{{ form.applicant_father_name }}
        </div>

        <div class="col-md-4 col-6 mt-3">
          <b>মাতার নাম : </b>{{ form.applicant_mother_name }}
        </div>

        <div class="col-md-4 col-6 mt-3">
          <b>ন্যাশনাল আইডি : </b>{{ form.applicant_national_id_number }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>জন্ম নিবন্ধন নং : </b>{{ form.applicant_birth_certificate_number }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>হোল্ডিং নং : </b>{{ form.applicant_holding_tax_number }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>জম্ম তারিখ : </b>{{ form.applicant_date_of_birth }}
        </div>
        <div
          class="col-md-4 col-6 mt-3"
          v-if="sonodnamedata.enname == 'Family certificate'"
        >
          <b>বংশের নাম : </b>{{ form.family_name }}
        </div>
        <div
          class="col-md-4 col-6 mt-3"
          v-if="
            sonodnamedata.enname == 'Certificate of annual income' ||
            sonodnamedata.enname == 'Parents Income Certificate'
          "
        >
          <b>বার্ষিক আয় : </b>{{ form.Annual_income }}
        </div>
        <div
          class="col-md-4 col-6 mt-3"
          v-if="sonodnamedata.enname == 'permit'"
        >
          <b>অনুমতি এর বিষয় : </b>{{ form.Subject_to_permission }}
        </div>
        <div
          class="col-md-4 col-6 mt-3"
          v-if="sonodnamedata.bnname == 'প্রতিবন্ধী সনদপত্র'"
        >
          <b>প্রতিবন্ধী : </b>{{ form.disabled }}
        </div>
        <div
          class="col-md-4 col-6 mt-3"
          v-if="
            sonodnamedata.enname ==
            'No Objection Letter to Transfer of Constituency'
          "
        >
          <b>স্থানান্তরিত এলাকার নাম : </b
          >{{ form.Name_of_the_transferred_area }}
        </div>
        <div
          class="col-md-4 col-6 mt-3"
          v-if="sonodnamedata.enname == 'Certificate'"
        >
          <b>প্রত্যয়নপত্র এর বিষয় : </b
          >{{ form.The_subject_of_the_certificate }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>পাসপোর্ট নং : </b>{{ form.applicant_passport_number }}
        </div>
        <div
          class="col-md-4 col-6 mt-3"
          style="display: none"
          v-if="
            sonodnamedata.enname == 'Certificate of Inheritance' ||
            sonodnamedata.enname == 'Inheritance certificate'
          "
        ></div>
        <div class="col-md-4 col-6 mt-3" v-else>
          <b>বৈবাহিক সম্পর্ক : </b>{{ form.applicant_marriage_status }}
        </div>
        <div
          class="col-md-4 col-6 mt-3"
          style="display: none"
          v-if="
            sonodnamedata.enname == 'Certificate of Inheritance' ||
            sonodnamedata.enname == 'Inheritance certificate'
          "
        ></div>
        <div class="col-md-4 col-6 mt-3" v-else>
          <b>পেশা: </b>{{ form.applicant_occupation }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>শিক্ষাগত যোগ্যতা: </b>{{ form.applicant_education }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>ধর্ম: </b>{{ form.applicant_religion }}
        </div>
        <div
          class="col-md-4 col-6 mt-3"
          style="display: none"
          v-if="
            sonodnamedata.enname == 'Certificate of Inheritance' ||
            sonodnamedata.enname == 'Inheritance certificate'
          "
        ></div>
        <div class="col-md-4 col-6 mt-3" v-else>
          <b>বাসিন্দা: </b>{{ form.applicant_resident_status }}
        </div>
        <div
          class="col-md-12 col-12 mt-3"
          v-if="form.sonod_name != 'ট্রেড লাইসেন্স'"
        >
          <b>আবেদনকৃত প্রত্যয়নের : <br /> </b>{{ form.prottoyon }}
        </div>
        <div class="col-md-12">
          <div class="app-heading">বর্তমান ঠিকানা</div>
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>গ্রাম/মহল্লা: </b>{{ form.applicant_present_village }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>রোড/ব্লক/সেক্টর: </b>{{ form.applicant_present_road_block_sector }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>ওয়ার্ড নং: </b>{{ form.applicant_present_word_number }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>জেলা: </b>{{ form.applicant_present_district }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>উপজেলা/থানা: </b>{{ form.applicant_present_Upazila }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>পোষ্ট অফিস: </b>{{ form.applicant_present_post_office }}
        </div>
        <div class="col-md-12">
          <div class="app-heading">স্থায়ী ঠিকানা</div>
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>গ্রাম/মহল্লা: </b>{{ form.applicant_permanent_village }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>রোড/ব্লক/সেক্টর: </b
          >{{ form.applicant_permanent_road_block_sector }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>ওয়ার্ড নং: </b>{{ form.applicant_permanent_word_number }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>জেলা: </b>{{ form.applicant_permanent_district }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>উপজেলা/থানা: </b>{{ form.applicant_permanent_Upazila }}
        </div>
        <div class="col-md-4 col-6 mt-3">
          <b>পোষ্ট অফিস: </b>{{ form.applicant_permanent_post_office }}
        </div>
        <div class="col-md-12">
          <div class="app-heading">যোগাযোগের ঠিকানা</div>
        </div>
        <div class="col-md-6 col-6 mt-3">
          <b>মোবাইল: </b>{{ form.applicant_mobile }}
        </div>
        <div class="col-md-6 col-6 mt-3">
          <b>ইমেল: </b>{{ form.applicant_email }}
        </div>
        <div class="col-md-12">
          <div class="app-heading">সংযুক্ত</div>
        </div>
        <div class="col-md-4 col-6 mt-3">
          <span>ন্যাশনাল আইডি (Front page)</span> <br />
          <img
            width="100%"
            :src="form.applicant_national_id_front_attachment"
            alt=""
          />
        </div>
        <div class="col-md-4 col-6 mt-3">
          <span>ন্যাশনাল আইডি (Back page)</span> <br />
          <img
            width="100%"
            :src="form.applicant_national_id_back_attachment"
            alt=""
          />
        </div>
        <div class="col-md-4 col-6 mt-3">
          <span>জন্ম নিবন্ধন</span> <br />
          <img
            width="100%"
            :src="form.applicant_birth_certificate_attachment"
            alt=""
          />
        </div>
        <div
          class="col-md-12"
          v-if="
            sonodnamedata.enname == 'Certificate of Inheritance' ||
            sonodnamedata.bnname == 'Inheritance certificate'
          "
        >
          <div class="app-heading">ওয়ারিশগনের তালিকা</div>
        </div>
        <table
          class="table"
          v-if="
            sonodnamedata.enname == 'Certificate of Inheritance' ||
            sonodnamedata.bnname == 'Inheritance certificate'
          "
        >
          <tr>
            <th>ক্রমিক</th>
            <th>নাম</th>
            <th>সম্পর্ক</th>
            <th>জন্ম তারিখ</th>
            <th>জাতীয় পরিচয়পত্র নাম্বার</th>
          </tr>
          <tr v-for="(ut, indexs) in form.successors" :key="'ut' + indexs">
            <td>{{ ut.w_id }}</td>
            <td>{{ ut.w_name }}</td>
            <td>{{ ut.w_relation }}</td>
            <td>{{ ut.w_age }}</td>
            <td>{{ ut.w_nid }}</td>
          </tr>
        </table>
      </div>
      <br />
      <br />
      <form @submit.stop.prevent="finalSubmit" style="margin-top: 50px">
        <div
          class="text-center"
          style="width: 50%; margin: 0 auto"
          v-if="getunionInfos.payment_type == 'Prepaid'"
        >
          <h3>
            আপনার আবেদনটি সফল করার জন্য সনদের ফি প্রদান করুন ।
            {{ sonodnamedata.bnname }} এর ফি {{ charages.totalamount }} টাকা ।
          </h3>
          <button type="submit" class="btn btn-info" v-if="!submitLoad">
            Pay And Submit
          </button>
          <span class="btn btn-info" v-else-if="submitLoad"
            >Please Wait...</span
          >
          <button type="submit" class="btn btn-info" v-if="submitLoad">
            Try Again
          </button>
        </div>
        <div
          class="text-center"
          style="width: 50%; margin: 0 auto"
          v-else-if="getunionInfos.payment_type == 'Postpaid'"
        >
          <h3>আপনার আবেদনটি সফল করার জন্য Confirm বাটন এ চাপ দিন</h3>
          <button type="submit" class="btn btn-info" v-if="!submitLoad">
            Confirm
          </button>
          <span class="btn btn-info" v-else-if="submitLoad"
            >Please Wait...</span
          >
        </div>
      </form>

      <template #modal-footer>
        <div></div>
      </template>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "Applicationform",
  created() {
    this.form.applicant_national_id_front_attachment =
      this.$asseturl + "demonid/front.jpg";
    this.form.applicant_national_id_back_attachment =
      this.$asseturl + "demonid/back.jpg";
  },

  data() {
    return {
      attactType: "nid",
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
        content_id: "",
      },
      charages: {
        sonod_fee: 0,
        vatAmount: 0,
        taxAmount: 0,
        service: 0,
        totalamount: 0,
        last_years_money: 0,
      },
      pesaKor: 0,
      waitForPayment: false,
      submitLoad: false,
      sameStatus: "",
      sonodnamedata: {},
      sonodnameFee: {},
      SonodNamesOptions: {},
      form: {
        image: null,
        sonod_Id: "",
        unioun_name: null,
        year: null,
        ut_name: null,
        ut_religion: "",
        sonod_name: null,
        applicant_holding_tax_number: null,
        applicant_national_id_number: null,
        applicant_birth_certificate_number: null,
        applicant_passport_number: null,
        applicant_date_of_birth: null,
        family_name: null,
        Annual_income: null,
        Subject_to_permission: null,
        disabled: null,
        The_subject_of_the_certificate: null,
        Name_of_the_transferred_area: null,
        applicant_name: null,
        applicant_second_name: null,
        applicant_name_of_the_organization: null,
        organization_address: null,
        alive_status: "1",
        applicant_gender: null,
        applicant_marriage_status: null,
        ut_father_name: null,
        ut_mother_name: null,
        applicant_father_name: null,
        applicant_mother_name: null,
        applicant_occupation: null,
        applicant_education: null,
        applicant_religion: null,
        applicant_resident_status: "স্থায়ী",
        applicant_owner_type: null,
        applicant_vat_id_number: null,
        applicant_tax_id_number: null,
        applicant_type_of_business: null,
        applicant_type_of_businessKhat: null,
        applicant_type_of_businessKhatAmount: null,
        successor_father_alive_status: null,
        successor_mother_alive_status: null,
        utname: null,
        //////////////////////////////////////////////
        // বর্তমান ঠিকানা
        ut_grame: null,
        ut_word: null,
        ut_post: null,
        ut_thana: null,
        ut_district: null,
        //////////////////////////////////////////////
        // বর্তমান ঠিকানা
        applicant_present_village: null,
        applicant_present_road_block_sector: null,
        applicant_present_word_number: null,
        applicant_present_district: null,
        applicant_present_Upazila: null,
        applicant_present_post_office: null,
        //////////////////////////////////////////////
        // স্থায়ী ঠিকানা
        applicant_permanent_village: null,
        applicant_permanent_road_block_sector: null,
        applicant_permanent_word_number: null,
        applicant_permanent_district: null,
        applicant_permanent_Upazila: null,
        applicant_permanent_post_office: null,
        last_years_money: 0,
        //////////////////////////////////////////////
        // যোগাযোগের ঠিকানা
        applicant_mobile: null,
        applicant_email: null,
        //////////////////////////////////////////////
        // Attachment
        applicant_national_id_front_attachment: null,
        applicant_national_id_back_attachment: null,
        applicant_birth_certificate_attachment: null,
        prottoyon: null,
        orthoBchor: "2024-25",
        stutus: "Pending",
        payment_status: "Unpaid",
        successors: [
          {
            w_id: "",
            w_name: "",
            w_relation: "",
            w_age: "",
            w_nid: "",
          },
        ],
      },
      TradeLicenseKhats: {},
      TradeLicenseKhatAmouts: {},

      getdivisions: {},
      getdistricts: {},
      getthanas: {},
      getuniouns: {},

      getdivisionsPer: {},
      getdistrictsPer: {},
      getthanasPer: {},
      getuniounsPer: {},
      Pdivision: "",
      Perdivision: "",
      applicant_present_district: "",
      applicant_permanent_district: "",
      businessType: true,
    };
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        if (
          this.$route.params.name ==
          "Certificate_of_Building_Construction_Pond_Excavation_Mountain_Cutting"
        ) {
          this.$router.push({
            name: "application2",
            parmas: { name: this.$route.params.name },
          });
        }

        this.form.year = new Date().getFullYear();
        this.sonodname();

        //setTimeout(() => {
        // this.form.sonod_name = this.sonodnamedata.bnname;

        // var res = axios({ method: 'get', url: `/api/sonod/sonod_Id?union=${this.getUnion}`, data: [] })
        // axios.get(`/api/sonod/sonod_Id?union=${this.getUnion}`)
        //     .then((response) => {
        //         //   console.log(response.data)
        //         this.form.sonod_Id = `${response.data}`;
        //     })
        //}, 3000);
      },
      deep: true,
    },
  },
  //   updated() {
  //       console.log('ss');
  //     },
  methods: {
    async TradeLicenseKhatFun() {
      // var res = await this.callApi('get',`/api/tradeLicenseKhat?searhtype=main`,[]);
      this.TradeLicenseKhats = this.TradeLicenseKhat;
    },

    async GetKhatSubCate() {
      var res = await this.callApi(
        "get",
        `/api/tradeLicenseKhat?searhtype=sub&main_khat_id=${this.form.applicant_type_of_businessKhat}`,
        []
      );
      this.TradeLicenseKhatAmouts = res.data.tradeSub;

      if (res.data.tradeSub.length > 0) {
        this.businessType = true;
      } else {
        this.GetKhatSubCateAmount("single");
        this.businessType = false;
      }

      // this.form.applicant_type_of_business =  res.data.tradeMain.name;
    },

    async GetKhatSubCateAmount(type = "") {
      var typeData = "";
      if (type == "single") typeData = "&dataget=single";
      var res = await this.callApi(
        "get",
        `/api/tradeLicenseKhatFee?khat_id_1=${this.form.applicant_type_of_businessKhat}&khat_id_2=${this.form.applicant_type_of_businessKhatAmount}${typeData}`,
        []
      );
      this.pesaKor = res.data.fee;
    },

    async getdivisionFun() {
      //  var res = await this.callApi('get',`/api/getdivisions`,[]);
      this.getdivisions = this.allDivision;
    },

    async getdistrictFun() {
      var res = await this.callApi(
        "get",
        `/api/getdistrict?id=${this.Pdivision}`,
        []
      );
      this.getdistricts = res.data;
    },

    async getthanaFun() {
      var res = await this.callApi(
        "get",
        `/api/getthana?id=${this.applicant_present_district}`,
        []
      );
      this.getthanas = res.data;
      var resOwn = await this.callApi(
        "get",
        `/api/getdistrict?ownid=${this.applicant_present_district}`,
        []
      );
      this.form.applicant_present_district = resOwn.data.bn_name;
    },

    async getuniounFun() {
      var res = await this.callApi(
        "get",
        `/api/getunioun?id=${this.thana}`,
        []
      );
      this.getuniouns = res.data;
    },

    //////////////////////////////////

    async getdivisionFunPer() {
      //  var res = await this.callApi('get',`/api/getdivisions`,[]);
      this.getdivisionsPer = this.allDivision;
    },

    async getdistrictFunPer() {
      var res = await this.callApi(
        "get",
        `/api/getdistrict?id=${this.Perdivision}`,
        []
      );
      this.getdistrictsPer = res.data;
    },

    async getthanaFunPer() {
      // console.log(this.applicant_permanent_district)
      var res = await this.callApi(
        "get",
        `/api/getthana?id=${this.applicant_permanent_district}`,
        []
      );
      this.getthanasPer = res.data;
      var resOwn = await this.callApi(
        "get",
        `/api/getdistrict?ownid=${this.applicant_permanent_district}`,
        []
      );
      this.form.applicant_permanent_district = resOwn.data.bn_name;
    },

    async getuniounFunPer() {
      var res = await this.callApi(
        "get",
        `/api/getunioun?id=${this.thana}`,
        []
      );
      this.getuniounsPer = res.data;
    },

    FileSelected($event, parent_index) {
      let file = $event.target.files[0];

      if (parent_index == "image") {
        let reader = new FileReader();
        reader.onload = (event) => {
          this.form[parent_index] = event.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        if (file.size < 102400) {
          event.target.value = "";
          if (parent_index == "applicant_national_id_front_attachment") {
            this.form[parent_index] = this.$asseturl + "demonid/front.jpg";
          } else if (parent_index == "applicant_national_id_back_attachment") {
            this.form[parent_index] = this.$asseturl + "demonid/back.jpg";
          }
          Swal.fire({
            icon: "error",
            title: "দুঃখিত",
            text: "ছবি অবশ্যই 100KB এর উপরে হতে হবে!",
          });
        } else {
          let reader = new FileReader();
          reader.onload = (event) => {
            this.form[parent_index] = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
    },

    FileSelected2($event, parent_index) {
      let file = $event.target.files[0];
      let reader = new FileReader();
      reader.onload = (event) => {
        this.form[parent_index] = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    portKeydown(e) {
      if (/^\+$/.test(e.key)) {
        e.preventDefault();
      }
    },
    addMore() {
      this.form.successors.push({
        w_name: "",
        w_relation: "",
        w_age: "",
        w_nid: "",
      });
    },
    remove(index) {
      this.form.successors.splice(index, 1);
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      // console.log($error)
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form.image = null;
      this.form.applicant_holding_tax_number = null;
      this.form.applicant_national_id_number = null;
      this.form.applicant_birth_certificate_number = null;
      this.form.applicant_passport_number = null;
      this.form.applicant_date_of_birth = null;
      this.form.family_name = null;
      this.form.Annual_income = null;
      this.form.Subject_to_permission = null;
      this.form.disabled = null;
      this.form.The_subject_of_the_certificate = null;
      this.form.Name_of_the_transferred_area = null;
      this.form.applicant_name = null;
      this.form.applicant_second_name = null;
      this.form.alive_status = "1";
      this.form.applicant_gender = null;
      this.form.applicant_marriage_status = null;
      this.form.applicant_father_name = null;
      this.form.applicant_mother_name = null;
      this.form.applicant_occupation = null;
      this.form.applicant_education = null;
      this.form.applicant_religion = null;
      this.form.applicant_resident_status = "স্থায়ী";
      ////////////////////////////////////////////// =               this.for;.// =বর্তমান ঠিকানা
      this.form.applicant_present_village = null;
      this.form.applicant_present_road_block_sector = null;
      this.form.applicant_present_word_number = null;
      this.form.applicant_present_district = null;
      this.form.applicant_present_Upazila = null;
      this.form.applicant_present_post_office = null;
      ////////////////////////////////////////////// =               this.for;.// =স্থায়ী ঠিকানা
      this.form.applicant_permanent_village = null;
      this.form.applicant_permanent_road_block_sector = null;
      this.form.applicant_permanent_word_number = null;
      this.form.applicant_permanent_district = null;
      this.form.applicant_permanent_Upazila = null;
      this.form.applicant_permanent_post_office = null;
      ////////////////////////////////////////////// =               this.for;.// =যোগাযোগের ঠিকানা
      this.form.applicant_mobile = null;
      this.form.applicant_email = null;
      ////////////////////////////////////////////// =               this.for;.// =Attachment
      this.form.applicant_national_id_front_attachment = null;
      this.form.applicant_national_id_back_attachment = null;
      this.form.applicant_birth_certificate_attachment = null;
      this.form.prottoyon = null;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    sameAddress() {
      // console.log(value)
      if (this.sameStatus) {
        this.getdivisionFunPer();
        this.Perdivision = this.Pdivision;
        this.getdistrictFunPer();
        this.applicant_permanent_district = this.applicant_present_district;
        this.getthanaFunPer();
        this.form.applicant_permanent_Upazila =
          this.form.applicant_present_Upazila;

        this.form.applicant_permanent_village =
          this.form.applicant_present_village;
        this.form.applicant_permanent_road_block_sector =
          this.form.applicant_present_road_block_sector;
        this.form.applicant_permanent_word_number =
          this.form.applicant_present_word_number;

        this.form.applicant_permanent_post_office =
          this.form.applicant_present_post_office;
      } else {
        this.form.applicant_permanent_village = null;
        this.form.applicant_permanent_road_block_sector = null;
        this.form.applicant_permanent_word_number = null;
        this.form.applicant_permanent_district = null;
        this.form.applicant_permanent_Upazila = null;
        this.form.applicant_permanent_post_office = null;
      }
    },
    sonodname() {
      if (this.$route.params.name) {
        axios
          .get(
            `/api/get/sonodname/list?data=${this.$route.params.name.replaceAll(
              "_",
              " "
            )}&fees=1&unioun=${localStorage.getItem("unioun")}`
          )
          .then(({ data }) => {
            this.sonodnamedata = data.sonodname;
            this.sonodnameFee = data.sonodFee;

            this.form.sonod_name = this.sonodnamedata.bnname;
            window.scrollTo(0, 0);
          })
          .catch();
      }
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    async onSubmit() {
      // if(this.attactType=='nid'){
      //     if(!this.form.applicant_national_id_front_attachment){

      //     }else if(!this.form.applicant_national_id_back_attachment){

      //     }

      // }if(this.attactType=='nid'){
      //     if(!this.form.applicant_birth_certificate_attachment){

      //     }
      // }

      var sonod_fee = 0;
      var payment_type = this.getunionInfos.payment_type;
      if (payment_type == "Prepaid") {
        var sonod_fee = Number(this.sonodnameFee.fees);
      }

      var vat = Number(this.getvatTax.vat);
      var tax = Number(this.getvatTax.tax);
      var service = Number(this.getvatTax.service);
      var vatAmount = (sonod_fee * vat) / 100;
      var taxAmount = (sonod_fee * tax) / 100;
      // var totalamount = sonod_fee + vatAmount + taxAmount + service
      var last_years_money = this.form.last_years_money;
      var tradeVat = 15;
      if (this.form.sonod_name == "ট্রেড লাইসেন্স") {
        var TradevatAmount = (sonod_fee * tradeVat) / 100;
        var totalamount = Number(this.pesaKor) + sonod_fee + TradevatAmount;
      } else {
        var totalamount = sonod_fee;
      }

      (this.charages = {
        sonod_fee: sonod_fee,
        vatAmount: vatAmount,
        taxAmount: taxAmount,
        pesaKor: this.pesaKor,
        service: service,
        tradeVat: tradeVat,
        totalamount: Number(totalamount) + Number(last_years_money),
        last_years_money: last_years_money,
      }),
        this.$root.$emit("bv::show::modal", this.infoModal.id);
    },
    async finalSubmit() {
      this.submitLoad = true;
      var redirect;
      var payment_type = this.getunionInfos.payment_type;
      if (payment_type == "Prepaid") {
        this.form.stutus = "Prepaid";
      } else if (payment_type == "Postpaid") {
        this.form.stutus = "Pending";
      }
      this.form["charages"] = this.charages;
      var res = await this.callApi(
        "post",
        "/api/nagorik/seba/inserts",
        this.form
      );
      var datas = res.data;
      // this.$router.push({ name: 'home' })
      if (payment_type == "Prepaid") {
        redirect = `/sonod/payment/${datas.id}`;
        this.waitForPayment = true;
        // this.checkPayment(datas.id);
        this.form["id"] = datas.id;
        // window.open(redirect, '_blank');
        window.location.href = redirect;
      } else if (payment_type == "Postpaid") {
        this.waitForPayment = true;
        // this.checkPayment(datas.id);
        // this.form['id'] = datas.id;
        Swal.fire({
          title: "অভিনন্দন",
          text: `আপনার আবেদনটি সফলভাবে দাখিল হয়েছে`,
          icon: "success",
          confirmButtonColor: "green",
          confirmButtonText: `আবেদন পত্র ডাউনলোড করুন`,
          // showDenyButton: true,
          showCancelButton: true,
          // denyButtonText: 'রশিদ ডাউনলোড করুন',
          cancelButtonText: "Back to home",
          customClass: {
            actions: "my-actions",
            cancelButton: "order-1 right-gap",
            confirmButton: "order-2",
            denyButton: "order-3",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          preConfirm: () => {
            redirect = "/document/" + res.data.sonod_name + "/" + res.data.id;
            window.open(redirect, "_blank");
            return false; // Prevent confirmed
          },
          preDeny: () => {
            redirect = "/invoice/" + res.data.sonod_name + "/" + res.data.id;
            window.open(redirect, "_blank");
            return false; // Prevent denied
          },
        }).then(async (result) => {
          console.log(result);
          if (result.isConfirmed) {
            // this.$root.$emit('bv::hide::modal', 'info-modal')
          } else if (result.isDenied) {
            // this.$root.$emit('bv::hide::modal', 'info-modal')
          } else if (result.isDismissed) {
            //cancel
            this.$router.push({ name: "home" });
          }
        });
        //  console.log(this.waitForPayment)
        // redirect = '/document/' + datas.sonod_name + '/' + datas.id;
        // window.open(redirect, '_blank');
      }
    },
    checkPayment(id) {
      var redirect;
      setInterval(() => {
        if (this.waitForPayment) {
          axios.get(`/api/sonod/single/${id}`).then((res) => {
            var payment_type = this.getunionInfos.payment_type;
            if (payment_type == "Prepaid") {
              if (
                res.data.stutus == "Pending" &&
                res.data.payment_status == "Paid"
              ) {
                this.waitForPayment = false;
                // console.log(this.waitForPayment)
                Swal.fire({
                  title: "Success",
                  text: `সনদের ফি সফলভাবে প্রদান হয়েছে`,
                  icon: "success",
                  confirmButtonColor: "green",
                  confirmButtonText: `আবেদন পত্র ডাউনলোড করুন`,
                  // showDenyButton: true,
                  showCancelButton: true,
                  // denyButtonText: 'রশিদ ডাউনলোড করুন',
                  cancelButtonText: "Back to home",
                  customClass: {
                    actions: "my-actions",
                    cancelButton: "order-1 right-gap",
                    confirmButton: "order-2",
                    // denyButton: 'order-3',
                  },
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  preConfirm: () => {
                    redirect =
                      "/document/" + res.data.sonod_name + "/" + res.data.id;
                    window.open(redirect, "_blank");
                    return false; // Prevent confirmed
                  },
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    redirect =
                      "/document/" + res.data.sonod_name + "/" + res.data.id;
                    window.open(redirect, "_blank");
                  } else if (result.isDismissed) {
                    //cancel
                    this.$router.push({ name: "home" });
                  }
                });
              } else if (res.data.stutus == "failed") {
                Swal.fire({
                  title: "দুঃখিত",
                  text: `সনদের ফি প্রদান হয়েছে বার্থ হয়েছে`,
                  icon: "error",
                  confirmButtonColor: "green",
                  confirmButtonText: `আবার চেষ্টা করুন`,
                  // showDenyButton: true,
                  showCancelButton: true,
                  // denyButtonText: 'রশিদ ডাউনলোড করুন',
                  cancelButtonText: "Back to home",
                  customClass: {
                    actions: "my-actions",
                    cancelButton: "order-1 right-gap",
                    confirmButton: "order-2",
                    // denyButton: 'order-3',
                  },
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    redirect = `/sonod/payment/${datas.id}`;

                    this.checkPayment(res.data.id);
                    this.form["id"] = res.data.id;
                    window.open(redirect, "_blank");
                  } else if (result.isDismissed) {
                    //cancel
                    this.$router.push({ name: "home" });
                  }
                });
              }
            } else if (payment_type == "Postpaid") {
              if (res.data.stutus == "Pending") {
                this.waitForPayment = false;
                Swal.fire({
                  title: "অভিনন্দন",
                  text: `আপনার আবেদনটি সফলভাবে দাখিল হয়েছে`,
                  icon: "success",
                  confirmButtonColor: "green",
                  confirmButtonText: `আবেদন পত্র ডাউনলোড করুন`,
                  // showDenyButton: true,
                  showCancelButton: true,
                  // denyButtonText: 'রশিদ ডাউনলোড করুন',
                  cancelButtonText: "Back to home",
                  customClass: {
                    actions: "my-actions",
                    cancelButton: "order-1 right-gap",
                    confirmButton: "order-2",
                    // denyButton: 'order-3',
                  },
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  preConfirm: () => {
                    redirect =
                      "/document/" + res.data.sonod_name + "/" + res.data.id;
                    window.open(redirect, "_blank");
                    return false; // Prevent confirmed
                  },
                  // preDeny: () => {
                  //     redirect = '/invoice/' + res.data.sonod_name + '/' + res.data.id;
                  //     window.open(redirect, '_blank');
                  //     return false; // Prevent denied
                  // },
                }).then(async (result) => {
                  console.log(result);
                  if (result.isConfirmed) {
                    // this.$root.$emit('bv::hide::modal', 'info-modal')
                    redirect =
                      "/document/" + res.data.sonod_name + "/" + res.data.id;
                    window.open(redirect, "_blank");
                  }
                  //  else if (result.isDenied) {
                  //     // this.$root.$emit('bv::hide::modal', 'info-modal')
                  //     redirect = '/invoice/' + res.data.sonod_name + '/' + res.data.id;
                  //     window.open(redirect, '_blank');
                  // }
                  else if (result.isDismissed) {
                    //cancel
                    this.$router.push({ name: "home" });
                  }
                });
              }
            }
            // console.log(res)
          });
        }
      }, 3000);
    },
  },
  mounted() {
    if (
      this.$route.params.name ==
      "Certificate_of_Building_Construction_Pond_Excavation_Mountain_Cutting"
    ) {
      this.$router.push({
        name: "application2",
        parmas: { name: this.$route.params.name },
      });
    }

    this.TradeLicenseKhatFun();
    this.getdivisionFun();
    this.getdivisionFunPer();

    // if(localStorage.getItem('form')){
    //     this.form = JSON.parse(localStorage.getItem('form'))
    // }
    this.form.year = new Date().getFullYear();
    this.sonodname();
    setTimeout(() => {
      this.form.sonod_name = this.sonodnamedata.bnname;

      // var res = axios({ method: 'get', url: `/api/sonod/sonod_Id?union=${this.getUnion}`, data: [] })
      // axios.get(`/api/sonod/sonod_Id?union=${this.getUnion}`)
      //     .then((response) => {
      //         //   console.log(response.data)
      //         this.form.sonod_Id = `${response.data}`;
      //     })
    }, 3000);
    //   Swal.fire({
    //                             title: 'Success',
    //                             text: `সনদের ফি সফলভাবে প্রদান হয়েছে`,
    //                             icon: 'success',
    //                             confirmButtonColor: 'green',
    //                             confirmButtonText: `আবেদন পত্র ডাউনলোড করুন`,
    //                             showDenyButton: true,
    //                             showCancelButton: true,
    //                             denyButtonText: 'রশিদ ডাউনলোড করুন',
    //                             cancelButtonText:'Back to home',
    //                             customClass: {
    //                                 actions: 'my-actions',
    //                                 cancelButton: 'order-1 right-gap',
    //                                 confirmButton: 'order-2',
    //                                 denyButton: 'order-3',
    //                             },
    //                             allowOutsideClick: false,
    //                             allowEscapeKey: false,
    //                             preConfirm: () => {
    //                             return false; // Prevent confirmed
    //                             },
    //                             preDeny: () => {
    //                                 return false; // Prevent denied
    //                             },
    //                         }).then(async (result) => {
    //                             console.log(result)
    //                             if (result.isConfirmed) {
    //                                 // this.$root.$emit('bv::hide::modal', 'info-modal')
    //                                 redirect = '/document/' + res.data.sonod_name + '/' + res.data.id;
    //                                 window.open(redirect, '_blank');
    //                             } else if (result.isDenied) {
    //                                 // this.$root.$emit('bv::hide::modal', 'info-modal')
    //                                 redirect = '/invoice/' + res.data.sonod_name + '/' + res.data.id;
    //                                 window.open(redirect, '_blank');
    //                             } else if (result.isDismissed) {
    //                                 //cancel
    //                                 this.$router.push({ name: 'home' })
    //                             }
    //                         })
  },
};
</script>
<style scoped>
.app-heading {
  text-align: center;
  margin: 32px 0;
  font-size: 23px;
  border-bottom: 1px solid #159513;
  color: #ffffff;
  background: #255f95;
}
.form-pannel {
  border: 1px solid #159513;
  padding: 25px 25px 25px 25px;
}
.panel-heading {
  padding: 11px 0px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  margin-top: 20px;
}
.form-pannel {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.dropdown-menu {
  z-index: 99999;
}
.labelColor {
  color: #493eff;
  font-weight: 600;
}
</style>
