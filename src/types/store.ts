export type Store = {
  id: number;
  imgUrl: string;
  title: string;
};

export type StoreResponse = {
  id: number;
  name: string;
  description: string;
  images: string[];
  location: {
    address: string;
    station: string;
    distance: string;
    latitude: number;
    longitude: number;
  };
  operating_hours: {
    open: string;
    close: string;
  };
};
