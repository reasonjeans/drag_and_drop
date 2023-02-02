import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
  padding: 10px;
  margin-bottom: 10px;
  background: ${(props) => (props.isDragging ? 'pink' : props.theme.cardColor)};
  box-shadow: ${(props) => (props.isDragging ? '0px 2px 5px rgba(0,0,0,0.3)' : 'none')};
  border-radius: 5px;
`;

interface IDragabbleCardProps {
  todoId: number;
  todoText: string;
  idx: number;
}

function DragabbleCard({ todoId, todoText, idx }: IDragabbleCardProps) {
  return (
    <Draggable key={todoId} draggableId={todoId + ''} index={idx}>
      {(arg, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={arg.innerRef}
          {...arg.draggableProps}
          {...arg.dragHandleProps}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
