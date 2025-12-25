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
  country: string;
  timestamp: Date;
  resultsCount: number;
}

export const COUNTRIES = [
  "Israel",
  "United Arab Emirates",
  "Malta",
  "Cyprus",
  "Greece",
  "Hungary",
  "Romania",
] as const;

export type Country = typeof COUNTRIES[number];

export const CITIES_BY_COUNTRY: Record<Country, readonly string[]> = {
  "Israel": [
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
    "Acre",
    "Afula",
    "Arad",
    "Ariel",
    "Beit Shemesh",
    "Dimona",
    "Hod HaSharon",
    "Karmiel",
    "Kiryat Ata",
    "Kiryat Bialik",
    "Kiryat Gat",
    "Kiryat Motzkin",
    "Kiryat Ono",
    "Kiryat Shmona",
    "Kiryat Yam",
    "Migdal HaEmek",
    "Nahariya",
    "Nes Ziona",
    "Nof HaGalil",
    "Or Yehuda",
    "Rosh HaAyin",
    "Safed",
    "Sderot",
    "Yokneam",
    "Yavne",
    "Zichron Yaakov",
  ],
  "United Arab Emirates": [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Umm Al Quwain",
    "Al Ain",
  ],
  "Malta": [
    "Valletta",
    "Sliema",
    "St. Julian's",
    "Birkirkara",
    "Qormi",
    "Mosta",
    "Zabbar",
    "Rabat",
    "Fgura",
    "Zejtun",
    "Marsaskala",
    "Naxxar",
  ],
  "Cyprus": [
    "Nicosia",
    "Limassol",
    "Larnaca",
    "Paphos",
    "Famagusta",
    "Kyrenia",
    "Paralimni",
    "Strovolos",
    "Aradippou",
    "Ayia Napa",
  ],
  "Greece": [
    "Athens",
    "Thessaloniki",
    "Patras",
    "Piraeus",
    "Heraklion",
    "Larissa",
    "Volos",
    "Rhodes",
    "Ioannina",
    "Chania",
    "Kavala",
    "Kalamata",
    "Corfu",
    "Alexandroupoli",
    "Mykonos",
    "Santorini",
  ],
  "Hungary": [
    "Budapest",
    "Debrecen",
    "Szeged",
    "Miskolc",
    "Pécs",
    "Győr",
    "Nyíregyháza",
    "Kecskemét",
    "Székesfehérvár",
    "Szombathely",
    "Eger",
    "Veszprém",
  ],
  "Romania": [
    "Bucharest",
    "Cluj-Napoca",
    "Timișoara",
    "Iași",
    "Constanța",
    "Craiova",
    "Brașov",
    "Galați",
    "Ploiești",
    "Oradea",
    "Sibiu",
    "Arad",
    "Pitești",
    "Bacău",
  ],
} as const;

// Country codes for Google Places API
export const COUNTRY_CODES: Record<Country, string> = {
  "Israel": "IL",
  "United Arab Emirates": "AE",
  "Malta": "MT",
  "Cyprus": "CY",
  "Greece": "GR",
  "Hungary": "HU",
  "Romania": "RO",
};
