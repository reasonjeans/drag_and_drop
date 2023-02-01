import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styled from 'styled-components';

const Card = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background: ${(props) => props.theme.cardColor};
  border-radius: 5px;
`;

interface IDragabbleCardProps {
  todo: string;
  idx: number;
}

function DragabbleCard({ todo, idx }: IDragabbleCardProps) {
  return (
    <Draggable key={todo} draggableId={todo} index={idx}>
      {(arg) => (
        <Card ref={arg.innerRef} {...arg.draggableProps} {...arg.dragHandleProps}>
          {todo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
