import {create} from 'zustand';

type State = {
  status: 'playing' | 'gameover';
  height: number;
  speed: number;
  actions: {
    tick(elapsed: number): void;
  };
};

export const useStore = create<State>((set) => ({
  status: 'playing',
  height: 500,
  speed: 0,
  actions: {
    tick(elapsed: number) {
      set((state) => {
        const nextHeight = state.height + state.speed * elapsed;
        if (nextHeight <= 0) {
          return {status: 'gameover'};
        }
        return {
          height: state.height + state.speed * elapsed,
          speed: state.speed - 9.8 * elapsed,
        };
      });
    },
  },
}));
