import { atom } from 'recoil';

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    'To Do': ['a', 'd'],
    Doing: ['b', 'c'],
    Done: ['e'],
  },
});
