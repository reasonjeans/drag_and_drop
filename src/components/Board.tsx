import { useForm } from 'react-hook-form';

import { Droppable } from 'react-beautiful-dnd';
import DragabbleCard from './DragabbleCard';

import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from '../atoms';

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

const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };

    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue('toDo', '');
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        ></input>
      </Form>
      <Droppable droppableId={boardId}>
        {(arg, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={arg.innerRef}
            {...arg.droppableProps}
          >
            {toDos.map((todo, idx) => (
              <DragabbleCard key={todo.id} todoId={todo.id} todoText={todo.text} idx={idx} />
            ))}
            {arg.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
