import { atom } from 'recoil';

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    'To Do 👀': [
      {
        id: 0,
        text: '머리 자르기',
      },
      {
        id: 1,
        text: '동물 병원 가기',
      },
    ],
    Doing: [],
    'Done 🙌': [],
  },
});
