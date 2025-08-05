import { ParticipantsState } from '@/redux/slices/participantsSlices';

export async function fetcher<T = Record<string, unknown>>(
  url: string
): Promise<T> {
  const response = await fetch(`${process.env.HOST_NAME}${url}`);

  return await response.json();
}

type ParticipantFetcherData = { results: ParticipantsState };

export async function participantsFetcher(
  num: number
): Promise<ParticipantFetcherData> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PARTICIPANT_API}/?seed=constant-user&results=${num}`
  );

  return await response.json();
}
