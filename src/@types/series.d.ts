export type Series = {
  id: number;
  title: string;
  description: string | null;
  resourceURI: string;
  urls: [
    {
      type: string;
      url: string;
    }
  ];
  startYear: number;
  endYear: number;
  rating: string;
  type: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  creators: {
    available: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
        role: string;
      }
    ];
    returned: number;
  };
  characters: {
    available: number;
    collectionURI: string;
    items: any[];
    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      type: string;
    }[];
    returned: number;
  };
  comics: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    }[];
    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: any[];
    returned: number;
  };
  next: any;
  previous: any;
};
