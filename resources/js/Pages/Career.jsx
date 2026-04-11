import CarrerHero from "../Components/Section/CarrerHero";
import JobVacancies from "../Components/JobVacancies";
import CarrerJoin from "../Components/section/CarrerJoin";

function Career({ careers }) {
    return (
        <section className="bg-white py-10 px-4 md:px-16 min-h-screen">
            <CarrerHero />
            <JobVacancies jobs={careers} />
            {careers.length > 0 && <CarrerJoin />}
        </section>
    );
}

export default Career;
