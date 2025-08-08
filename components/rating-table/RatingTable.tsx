'use client';

import { isEmpty, map, sortBy } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';

import style from './rating-table.module.scss';

import { useAppSelector } from '@/redux/hooks';
import { selectParticipants } from '@/redux/slices';
import { Avatar } from '../avatar';

export function RatingTable() {
  const router = useRouter();
  const participants = useAppSelector(selectParticipants);

  useEffect(() => {
    if (isEmpty(participants)) {
      router.push('/');
    }
  }, [participants, router]);

  const sortedParticipants = useMemo(
    () => sortBy(participants, (item) => -item.votes),
    [participants]
  );

  return (
    <Flipper
      flipKey={sortedParticipants
        .map((participant) => participant.login.uuid)
        .join()}
    >
      <ul className={style.list}>
        {map(sortedParticipants, ({ login, picture, name, votes }, index) => {
          return (
            <Flipped key={login.uuid} flipId={login.uuid}>
              <li key={index} className={style.list__item}>
                <Avatar
                  className={style.list__item__avatar}
                  src={picture.base64}
                  alt={`${name.title} ${name.first} ${name.last}`}
                  fit="contain"
                />
                <div>
                  {name.title} {name.first} {name.last}: {votes}
                </div>
              </li>
            </Flipped>
          );
        })}
      </ul>
    </Flipper>
  );
}
