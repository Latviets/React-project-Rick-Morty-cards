export interface ApiResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    }
    results: Character[];
}


interface Location {
    name: string;
    url: string;
}

export interface Character {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'Unknown';
    species: string;
    type: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'Unknown';
    origin: Location;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
    isFavorite?: boolean;
}

