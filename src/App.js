import React, { useState } from "react";
import "./App.css";
import sampleData from "./sampleData.js";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/Column/column.js";

function App() {
  const [cards, setCards] = useState(sampleData.cards);
  const [columns, setColumns] = useState(sampleData.columns);
  const columnOrder = sampleData.columnOrder;

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Check for change
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    )
      return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    // Same column reordering
    if (sourceCol === destCol) {
      const newCardIDs = Array.from(sourceCol.cardIDs);
      newCardIDs.splice(source.index, 1);
      newCardIDs.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...sourceCol,
        cardIDs: newCardIDs,
      };
      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn,
      };
      setColumns(newColumns);
      return;
    }

    // Different column reordering
    else {
      // Remove from source
      const sourceCardIDs = Array.from(sourceCol.cardIDs);
      sourceCardIDs.splice(source.index, 1);
      const newSource = {
        ...sourceCol,
        cardIDs: sourceCardIDs,
      };
      // Add to destination
      const destCardIDs = Array.from(destCol.cardIDs);
      destCardIDs.splice(destination.index, 0, draggableId);
      const newDest = {
        ...destCol,
        cardIDs: destCardIDs,
      };
      // Update state
      const newColumns = {
        ...columns,
        [newSource.id]: newSource,
        [newDest.id]: newDest,
      };
      setColumns(newColumns);
      return;
    }
  };

  return (
    <div className="App">
      <DragDropContext
        // onDragStart={onDragStart}
        // onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <div className="columns-wrapper">
          {columnOrder.map((columnID) => {
            const column = columns[columnID];
            const currCards = column.cardIDs.map((cardID) => cards[cardID]);
            return (
              <Column
                key={column.id}
                column={column}
                cards={currCards}
                setCards={setCards}
                origCards={cards}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
