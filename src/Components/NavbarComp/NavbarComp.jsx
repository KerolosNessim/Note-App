import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import style from "./NavbarComp.module.css";
import { useRecoilState } from "recoil";
import { noteState } from "../../Atoms/noteAtom";
function NavbarComp() {
  let [notesLen,setNoteLen]=useRecoilState(noteState)
  let navigate = useNavigate();
  let token = localStorage.getItem("token") || null;
  function logout() {
    localStorage.removeItem("token");
    navigate("login");
  }
  return (
    <Navbar expand="lg" className="bg-primary navbar-dark">
      <Container>
        <Navbar.Brand>
          <Link to="">
            <div className="d-flex align-items-center text-white">
              <i className="fa-solid fa-note-sticky fs-2 me-2 "></i>
              <h1 className="h2">Note App</h1>
            </div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {token == null ? (
              <>
                <Nav.Link>
                  <Link to="register">
                    <span className="text-white h6">Register</span>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="login">
                    <span className="text-white h6">Login</span>
                  </Link>
                </Nav.Link>
              </>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <i className="fa-solid fa-inbox text-white  "></i>
                    <h6 className={`text-white ${style.iconPos}`}>{notesLen }</h6>
                </div>
                <Nav.Link>
                  <span className="text-white h6" onClick={logout}>
                    Logout
                  </span>
                </Nav.Link>
              </div>
            )}
          </Nav>
          <Nav className="ms-3">
            <Nav.Link
              href="https://www.facebook.com/"
              className="text-white  fs-5"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </Nav.Link>
            <Nav.Link
              href="https://www.instagram.com/"
              className="text-white  fs-5"
            >
              <i className="fa-brands fa-instagram"></i>
            </Nav.Link>
            <Nav.Link
              href="https://www.twitter.com/"
              className="text-white  fs-5"
            >
              <i className="fa-brands fa-twitter"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
