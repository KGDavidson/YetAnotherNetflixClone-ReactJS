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
            <CategorySection></CategorySection>
            <CategorySection></CategorySection>
            <CategorySection></CategorySection>
            <CategorySection></CategorySection>
            <CategorySection></CategorySection>
        </div>
    );
};

export default App;
