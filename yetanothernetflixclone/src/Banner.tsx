import { NetflixOriginal } from "./interfaces";

const Banner = (props: { netflixOriginals: NetflixOriginal[] }) => {
    let bannerItem = {
        title: "",
        desc: "",
        bannerUrl: "",
    };

    const getBannerItem = async () => {
        if (props.netflixOriginals.length > 0) {
            const bannerItemId = Math.floor(
                Math.random() * props.netflixOriginals.length
            );
            bannerItem = {
                title: props.netflixOriginals[bannerItemId].name,
                desc: props.netflixOriginals[bannerItemId].overview,
                bannerUrl:
                    "https://image.tmdb.org/t/p/original/" +
                    props.netflixOriginals[bannerItemId].backdrop_path,
            };
        }
    };

    getBannerItem();

    return (
        <header
            className="banner"
            style={{
                backgroundImage: `radial-gradient(transparent, rgba(0, 0, 0, 0.86)), url(${bannerItem.bannerUrl})`,
            }}
        >
            <h2>{bannerItem.title}</h2>
            <div className="buttonContainer">
                <button>Play</button>
                <button>My List</button>
            </div>
            <p>{bannerItem.desc}</p>
            <div className="fadeBottom"></div>
        </header>
    );
};

export default Banner;
