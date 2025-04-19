import Heading from "@components/global/Heading.tsx";

const Contact = () => {
  return (
    <>
      <Heading title="Contact"/>
      <div className="flex flex-col items-center gap-3 max-w-4xl mx-auto">
        <div
          className="bg-zinc-500 p-4 rounded-md mx-2"
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
        </div>
        <div
          className="bg-zinc-500 p-4 rounded-md mx-2"
        >
          <p className="font-semibold text-green-500">Suggestions :</p>
          <p className="text-justify">
            Une idée pour améliorer l'application web ? Nous sommes à l'écoute ! Partage tes suggestions
            avec Noé pour continuer à améliorer la qualité des tournois organisés par le grand maître Quentadou
            !
          </p>
        </div>
        <div
          className="bg-zinc-500 p-4 rounded-md mx-2"
        >
          <p className="font-semibold text-blue-500">Autres questions :</p>
          <p className="text-justify">
            Pour toute autre question, tu peux contacter l'équipe technique sur Discord. Nous sommes là pour
            t'aider et répondre à tes interrogations.
          </p>
        </div>
      </div>
    </>
  );
}

export default Contact;
