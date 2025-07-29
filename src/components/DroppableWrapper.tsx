import { memo } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

interface DroppableWrapperProps extends Omit<DroppableProps, 'children'> {
  children: (provided: any, snapshot: any) => React.ReactNode;
  className?: string;
}

const DroppableWrapper = ({ 
  droppableId, 
  children, 
  className = '', 
  ...props 
}: DroppableWrapperProps) => (
  <Droppable droppableId={droppableId} {...props}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`${className} ${snapshot.isDraggingOver ? 'bg-gray-50' : ''}`}
      >
        {children(provided, snapshot)}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default memo(DroppableWrapper);