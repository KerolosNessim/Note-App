import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
function Note({ note, deleteNote,getNotes }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit:update
  });
  async function update(values) {
    await axios.put(
      `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
      values,
      {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      }
    ).then((res) => {
      console.log(res);
      formik.values.title = '';
      formik.values.content = '';
      getNotes();
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      handleClose();
    });
  }
  return (
    <div className="col-md-4">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              type="text"
              name="title"
              placeholder="Note Title"
              className="form-control"
              value={formik.values.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <textarea
              name="content"
              placeholder="Note Content"
              className="form-control my-2"
              rows="8"
              style={{ resize: "none" }}
              value={formik.values.content}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            <i className="fa-regular fa-pen-to-square me-2"></i>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <Card>
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.content}</Card.Text>
          <Card.Link>
            <i
              className="fa-regular fa-pen-to-square fs-5"
              variant="primary"
              onClick={handleShow}
            ></i>
          </Card.Link>
          <Card.Link>
            <i
              className="fa-regular fa-trash-can fs-5"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Note;
