import { Card, Tag } from "antd";
import { motion } from "framer-motion";

function JobCard({ job }) {
  const employmentLabel = {
    full_time: "Full Time",
    part_time: "Part Time",
  };

  const color = job.employment_type === "full_time" ? "blue" : "green";

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ width: "100%" }}
    >
      <Card
        title={
          <span className="text-xl md:text-2xl font-semibold">{job.title}</span>
        }
        extra={
          <Tag color={color} variant="outlined">
            {employmentLabel[job.employment_type]}
          </Tag>
        }
      >
        <p className="text-base md:text-lg px-8">{job.description}</p>
      </Card>
    </motion.section>
  );
}

export default JobCard;
