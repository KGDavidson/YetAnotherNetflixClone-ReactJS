import Navbar from "./Navbar";
import Banner from "./Banner";
import {
    CategorySection,
    OriginalsSection,
    TrendingSection,
} from "./MediaSection";

const App = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <OriginalsSection></OriginalsSection>
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
