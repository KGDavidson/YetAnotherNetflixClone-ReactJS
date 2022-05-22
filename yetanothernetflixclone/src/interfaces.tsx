interface Poster {
    id: number;
    poster_path: string;
}

interface NetflixOriginal {
    id: number;
    backdrop_path: string;
    overview: string;
    name: string;
    poster_path: string;
}

export type { NetflixOriginal, Poster };
