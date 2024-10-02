import {useEffect, useRef} from 'react';
import {useStore} from '../store';
import Bird from './Bird';

export default function App() {
  const actions = useStore((state) => state.actions);
  const status = useStore((state) => state.status);
  const height = useStore((state) => state.height);
  const lastRan = useRef(0);

  useEffect(() => {
    if (status !== 'playing') {
      return;
    }

    let id = requestAnimationFrame(run);

    function run(time: number) {
      if (lastRan.current) {
        actions.tick((time - lastRan.current) / 1000);
      }
      lastRan.current = time;
      id = requestAnimationFrame(run);
    }

    return () => cancelAnimationFrame(id);
  }, [actions, status]);

  return (
    <>
      {status === 'gameover' && <h1>Game Over</h1>}
      <Bird style={{position: 'absolute', top: 500 - height}} />
    </>
  );
}
