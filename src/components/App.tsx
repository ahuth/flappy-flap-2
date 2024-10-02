import {useEffect} from 'react';
import {useStore} from '../store';
import Bird from './Bird';

export default function App() {
  const actions = useStore((state) => state.actions);
  const status = useStore((state) => state.status);
  const height = useStore((state) => state.height);

  // Animation loop
  useEffect(() => {
    if (status !== 'playing') {
      return;
    }

    let id = requestAnimationFrame(run);

    function run() {
      actions.tick();
      id = requestAnimationFrame(run);
    }

    return () => cancelAnimationFrame(id);
  }, [actions, status]);

  // User input handlers
  useEffect(() => {
    if (status !== 'playing') {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === ' ') {
        actions.flap();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', actions.flap);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', actions.flap);
    };
  }, [status]);

  return (
    <div className="flex h-[500px] flex-col items-center bg-sky-400">
      {status === 'gameover' && (
        <h1 className="w-fit bg-sky-900 p-4 text-xl text-white">Game Over</h1>
      )}
      <Bird style={{position: 'absolute', top: 500 - height}} />
    </div>
  );
}
