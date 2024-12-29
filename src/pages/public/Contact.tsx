import Heading from "@components/global/Heading.tsx";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <>
      <Heading title="Contact"/>
      <div className="flex flex-col items-center gap-3 max-w-4xl mx-auto">
        <motion.div
          className="bg-zinc-500 p-4 rounded-md mx-2"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, ease: "easeInOut", type: "spring" }}
        >
          <p className="font-semibold text-red-500">Problème ou bug ?</p>
          <p className="text-justify">
            Si tu rencontres des difficultés (impossible d'effectuer une action ou un bug bloquant),
            contacte l'équipe technique sur Discord le plus rapidement possible :
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>
              <span className="font-semibold">Quentin (Organisateur) :</span> quentadou.
            </li>
            <li>
              <span className="font-semibold">Noé (Développeur) :</span> henchoznoe
            </li>
          </ul>
        </motion.div>
        <motion.div
          className="bg-zinc-500 p-4 rounded-md mx-2"
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.4, ease: "easeInOut", type: "spring" }}
        >
          <p className="font-semibold text-green-500">Suggestions :</p>
          <p className="text-justify">
            Une idée pour améliorer l'application web ? Nous sommes à l'écoute ! Partage tes suggestions
            avec Noé pour continuer à améliorer la qualité des tournois organisés par le grand maître Quentadou
            !
          </p>
        </motion.div>
        <motion.div
          className="bg-zinc-500 p-4 rounded-md mx-2"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.6, ease: "easeInOut", type: "spring" }}
        >
          <p className="font-semibold text-blue-500">Autres questions :</p>
          <p className="text-justify">
            Pour toute autre question, tu peux contacter l'équipe technique sur Discord. Nous sommes là pour
            t'aider et répondre à tes interrogations.
          </p>
        </motion.div>
      </div>
    </>
  );
}

export default Contact;
