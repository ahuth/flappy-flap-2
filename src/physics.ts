import {Circle, Edge, World, Vec2} from 'planck';

export type {World, Body} from 'planck';

export function createWorld() {
  const world = new World({
    gravity: new Vec2(0.0, -100.0),
  });

  const bird = world.createBody({
    type: 'dynamic',
    position: new Vec2(0.0, 500.0),
  });

  bird.createFixture({
    shape: new Circle(0.5),
    density: 5.0,
    friction: 0.3,
  });

  const ground = world.createBody({
    type: 'static',
    position: new Vec2(0.0, 0.0),
  });

  ground.createFixture({
    shape: new Edge(new Vec2(-50, 32), new Vec2(+50, 32)),
  });

  return {world, bird};
}
