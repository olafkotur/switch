import React, { ReactElement, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

export const DragDrop = ({
  id,
  data,
  component,
}: {
  id: string;
  data: object[];
  component: (data: object) => ReactElement;
}): ReactElement => {
  const handleDragEnd = useCallback((result: DropResult) => {
    console.log({ result });
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {data.map((value, index) => (
              <Draggable key={index} draggableId={`${index}`} index={index}>
                {(provided) => (
                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {component(value)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
