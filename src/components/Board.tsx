import { Droppable } from 'react-beautiful-dnd';
import DragabbleCard from './DragabbleCard';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 300px;
  background: ${(props) => props.theme.boardColor};
  border-radius: 5px;
`;

const Title = styled.p`
  padding: 10px 0 15px 20px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #000;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  padding: 20px;
  flex-grow: 1;
  background: ${(props) =>
    props.isDraggingOver ? '#dfe6e9' : props.isDraggingFromThis ? '#b2bec3' : 'transparent'};
  transition: background 0.2s ease-in;
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
        {(arg, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={arg.innerRef}
            {...arg.droppableProps}
          >
            {toDos.map((todo, idx) => (
              <DragabbleCard key={todo} todo={todo} idx={idx} />
            ))}
            {arg.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
