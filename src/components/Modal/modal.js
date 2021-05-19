import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.css";
import Card from "../Card/card.js";
import { Draggable } from "react-beautiful-dnd";

function ModalComp(props) {
  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const setModalIsOpenToTrue = () => {
    setNotes(props.card.notes);
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const [notes, setNotes] = useState("");
  const handleChange = (event) => {
    setNotes(event.target.value);
  };
  const handleSubmit = () => {
    const currCard = {
      ...props.origCards[props.card.id],
      notes: notes,
    };
    const newCards = {
      ...props.origCards,
      [props.card.id]: currCard,
    };
    props.setCards(newCards);
  };

  return (
    <>
      <Draggable draggableId={props.card.id} index={props.index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={setModalIsOpenToTrue}
          >
            <Card card={props.card} />
          </div>
        )}
      </Draggable>

      <Modal className="modal-wrapper" isOpen={modalIsOpen}>
        <div className="close-button" onClick={setModalIsOpenToFalse}>
          X
        </div>
        <span className="modal-tag">{props.card.type}</span>
        <div className="modal-company-wrapper">
          <img
            className="modal-logo"
            src={props.card.logo}
            alt={props.card.company + " logo"}
          />
          <div className="modal-company-info-wrapper">
            <div className="modal-company-info">
              <div className="modal-name">{props.card.company}</div>
              <div className="modal-location">{props.card.location}</div>
            </div>
          </div>
        </div>
        <div className="modal-title">{props.card.title}</div>
        <div>Stage: {props.card.stage}</div>
        {console.log(props.card.stage)}
        <div className="notes-wrapper">
          <label className="notes-label">Notes:</label>
          <textarea
            className="notes-area"
            value={notes}
            onChange={handleChange}
            rows="6"
          />
          <div className="notes-button" onClick={handleSubmit}>
            Save
          </div>
        </div>
        <div className="buttons-wrapper">
          <div className="button">View Posting</div>
          <div className="button">View Company</div>
        </div>
      </Modal>
    </>
  );
}
export default ModalComp;
