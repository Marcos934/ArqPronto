import { memo } from 'react';
import DroppableWrapper from './DroppableWrapper';

interface DroppableListProps {
  droppableId: string;
  children: React.ReactNode;
  className?: string;
}

const DroppableList = ({ 
  droppableId, 
  children, 
  className = ''
}: DroppableListProps) => {
  return (
    <DroppableWrapper droppableId={droppableId} className={className}>
      {(provided) => (
        <>
          {children}
          {provided.placeholder}
        </>
      )}
    </DroppableWrapper>
  );
};

export default memo(DroppableList);