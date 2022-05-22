import { useEffect, useState } from "react";
import { API_KEY } from "./API_KEY";
import { NetflixOriginal, Poster } from "./interfaces";

const MediaSection = (props: {
    id: string;
    title: string;
    posters: Poster[];
    apiSlug: string;
}) => {
    const [scrollPos, setScrollPos] = useState(0);
    const [trailer, setTrailer] = useState("");

    const getTrailers = async (index: number) => {
        const url = `https://api.themoviedb.org/3/${props.apiSlug}/${props.posters[index].id}/videos?api_key=${API_KEY}`;
        const response = await fetch(url);
        if (response.status !== 200) return "";

        const json = await response.json();
        if ("success" in json && json["success"] === false) return "";

        const results = json.results.filter(
            (e: { site: string; key: string }) => e.site !== "Youtube"
        );
        setTrailer(`https://www.youtube.com/embed/${results[0].key}`);
    };

    const scroll = (right: boolean) => {
        setScrollPos(
            scrollPos + (right ? window.innerWidth : -window.innerWidth)
        );
    };

    useEffect(() => {
        document
            .getElementById(props.id)!
            .getElementsByClassName("scroller")[0]!.scrollLeft = scrollPos;
    }, [scrollPos, props]);

    return (
        <div id={props.id}>
            <section className="mediaSection">
                <h3>{props.title}</h3>
                <div className="scroller">
                    <div className="spacer"></div>
                    {props.posters.map((item, idx) => (
                        <img
                            onClick={() => {
                                getTrailers(idx);
                            }}
                            key={idx}
                            alt="imagePoster"
                            src={
                                "https://image.tmdb.org/t/p/original/" +
                                item.poster_path
                            }
                        ></img>
                    ))}
                </div>
                <div className="fade start">
                    <button
                        onClick={() => {
                            scroll(false);
                        }}
                        className="scroll"
                    >
                        ❮
                    </button>
                </div>
                <div className="fade end">
                    <button
                        onClick={() => {
                            scroll(true);
                        }}
                        className="scroll"
                    >
                        ❯
                    </button>
                </div>
            </section>
            <section
                className="trailer"
                style={{ display: trailer ? "flex" : "none" }}
            >
                <iframe title="trailer" src={trailer}></iframe>
            </section>
        </div>
    );
};

const OriginalsSection = (props: { netflixOriginals: NetflixOriginal[] }) => (
    <MediaSection
        apiSlug="tv"
        id="originals"
        title="Netflix Originals"
        posters={props.netflixOriginals}
    ></MediaSection>
);

const TrendingSection = () => {
    const [trending, setTrending] = useState([]);

    const getTrending = async () => {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setTrending(json.results);
    };

    useEffect(() => {
        getTrending();
    }, []);

    return (
        <MediaSection
            apiSlug="movie"
            id="trending"
            title="Trending Now"
            posters={trending}
        ></MediaSection>
    );
};

const CategorySection = (props: { genreName: string; genreId: number }) => {
    const [category, setCategory] = useState([]);

    const getCategory = async () => {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${props.genreId}`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setCategory(json.results);
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <MediaSection
            apiSlug="movie"
            id={props.genreName.toLowerCase().replace(" ", "_")}
            title={`${props.genreName}`}
            posters={category}
        ></MediaSection>
    );
};

export { OriginalsSection, TrendingSection, CategorySection };
