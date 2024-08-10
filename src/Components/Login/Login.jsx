import img from "../../assets/signin-image.jpg";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
export default function Login() {
  let [error, setError] = useState("");
  let navigate = useNavigate();
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid format").required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{8,20}$/,
        "Password at least 8 characters & at most 20"
      )
      .required("Password is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  async function handleSubmit(values) {
    await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signIn", values)
      .then((res) => {
        if (res?.data.msg == "done") {
          localStorage.setItem("token",res?.data?.token)
          navigate("/home");
        }
      })
      .catch((err) => {
        setError(err?.response.data.msg);
      });
  }
  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-md-6 mt-md-5">
            {error ? <div className="alert alert-danger">{error}</div> : ""}
            <h3>Login Now :</h3>
            <Form onSubmit={formik.handleSubmit}>
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

              <button className="btn btn-primary">Login</button>
            </Form>
            <p className="mt-2">
              Don't have Account? <Link to="/register">Register</Link>
            </p>
          </div>
          <div className="col-md-6 ">
            <img src={img} className="w-75 d-block m-auto" alt="register-img" />
          </div>
        </div>
      </div>
    </>
  );
}
