export interface GoTHouse {
  slug: string;
  name: string;
  members?: { name: string; slug: string }[];
}

export interface GoTCharacter {
  name: string;
  slug: string;
  house: {
    slug: string;
    name: string;
  };
  quotes: string[];
}