import { useState } from "react";
import Heading from "@components/global/Heading.tsx";
import { Card, Modal } from "flowbite-react";

type TournamentType = {
  name: string;
  description: string;
  date: string;
  images: string[];
}

const tournamentsData: TournamentType[] = [
  {
    name: "Belouga Tournament #2",
    description: "Le Belouga Tournament #2 est un tournoi ayant eu lieu le 29 mars 2025 sur le jeu Valorant. L'équipe FireGoldSharks a gagné ce tournoi !",
    date: "2025-03-29",
    images: [
      "/img/BT-2.png",
      "/img/BT-2_2.png"
    ]
  }
];

const Tournaments = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<TournamentType | null>(null);

  const handleCardClick = (tournament: TournamentType) => {
    setSelectedTournament(tournament);
    setOpenModal(true);
  };

  return (
    <>
      <Heading title="Tournois"/>

      <div className="flex flex-col gap-6 justify-center mx-4 md:mx-12 lg:mx-40 items-center">
        {tournamentsData.map((tournament, index) => (
          <Card
            key={index}
            className="w-full bg-zinc-500 text-white shadow-md max-w-[100vw] md:max-w-[50vw] lg:max-w-[45vw] xl:max-w-[40vw]"
          >
            <h3 className="font-paladinsgrad text-2xl">{tournament.name}</h3>
            <p className="mb-4 italic font-paladinsgrad">{new Date(tournament.date).toLocaleDateString()}</p>
            <p className="text-justify">{tournament.description}</p>
            <img src={tournament.images[0]} alt="Preview" className="w-full h-auto rounded-lg"/>
            <button
              className="mt-4 bg-zinc-900 text-white py-2 px-4 rounded-lg hover:bg-zinc-700 transition duration-300"
              onClick={() => handleCardClick(tournament)}>
              En savoir plus
            </button>
          </Card>
        ))}
      </div>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="7xl"
      >
        <Modal.Header>{selectedTournament?.name} du {new Date(selectedTournament ? selectedTournament.date : "").toLocaleDateString()}</Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <p className="text-justify text-black">{selectedTournament?.description}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {selectedTournament?.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Tournament Image ${idx + 1}`}
                className="w-full rounded-lg"
              />
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Tournaments;
