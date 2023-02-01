import { Droppable } from 'react-beautiful-dnd';
import DragabbleCard from './DragabbleCard';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 30px 10px 20px 10px;
  width: 300px;
  min-height: 300px;
  background: ${(props) => props.theme.boardColor};
  border-radius: 5px;
`;

const Title = styled.p`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(arg) => (
          <div ref={arg.innerRef} {...arg.droppableProps}>
            {toDos.map((todo, idx) => (
              <DragabbleCard key={todo} todo={todo} idx={idx} />
            ))}
            {arg.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
