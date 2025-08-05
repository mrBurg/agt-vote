'use client';

import { isEmpty, map, sortBy } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';

import style from './rating-table.module.scss';

import { useAppSelector } from '@/redux/hooks';
import { selectParticipants } from '@/redux/slices/participantsSlices';
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
        {map(sortedParticipants, (participant, index) => (
          <Flipped key={participant.login.uuid} flipId={participant.login.uuid}>
            <li key={index} className={style.list__item}>
              <Avatar
                className={style.list__item__avatar}
                src={participant.picture.large}
                alt={`${participant.name.title} ${participant.name.first} ${participant.name.last}`}
                fit="contain"
              />
              <div>
                ${participant.name.title} {participant.name.first}{' '}
                {participant.name.last}: {participant.votes}
              </div>
            </li>
          </Flipped>
        ))}
      </ul>
    </Flipper>
  );
}
