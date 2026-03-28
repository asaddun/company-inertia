import Hero from "../Components/Section/Hero";
import AutosHero from "../Components/Section/AutosHero";
import CafeHero from "../Components/Section/CafeHero";

function Home() {
    const isHome = true;
    return (
        <section className="bg-white py-10 px-4 md:px-8 min-h-screen">
            <Hero />
            <AutosHero isHome={isHome} />
            <CafeHero isHome={isHome} />
        </section>
    );
}

export default Home;
