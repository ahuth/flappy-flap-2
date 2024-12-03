import {create} from 'zustand';
import {createWorld, type World, type Body} from './physics';

type State = {
  status: 'playing' | 'gameover';
  height: number;
  speed: number;
  world: World;
  bird: Body;
  actions: {
    collide(): void;
    flap(): void;
    start(): void;
    tick(): void;
  };
};

const timeStep = 1 / 60;
const velocityIterations = 6;
const positionIterations = 2;

export const useStore = create<State>((set, get) => ({
  status: 'playing',
  height: 0,
  speed: 0,
  // @ts-expect-error We'll create this in the start action.
  world: null,
  // @ts-expect-error We'll create this in the start action.
  bird: null,
  actions: {
    collide() {
      const {world, actions} = get();
      world.off('post-solve', actions.collide);
      set({status: 'gameover'});
    },
    flap() {
      const {bird} = get();
      bird.applyLinearImpulse({x: 0, y: 600}, bird.getPosition());
    },
    start() {
      const {actions} = get();
      const {world, bird} = createWorld();
      world.on('post-solve', actions.collide);
      set({status: 'playing', world, bird});
    },
    tick() {
      const {world, bird} = get();
      world.step(timeStep, velocityIterations, positionIterations);
      set({
        height: bird.getPosition().y,
        speed: bird.getLinearVelocity().y,
      });
    },
  },
}));
