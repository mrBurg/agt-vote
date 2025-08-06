'use client';

import classNames from 'classnames';
import { map } from 'lodash';

import styles from './participants.module.scss';

import { useAppSelector } from '@/redux/hooks';
import { Participant } from '@/components/participant';
import { selectParticipants } from '@/redux/slices';

export function Participants() {
  const participants = useAppSelector(selectParticipants);

  return (
    <div className={classNames('participants', styles.participants)}>
      {map(participants, (participant, index) => (
        <Participant key={index} {...participant} />
      ))}
    </div>
  );
}
