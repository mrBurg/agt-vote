import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './participant.module.scss';

import Rate from './assets/rate.svg';

import { Avatar } from '../avatar';
import { useAppDispatch } from '@/redux/hooks';
import { updateVote } from '@/redux/slices';

export function Participant({
  picture,
  name,
  location,
  login,
  votes,
}: ParticipantProps) {
  const dispatch = useAppDispatch();
  const rateRef = useRef<SVGSVGElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) {
      return;
    }

    dispatch(updateVote(login.salt));
    setIsAnimating(true);
  };

  useEffect(() => {
    const node = rateRef.current;

    if (node) {
      const handleAnimationEnd = () => {
        setIsAnimating(false);
      };

      node.addEventListener('animationend', handleAnimationEnd);

      return () => {
        node.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, []);

  return (
    <div className={classNames('participant', styles.participant)}>
      <div className={styles.info}>
        <Avatar
          src={picture.base64}
          alt={`${name.title} ${name.first} ${name.last}`}
          fit="contain"
        />
        <div>
          {name.title} {name.first} {name.last}
        </div>
        <div>{location.city}</div>
        <div className={styles.votes}>
          Total votes: <span className={styles.votesNum}>{votes}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.button}
          type="button"
          onClick={handleClick}
          disabled={isAnimating}
        >
          <Rate
            ref={rateRef}
            className={classNames({ [styles.animate]: isAnimating })}
          />
        </button>
      </div>
    </div>
  );
}

export type ParticipantProps = {
  picture: {
    base64: string;
    large: string;
    medium?: string;
    thumbnail?: string;
  };
  name: Record<'title' | 'first' | 'last', string>;
  login: { salt: string } & Partial<
    Record<'username' | 'password' | 'uuid' | 'md5' | 'sha1' | 'sha256', string>
  >;
  votes: number;
  location: {
    city: string;
    state?: string;
    country?: string;
    postcode?: number;
    street?: { number: number; name: string };
    coordinates?: { latitude: string; longitude: string };
    timezone?: { offset: string; description: string };
  };
  phone?: string;
  id?: { name: string; value: string };
} & Partial<
  Record<'gender' | 'email' | 'nat' | 'cell', string> &
    Record<'dob' | 'registered', { date: string; age: number }>
>;
