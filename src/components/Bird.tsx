import clsx from 'clsx';
import type {CSSProperties} from 'react';
import {useStore} from '../store';
import styles from './Bird.module.css';

type Props = {
  style?: CSSProperties;
};

export default function Bird({style}: Props) {
  const status = useStore((state) => state.status);
  const speed = useStore((state) => state.speed);

  return (
    <div
      className={clsx(
        "h-8 w-11 bg-[url('/bluebird-midflap.png')] bg-cover",
        status === 'playing' && styles.flap,
      )}
      style={{
        ...style,
        transform: `rotate(${Math.min(speed / 2, 90) * -1}deg)`,
      }}
    />
  );
}
