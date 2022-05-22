import { useEffect, useState } from "react";
import { API_KEY } from "./API_KEY";
import { NetflixOriginal, Poster } from "./interfaces";

const MediaSection = (props: { title: string; posters: Poster[] }) => {
    const [scrollPos, setScrollPos] = useState(0);
    const [trailer, setTrailer] = useState("");

    const getTrailers = async (index: number, apiSlug = "movie") => {
        const url = `https://api.themoviedb.org/3/${apiSlug}/${props.posters[index].id}/videos?api_key=${API_KEY}`;
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
        document.getElementById("scroller")!.scrollLeft = scrollPos;
    }, [scrollPos]);

    return (
        <div>
            <section className="mediaSection">
                <h3>{props.title}</h3>
                <div id="scroller" className="scroller">
                    <div className="spacer"></div>
                    {props.posters.map((item, idx) => (
                        <img
                            onClick={() => {
                                getTrailers(idx, "tv");
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
                <iframe src={trailer}></iframe>
            </section>
        </div>
    );
};

const OriginalsSection = (props: { netflixOriginals: NetflixOriginal[] }) => {
    return (
        <MediaSection
            title="Netflix Originals"
            posters={props.netflixOriginals}
        ></MediaSection>
    );
};

const TrendingSection = () => {
    return <div></div>;
};

const CategorySection = () => {
    return <div></div>;
};

export { OriginalsSection, TrendingSection, CategorySection };
