import React from "react";
import "./column.css";
import { Droppable } from "react-beautiful-dnd";
import Modal from "../Modal/modal.js";

function Column(props) {
  return (
    <Droppable droppableId={props.column.id}>
      {(provided) => (
        <div
          className="column-wrapper"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="column-title">{props.column.title}</div>
          <div className="cards-wrapper">
            {props.cards.map((card, index) => (
              <Modal
                key={card.id}
                card={card}
                index={index}
                setCards={props.setCards}
                origCards={props.origCards}
              />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Column;
