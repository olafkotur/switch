import React, { ReactElement, useCallback } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

export const DragDrop = ({
  id,
  uid,
  data,
  component,
  setIsDragging,
  onComplete,
}: {
  id: string;
  uid: string;
  data: object[];
  component: (data: object) => ReactElement;
  setIsDragging: (value: boolean) => void;
  onComplete: ({ _id, position }: { _id: string; position: number }) => void;
}): ReactElement => {
  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { reason, draggableId, destination } = result;
      if (reason === 'DROP' && destination != null) {
        onComplete({ _id: draggableId, position: destination.index });
      }

      setIsDragging(false);
    },
    [setIsDragging],
  );

  return (
    <DragDropContext onBeforeDragStart={() => setIsDragging(true)} onDragEnd={handleDragEnd}>
      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {data.map((value: any, index) => (
              <Draggable key={value[uid]} draggableId={value[uid]} index={index}>
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
