import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface DraggableItemProps {
  draggableId: string;
  index: number;
  children: (dragHandleProps: any) => React.ReactNode;
  className?: string;
}

const DraggableItem = ({ 
  draggableId, 
  index, 
  children, 
  className = ''
}: DraggableItemProps) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`${className} ${snapshot.isDragging ? 'opacity-50' : ''}`}
        >
          {children(provided.dragHandleProps)}
        </div>
      )}
    </Draggable>
  );
};

export default memo(DraggableItem);