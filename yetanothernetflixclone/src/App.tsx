import Navbar from "./Navbar";
import Banner from "./Banner";
import {
    CategorySection,
    OriginalsSection,
    TrendingSection,
} from "./MediaSection";
import { API_KEY } from "./API_KEY";
import { useEffect, useState } from "react";

const App = () => {
    const [netflixOriginals, setNetflixOriginals] = useState([]);

    const getNetflixOriginals = async () => {
        const url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`;
        const response = await fetch(url);
        const json = await response.json();
        setNetflixOriginals(json.results);
    };

    useEffect(() => {
        getNetflixOriginals();
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <Banner netflixOriginals={netflixOriginals}></Banner>
            <OriginalsSection
                netflixOriginals={netflixOriginals}
            ></OriginalsSection>
            <TrendingSection></TrendingSection>
            <CategorySection
                genreName="Animated Movies"
                genreId={16}
            ></CategorySection>
            <CategorySection
                genreName="Action Movies"
                genreId={28}
            ></CategorySection>
            <CategorySection
                genreName="Comedy Movies"
                genreId={35}
            ></CategorySection>
            <CategorySection
                genreName="Horror Movies"
                genreId={27}
            ></CategorySection>
            <CategorySection
                genreName="Romance Movies"
                genreId={10749}
            ></CategorySection>
            <CategorySection
                genreName="Documentaries"
                genreId={99}
            ></CategorySection>
        </div>
    );
};

export default App;
