import {create} from 'zustand';
import {world, bird} from './physics';

type State = {
  status: 'playing' | 'gameover';
  height: number;
  speed: number;
  actions: {
    flap(): void;
    tick(): void;
  };
};

const timeStep = 1 / 60;
const velocityIterations = 6;
const positionIterations = 2;

export const useStore = create<State>((set) => ({
  status: 'playing',
  height: bird.getPosition().y,
  speed: bird.getLinearVelocity().y,
  actions: {
    flap() {
      bird.applyLinearImpulse({x: 0, y: 750}, bird.getPosition(), true);
    },
    tick() {
      set(() => {
        world.step(timeStep, velocityIterations, positionIterations);
        return {
          height: bird.getPosition().y,
          speed: bird.getLinearVelocity().y,
        };
      });
    },
  },
}));
