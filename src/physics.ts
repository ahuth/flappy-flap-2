import {Circle, World, Vec2} from 'planck';

export const world = new World({
  gravity: new Vec2(0.0, -100.0),
});

export const bird = world.createBody({
  type: 'dynamic',
  position: new Vec2(0.0, 500.0),
});

bird.createFixture({
  shape: new Circle(0.5),
  density: 5.0,
  friction: 0.3,
});
