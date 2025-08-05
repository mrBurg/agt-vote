export type Participant = {
  votes: number;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email?: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  gender?: string;
  location: {
    city: string;
    street?: {
      number: number;
      name: string;
    };
    state?: string;
    country?: string;
    postcode?: number;
    coordinates?: {
      latitude: string;
      longitude: string;
    };
    timezone?: {
      offset: string;
      description: string;
    };
  };
  dob?: {
    date: string;
    age: number;
  };
  registered?: {
    date: string;
    age: number;
  };
  phone?: string;
  cell?: string;
  id?: {
    name: string;
    value: string;
  };
  nat?: string;
};

export type Nav = {
  href: string;
  title: string;
};
