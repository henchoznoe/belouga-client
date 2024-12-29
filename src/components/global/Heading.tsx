import { motion } from "framer-motion";

type HeadingProps = {
  title: string;
}

const Heading = (props: HeadingProps) => {

  return (
    <>
      <motion.div
        className="flex justify-center my-8 md:my-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
      >
        <h1 className="font-paladinsgrad text-xl sm:text-2xl md:text-4xl">{props.title}</h1>
      </motion.div>
    </>
  );
}

export default Heading;
