import { useForm } from 'react-hook-form';

import { Droppable } from 'react-beautiful-dnd';
import DragabbleCard from './DragabbleCard';

import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from '../atoms';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 300px;
  background: ${(props) => props.theme.boardColor};
  border-radius: 10px;
`;

const Title = styled.p`
  padding: 20px 0 15px 20px;
  font-size: 20px;
  font-weight: bold;
  color: #121212;
  border-radius: 10px 10px 0 0;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  padding: 20px;
  flex-grow: 1;
`;

const Form = styled.form`
  padding: 20px 20px 0;
  width: 100%;

  input {
    width: 100%;
    background: transparent;
    font-size: 17px;
    font-weight: bold;
    border: none;
    border-bottom: 3px solid #000;
    line-height: 1.5;

    :focus {
      outline: none;
    }
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
      <Title style={{ background: boardId === 'Done 🙌' ? '#d1645f' : '#f3ec81' }}>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', { required: true })}
          type="text"
          placeholder="Add task on"
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
