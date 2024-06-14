import React from "react";
import sampleItems from "./sampleItems";

// Helper functions

function move(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}

function moveElement(array, index, offset) {
  const newIndex = index + offset;

  return move(array, index, newIndex);
}

// Context

const GridContext = React.createContext({ items: [] });

export function GridProvider({ children }) {
  const [items, setItems] = React.useState(sampleItems);

  const moveItem = React.useCallback(
    (sourceId, destinationId) => {
      const sourceIndex = items.findIndex((item) => item.id === sourceId);
      const destinationIndex = items.findIndex(
        (item) => item.id === destinationId
      );

      // If source/destination is unknown, do nothing.
      if (sourceId === -1 || destinationId === -1) {
        return;
      }

      const offset = destinationIndex - sourceIndex;

      setItems([...moveElement(items, sourceIndex, offset)]);
    },
    [items, setItems]
  );

  const context = React.useMemo(
    () => ({
      items,
      moveItem,
    }),
    [items, moveItem]
  );

  return (
    <GridContext.Provider value={context}>{children}</GridContext.Provider>
  );
}

export default GridContext;
