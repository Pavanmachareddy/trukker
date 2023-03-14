import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDriver = ({ data, setData }) => {
  const navigate = useNavigate();

  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const defaultValue = {
    Fname: "",
    mname: "",
    Lname: "",
    dateofbirth: "",
    Mobilenumber: "",
    country: "",
    usertype: "",
    gender: "",
    nationality: "",
    countryOfBirth: "",
    cityOfBirth: "",
    nameOfTheCard: "",
    // streetName: "",
    // countryname: "",
    // citytown: "",
    // zipCode: "",
    // buildingNumber: "",
    // workStatus: "",
    // proffesionLevel: "",
    // employerName: "",
    // workerAddress: "",
    // salaryRange: "",
    // identificationType: "",
    // identificationNo: "",
    // issueddate: "",
    // DRelationship: "",
    // cardDelivery: "",
  };

  const validationSchema = yup.object().shape({
    Fname: yup.string().required("Please enter your first name"),
    mname: yup.string().required("Please enter your Middle name"),
    Lname: yup.string().required("Please enter your Last name"),
    // dateofbirth: yup.string().required("Please enter your valid date"),
    Mobilenumber: yup.string().required("Please enter your Mobile Number"),
    country: yup.string().required("Please select your country"),
    usertype: yup.string().required("Please select driver or broker&driver"),
    gender: yup.string().required("Please select gender"),
    nationality: yup.string().required("Please enter your Nationlity"),
    countryOfBirth: yup.string().required("Please enter your Birth country"),
    // cityOfBirth: yup.string().required("Please enter your Birth city"),
    nameOfTheCard: yup.string().required("Please enter your card name"),
    // streetName: yup.string().required("Please enter your street Name"),
    // countryname: yup.string().required("Please enter your country"),
    // citytown: yup.string().required("Please enter your city or town"),
    // zipCode: yup.string().required("Please enter your area zip code"),
    // buildingNumber: yup.string().required("Please enter your Building Number"),
    // workStatus: yup.string().required("Please enter your work status"),
    // proffesionLevel: yup.string().required("Please enter your ProffesionLevel"),
    // employerName: yup.string().required("Please enter EmloyeeName"),
    // workerAddress: yup.string().required("Please enter worker address"),
    // salaryRange: yup.string().required("Please enter salary Range between 12000 - 100000"),
    // identificationType: yup.string().required("Please enter Identification Type"),
    // identificationNo: yup.string().required("Please enter Identification number"),
    // issueddate: yup.string().required("Please enter Issued date"),
    // DRelationship: yup.string().required("Please enter your relationship"),
    // cardDelivery: yup.string().required("Please enter card delivery yes or no"),
  });

  let countryurl = "https://api.countrystatecity.in/v1/countries";
  let cityUrl = "https://api.countrystatecity.in/v1/countries/IN/cities";
  let stateUrl = "https://api.countrystatecity.in/v1/countries/IN/states";

  useEffect(() => {
    let countries = axios
      .get(countryurl, {
        headers: {
          "X-CSCAPI-KEY":
            "RGhzemVIZFQ2VWZWRGdUb2UwMUlBeW9MUEZyejd0dUwzaUhsYWExbQ==",
        },
      })
      .then((res) => setCountry(res.data))
      .catch((error) => console.log("error", error));

    let city = axios
      .get(cityUrl, {
        headers: {
          "X-CSCAPI-KEY":
            "RGhzemVIZFQ2VWZWRGdUb2UwMUlBeW9MUEZyejd0dUwzaUhsYWExbQ==",
        },
      })
      .then((res) => setCity(res.data))
      .catch((error) => console.log("error", error));

      let state = axios
      .get(stateUrl, {
        headers: {
          "X-CSCAPI-KEY":
            "RGhzemVIZFQ2VWZWRGdUb2UwMUlBeW9MUEZyejd0dUwzaUhsYWExbQ==",
        },
      })
      .then((res) => setState(res.data))
      .catch((error) => console.log("error", error));
  }, []);

  const handleSubmit = (val) => {
    let flag = false;

    function validateDob(birth) {
      var today = new Date();
      var nowyear = today.getFullYear();
      var nowmonth = today.getMonth();
      var nowday = today.getDate();
      var b = document.getElementById("validationDateOfBirth").value;
      console.log(b);

      var birth = new Date(b);

      var birthyear = birth.getFullYear();
      var birthmonth = birth.getMonth();
      var birthday = birth.getDate();

      console.log(birthyear,birthmonth,birthday)

      var age = parseInt(nowyear,10) - parseInt(birthyear,10) ;
      var age_month = parseInt(nowmonth,10) - parseInt(birthmonth,10);
      var age_day = parseInt(nowday,10) - parseInt(birthday,10);
      console.log(age,age_month,age_day)

      if (age > 100) {
        alert("Age cannot be more than 100 Years.Please enter correct age");
        flag = false;
        // return false;
      }

      if ((age == 18 && age_month <= 0 && age_day <= 0) || age < 18) {
        alert(
          "Age should be more than 18 years.Please enter a valid Date of Birth"
        );
        flag = false;
        // return false;
      }
      if (age_month < 0 || (age_month == 0 && age_day < 0)) {
        age = parseInt(age) - 1;
        // alert("you are eligible")
        // flag = true;
      }
    }

    validateDob(val.dateofbirth);

    // if (flag === true) {
      setData([...data, val]);
      console.log("values", val);
      navigate("/");
    // } else {
      // alert("You are not eligible");
    // }
  };
  console.log("country", country);
  return (
    <>
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="p-3 mb-2 bg-danger text-white">
            <h2>ADD DRIVER</h2>
          </div>
          <div className="text-bg-light p-3 ">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button className="btn btn-light" type="button">
                Cancel
              </button>
              <button className="btn btn-success" type="submit">
                Send
              </button>
            </div>
          </div>

          <div className="col-md-3">
            <label className="form-label">Country</label>
            <Field component="select" name="country" className="form-select">
              <option selected disabled value="">
                Select country
              </option>
              {country.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </Field>
            <p className="text-danger">
              <ErrorMessage name="country" />
            </p>
          </div>
          <div className="col-md-4 mt-4">
            <p>User Type</p>

            <label>
              <Field type="radio" name="usertype" value="driver"></Field>
              Driver
            </label>
            <label>
              <Field type="radio" name="usertype" value="broker&driver"></Field>
              Broker & Driver
            </label>
            <p className="text-danger">
              <ErrorMessage name="TransportMode" />
            </p>
          </div>

          <div className="p-3 mb-2 bg-success text-white">
            <h4>PERSONAL DETAILS</h4>
          </div>
          <div className="col-md-3">
            <label className="form-label">First name</label>
            <Field
              type="text"
              className="form-control"
              id="validationCustom01"
              name="Fname"
            />
            <p className="text-danger">
              <ErrorMessage name="Fname" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">Middle name</label>
            <Field
              type="text"
              className="form-control"
              id="validationCustom02"
              name="mname"
            />
            <p className="text-danger">
              <ErrorMessage name="mname" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">Last name</label>
            <Field
              type="text"
              className="form-control"
              id="validationCustom02"
              name="Lname"
            />
            <p className="text-danger">
              <ErrorMessage name="Lname" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">Gender</label>
            <Field
              component="select"
              name="gender"
              className="form-select"
              aria-label="Default select example"
            >
              <option selected=""> Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Field>
            <p className="text-danger">
              <ErrorMessage name="gender" />
            </p>
          </div>

          <div className="col-md-3">
            <label className="form-label">First name in Arabic</label>
            <Field
              type="text"
              className="form-control"
              id="validationCustom01"
              name="FAname"
            />
            <p className="text-danger">
              <ErrorMessage name="FAname" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">Middle name in Arabic</label>
            <Field
              type="text"
              className="form-control"
              id="validationCustom02"
              name="MAname"
            />
            <p className="text-danger">
              <ErrorMessage name="MAname" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">Last name in Arabic</label>
            <Field
              type="text"
              className="form-control"
              id="validationCustom02"
              name="LAname"
            />
            <p className="text-danger">
              <ErrorMessage name="LAname" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">Date of Brith</label>
            <Field
              type="date"
              name="dateofbrith"
              className="form-control"
              id="validationDateOfBirth"
            />
            <p className="text-danger">
              <ErrorMessage name="dateofbrith" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">Mobile Number</label>
            <Field
              type="number"
              className="form-control"
              id="validationCustom02"
              name="Mobilenumber"
            />
            <p className="text-danger">
              <ErrorMessage name="Mobilenumber" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">Nationality</label>
            <Field
              component="select"
              name="nationality"
              className="form-select"
            >
              <option selected disabled value="">
                Select Nationality
              </option>
              {country.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </Field>
            <p className="text-danger">
              <ErrorMessage name="nationality" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">Country Of Birth</label>
            <Field
              component="select"
              name="countryOfBirth"
              className="form-select"
              id="validationCustom04"
            >
              <option selected disabled value="">
                Select Country
              </option>
              {country.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </Field>
            <p className="text-danger">
              <ErrorMessage name="countryOfBirth" />
            </p>
          </div>

          <div className="col-md-3">
            <label className="form-label">City Of Birth</label>
            <Field
              component="select"
              name="CityOfBirth"
              className="form-select"
            >
              <option selected disabled value="">
                Select City
              </option>
              {city.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </Field>
            <p className="text-danger">
              <ErrorMessage name="cityOfBirth" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">Name of the Card</label>
            <Field type="text" className="form-control" name="nameOfTheCard" />
            <p className="text-danger">
              <ErrorMessage name="nameOfTheCard" />
            </p>
          </div>

          <div className="p-3 mb-2 bg-success text-white">
            <h4>PRESENT ADDRESS</h4>
          </div>
          <div className="col-md-3">
            <label className="form-label">STREET NAME</label>
            <Field type="text" className="form-control" name="streetName" />
            <p className="text-danger">
              <ErrorMessage name="streetName" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">Country</label>
            <Field
              component="select"
              name="countryname"
              className="form-select"
            >
              <option selected disabled value="">
                Select Country
              </option>
              {country.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </Field>
            <p className="text-danger">
              <ErrorMessage name="countryname" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">City/Town</label>
            <Field component="select" name="citytown" className="form-select">
              <option selected disabled value="">
                Select City/Town
              </option>
              {city.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </Field>
            <p className="text-danger">
              <ErrorMessage name="citytown" />
            </p>
          </div>

          <div className="col-md-3">
            <label className="form-label">Zip Code</label>
            <Field type="number" className="form-control" name="zipCode" />
            <p className="text-danger">
              <ErrorMessage name="zipCode" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">Building Number</label>
            <Field
              type="number"
              className="form-control"
              name="buildingNumber"
            />
            <p className="text-danger">
              <ErrorMessage name="buildingNumber" />
            </p>
          </div>

          <div className="p-3 mb-2 bg-success text-white">
            <h4>EMPLOYMENT DETAILS</h4>
          </div>
          <div className="col-md-3">
            <label className="form-label">Work Status</label>
            <Field
              component="select"
              name="workStatus"
              className="form-select"
              id="validationCustom04"
            >
              <option selected disabled value="">
                Select Work Status
              </option>
              <option value="completed">Completed</option>
              <option value="notcompleted">notcompleted</option>
              <option value="processing">Processing</option>
            </Field>
            <p className="text-danger">
              <ErrorMessage name="workStatus" />
            </p>
          </div>

          <div className="col-md-3">
            <label className="form-label">Proffesion Level</label>
            <Field
              component="select"
              name="proffesionLevel"
              className="form-select"
            >
              <option selected disabled value="">
                Select Proffesion Level
              </option>
              <option value="good">good</option>
              <option value="bad">bad</option>

            </Field>
            <p className="text-danger">
              <ErrorMessage name="proffesionLevel" />
            </p>
          </div>

          <div className="col-md-3">
            <label className="form-label">Employer Name</label>
            <Field
              type="text"
              className="form-control"
              id="validationCustom02"
              name="employerName"
            />
            <p className="text-danger">
              <ErrorMessage name="employerName" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">Worker Address</label>
            <Field
              type="text"
              className="form-control"
              name="workerAddress"
            />
            <p className="text-danger">
              <ErrorMessage name="workerAddress" />
            </p>
          </div>

          <div className="col-md-3">
            <label className="form-label">Salary Range</label>
            <Field
              type="number"
              name="salaryRange"
              className="form-control"
              min="12000"
              max="100000"
            />
            <p className="text-danger">
              <ErrorMessage name="salaryRange" />
            </p>
          </div>

          <div className="p-3 mb-2 bg-success text-white">
            <h4>PROOF OF IDENTITY</h4>
          </div>
          <div className="col-md-3">
            <label className="form-label">Identification Type</label>
            <Field
              component="select"
              name="IdentificationType"
              className="form-select"
            >
              <option selected disabled value="">
                Select Identification Type
              </option>
              <option value="pancard">Pancard</option>
              <option value="adharcard">Adharcard</option>
              <option value="votercard">Votercard</option>
              <option value="collageId">CollageId</option>
            </Field>
            <p className="text-danger">
              <ErrorMessage name="identificationType" />
            </p>
          </div>

          <div className="col-md-3">
            <label className="form-label">Identification No</label>
            <Field
              type="number"
              className="form-control"
              id="validationCustom02"
              name="identificationNo"
            />
            <p className="text-danger">
              <ErrorMessage name="identificationNo" />
            </p>
          </div>
          <div className="col-md-3">
            <label className="form-label">FRONT SIDE</label>
          </div>
          <div className="col-md-3">
            <label className="form-label">BACK SIDE</label>
          </div>
          <div className="col-md-3">
            <label className="form-label">Issued Date</label>
            <Field type="date" name=" issueddate" className="form-control" />
            <p className="text-danger">
              <ErrorMessage name="issueddate" />
            </p>
          </div>

          <div className="p-3 mb-2 bg-success text-white">
            <h4>ADDITIONAL INFORMATION</h4>
          </div>
          <div className="col-md-4">
            <p>Are you a US Green Card Holder?</p>
            <label>
              <Field
                type="radio"
                name="are you a US Green Card Holder?"
                value="yes"
              ></Field>
              Yes
            </label>
            <label>
              <Field
                type="radio"
                name="are you a US Green Card Holder?"
                value="no"
              ></Field>
              No
            </label>
            <p className="text-danger">
              <ErrorMessage name="are you a US Green Card Holder?" />
            </p>
          </div>

          <div className="col-md-4">
            <p>Are you a US TAX Payer</p>
            <label>
              <Field
                type="radio"
                name="are you a US TAX Payer"
                value="yes"
              ></Field>
              Yes
            </label>
            <label>
              <Field
                type="radio"
                name="are you a US TAX Payer"
                value="no"
              ></Field>
              No
            </label>
            <p className="text-danger">
              <ErrorMessage name="are you a US TAX Payer" />
            </p>
          </div>

          <div className="col-md-4">
            <p>Are you Resident in the US?</p>
            <label>
              <Field
                type="radio"
                name="are you Resident in the US?"
                value="yes"
              ></Field>
              Yes
            </label>
            <label>
              <Field
                type="radio"
                name="are you Resident in the US?"
                value="no"
              ></Field>
              No
            </label>
            <p className="text-danger">
              <ErrorMessage name="are you Resident in the US?" />
            </p>
          </div>
          <div className="col-md-8">
            <p>
              Are you a politically exposed person or Do you have a First Degree
              Relationship with Family Members or Close Associates of peps
              Nature?
            </p>
            <label>
              <Field
                type="radio"
                name="Are you a politically exposed person or Do you have a First
                Degree Relationship with Family Members or Close Associates of
                peps Nature"
                value="yes"
              ></Field>
              Yes
            </label>
            <label>
              <Field
                type="radio"
                name="Are you a politically exposed person or Do you have a First
                Degree Relationship with Family Members or Close Associates of
                peps Nature"
                value="no"
              ></Field>
              No
            </label>
          </div>
          <div className="col-md-5">
            <label className="form-label">
              Degree of Relationship with Customer
            </label>
            <Field
              component="select"
              name="DRelationship"
              className="form-select"
            >
              <option selected disabled value="">
                Select Relationship
              </option>
              <option value="brother">Brother</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
              <option value="sister">Sister</option>
              <option value="friend">Friend</option>
            </Field>
            <p className="text-danger">
              <ErrorMessage name="DRelationship" />
            </p>
          </div>
          <div className="col-md-5">
            <label className="form-label">
              Preffered Location For Card Delivery
            </label>
            <Field
              component="select"
              name="cardDeliveryLocation"
              className="form-select"
            >
              <option selected disabled value="">
                Select Location
              </option>
              {state.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </Field>
            <p className="text-danger">
              <ErrorMessage name="cardDeliveryLocation" />
            </p>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default AddDriver;
