import clsx from 'clsx';
import type {CSSProperties} from 'react';
import {useStore} from '../store';
import styles from './Bird.module.css';

type Props = {
  style?: CSSProperties;
};

export default function Bird({style}: Props) {
  const status = useStore((state) => state.status);

  return (
    <div
      className={clsx(
        "h-8 w-11 bg-[url('/bluebird-midflap.png')] bg-cover",
        status === 'playing' && styles.flap,
      )}
      style={style}
    />
  );
}
