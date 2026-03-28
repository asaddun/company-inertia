import { Alert } from "antd";
import JobCard from "./JobCard";
import { motion } from "framer-motion";

function JobVacancies({ jobs }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center items-center"
    >
      {jobs.length === 0 ? (
        <Alert
          type="info"
          title="Thank you for your interest. We are Sorry that currently there are no job vacancies available yet, please check back later."
          showIcon
          className="max-w-3/4 md:max-w-1/2"
        />
      ) : (
        <div className="flex flex-col items-center gap-16">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </motion.section>
  );
}

export default JobVacancies;
