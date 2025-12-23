export interface Lead {
  id: string;
  businessName: string;
  address: string;
  phone: string | null;
  website: string | null;
  category: string;
  rating: number | null;
  reviewCount: number;
  googleMapsUrl: string | null;
  status: string;
}

export interface SearchQuery {
  keyword: string;
  city: string;
  timestamp: Date;
  resultsCount: number;
}

export const ISRAEL_CITIES = [
  "Tel Aviv",
  "Jerusalem",
  "Haifa",
  "Rishon LeZion",
  "Petah Tikva",
  "Ashdod",
  "Netanya",
  "Beer Sheva",
  "Holon",
  "Bnei Brak",
  "Ramat Gan",
  "Bat Yam",
  "Rehovot",
  "Ashkelon",
  "Herzliya",
  "Kfar Saba",
  "Hadera",
  "Modiin",
  "Nazareth",
  "Lod",
  "Ramla",
  "Ra'anana",
  "Givatayim",
  "Eilat",
  "Tiberias",
] as const;

export type IsraelCity = typeof ISRAEL_CITIES[number];
