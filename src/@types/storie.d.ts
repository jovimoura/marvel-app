interface Creator {
  resourceURI: string;
  name: string;
  role: string;
}

interface Character {
  resourceURI: string;
  name: string;
}

interface Series {
  resourceURI: string;
  name: string;
}

interface Comic {
  resourceURI: string;
  name: string;
}

export type Story = {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: string;
  thumbnail: null | {
    path: string;
    extension: string;
  };
  creators: {
    available: number;
    collectionURI: string;
    items: Creator[];
    returned: number;
  };
  characters: {
    available: number;
    collectionURI: string;
    items: Character[];
    returned: number;
  };
  series: {
    available: number;
    collectionURI: string;
    items: Series[];
    returned: number;
  };
  comics: {
    available: number;
    collectionURI: string;
    items: Comic[];
    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: any[];
    returned: number;
  };
  originalIssue: {
    resourceURI: string;
    name: string;
  };
};
