import { ParticipantsState } from '@/redux/slices/participantsSlices';

export async function fetcher<T = Record<string, unknown>>(
  url: string
): Promise<T> {
  try {
    const response = await fetch(`${process.env.HOST_NAME}${url}`);
    const data = await response.json();

    return data;
  } catch (_error) {
    return {
      nav: [
        {
          href: '/',
          title: 'Home',
        },
        {
          href: '/rating',
          title: 'Rating',
        },
      ],
      footer: `&copy; ${new Date().getFullYear()}`,
    } as T;
  }
}

type ParticipantFetcherData = { results: ParticipantsState };

export async function participantsFetcher(
  num: number
): Promise<ParticipantFetcherData> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PARTICIPANT_API}/?seed=constant-user&results=${num}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return [] as unknown as ParticipantFetcherData;
  }
}
