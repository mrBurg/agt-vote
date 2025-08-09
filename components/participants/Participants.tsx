'use client';

import classNames from 'classnames';
import { map } from 'lodash';

import styles from './participants.module.scss';

import { useAppSelector } from '@/redux/hooks';
import { Participant } from '@/components/participant';
import { selectParticipants, selectVotes } from '@/redux/slices';

// import StarMask from './assets/star-mask.svg';

export function Participants() {
  const participants = useAppSelector(selectParticipants);
  const votesRemaining = useAppSelector(selectVotes);

  return (
    <>
      <div className={styles.votes}>
        Num votes: <span className={styles.votes__num}>{votesRemaining}</span>
      </div>
      {/* <StarMask style={{ position: 'absolute' }} /> */}
      <div className={classNames('participants', styles.participants)}>
        {map(participants, (participant, index) => (
          <Participant key={index} {...participant} />
        ))}
      </div>
    </>
  );
}
