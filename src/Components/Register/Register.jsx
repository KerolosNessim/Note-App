import { useFormik } from "formik";
import img from "../../assets/signup-image.jpg";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
export default function Register() {
  let [error, setError] = useState("");
  let navigate = useNavigate()
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Min length is 3")
      .max(25, "Max is 25")
      .required("Name is required"),
    email: Yup.string().email("Invalid format").required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{8,20}$/,
        "Password at least 8 characters & at most 20"
      )
      .required("Password is required"),
    age: Yup.number()
      .min(16, "too young")
      .max(62, "too old")
      .required("Age is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "It must be egyptian number")
      .required("Phone is required"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  async function handleSubmit(values) {
    await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
      .then((res) => {
        if (res?.data.msg == "done") {
          navigate('/login')
        }
      }).catch((err) => {
        setError(err?.response.data.msg)
      });
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 ">
            <img src={img} className="w-75 m-auto d-block" alt="register-img" />
          </div>
          <div className="col-md-6">
            {error ? <div className="alert alert-danger">{ error}</div>:""}
            <h3>Register Now :</h3>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="mt-2 p-2 alert alert-danger">
                    {formik.errors.name}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="mt-2 p-2 alert alert-danger">
                    {formik.errors.email}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="mt-2 p-2 alert alert-danger">
                    {formik.errors.password}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Age"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.age && formik.touched.age ? (
                  <div className="mt-2 p-2 alert alert-danger">
                    {formik.errors.age}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter Phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="mt-2 p-2 alert alert-danger">
                    {formik.errors.phone}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
              <button className="btn btn-primary">Register</button>
            </Form>
            <p className="mt-2">
              Already have Account? <Link to="/login">login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
