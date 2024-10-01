import clsx from 'clsx';
import styles from './Bird.module.css';

export default function Bird() {
  return (
    <div
      className={clsx(
        "h-8 w-11 bg-[url('/bluebird-midflap.png')] bg-cover",
        styles.bird,
      )}
    />
  );
}
