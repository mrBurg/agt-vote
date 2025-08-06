import type { NavProps, FooterProps } from '@/redux/slices';

export type MetaProps = {
  title: string;
  description: string;
};

export type LayoutProps = { lang: string; numParticipants: number } & NavProps &
  FooterProps;

/* export type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}; */
