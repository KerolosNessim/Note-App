import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import Note from "./../Note/Note";
import { useRecoilState } from "recoil";
import { noteState } from "../../Atoms/noteAtom";
export default function Home() {
  let [notesLen, setNoteLen] = useRecoilState(noteState);
  const [noteErr, setNoteErr] = useState("");
  const [show, setShow] = useState(false);
  const [notes, setNotes] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("content is required"),
  });
  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema,
    onSubmit: addNote,
  });
  async function addNote(values) {
    axios
      .post("https://note-sigma-black.vercel.app/api/v1/notes", values, {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res?.data?.msg == "done") {
          formik.values.title = "";
          formik.values.content = "";
          getNotes();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        handleClose();
      });
  }
  async function getNotes() {
    setNoteErr(null)
    axios
      .get("https://note-sigma-black.vercel.app/api/v1/notes", {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setNotes(res?.data?.notes);
        setNoteLen(res?.data?.notes.length);
      })
      .catch((err) => {
        console.log(err);
        setNoteErr(err?.response?.data?.msg);
        setNoteLen(0);
      });
  }
  async function deleteNote(id) {
    await axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getNotes();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="d-block ms-auto fs-5"
      >
        <i className="fa-solid fa-plus me-2"></i>
        Add Note
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
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
            {formik.errors.title && formik.touched.title ? (
              <div className="alert alert-danger my-2 p-2">
                {formik.errors.title}
              </div>
            ) : (
              ""
            )}
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
            {formik.errors.content && formik.touched.content ? (
              <div className="alert alert-danger my-2 p-2">
                {formik.errors.content}
              </div>
            ) : (
              ""
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            <i className="fa-solid fa-plus me-2"></i>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {noteErr ? (
        <h2>{noteErr}</h2>
      ) : (
        <>
          <h2>Notes </h2>
          <div className="row gy-4 my-2">
            {notes?.map((note) => {
              return (
                <Note key={note._id} note={note} deleteNote={deleteNote} getNotes={getNotes}></Note>
              );
            })}
          </div>
          <p className="mt-5 text-end fw-bold">
            Number Of Notes : <span className=" text-primary">{notesLen}</span>
          </p>
        </>
      )}
    </>
  );
}
