import {create} from 'zustand';
import {world, bird} from './physics';

type State = {
  status: 'playing' | 'gameover';
  height: number;
  speed: number;
  actions: {
    collide(): void;
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
    collide() {
      set({status: 'gameover'});
    },
    flap() {
      bird.applyLinearImpulse({x: 0, y: 600}, bird.getPosition());
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

world.on('post-solve', () => {
  // Normally we'd check to see which fixtures/bodies collided, but for now there's only one
  // possibility.
  useStore.getState().actions.collide();
});
