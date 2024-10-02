import {create} from 'zustand';

type State = {
  status: 'playing' | 'gameover';
  height: number;
  speed: number;
  actions: {
    flap(): void;
    tick(elapsed: number): void;
  };
};

export const useStore = create<State>((set) => ({
  status: 'playing',
  height: 500,
  speed: 0,
  actions: {
    flap() {
      set((state) => {
        return {
          speed: state.speed + 25,
        };
      });
    },
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
