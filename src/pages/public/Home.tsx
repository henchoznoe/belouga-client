import Heading from "@components/global/Heading.tsx";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useEffect, useState } from "react";
import { GetTeamsWithPlayersType, TeamsWithPlayersDataType } from "@/types/register.ts";
import { TwitchEmbed } from "react-twitch-embed";
import { SocialIcon } from "react-social-icons";

const Home = () => {

  const { send } = useFetch();

  const [teams, setTeams] = useState<TeamsWithPlayersDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const teamsRes: GetTeamsWithPlayersType = await send(1, "GET", {
        params: "action=getTeamsWithPlayers",
      });
      if ( teamsRes.success ) setTeams(teamsRes.data);
    };
    fetchData();
  }, [send]);

  const teamsWithPlayers = teams.reduce((acc: Record<string, any>, player) => {
    if ( player.fk_team ) {
      if ( !acc[player.fk_team] ) {
        acc[player.fk_team] = {
          name: player.name,
          players: [],
        };
      }
      if ( player.pk_player ) acc[player.fk_team].players.push(player);
    }
    return acc;
  }, {});

  return (
    <>
      <Heading title="Belouga Tournament"/>
      <div className="flex flex-col gap-3 items-center">
        <TwitchEmbed channel="quentadoulive"/>
      </div>

      <Heading title="Bracket"/>
      <div className="container mx-auto">
        <iframe src="https://challonge.com/fr/y1odac6n/module" width="100%" height="500" frameBorder="0" scrolling="auto"></iframe>
      </div>


      <Heading title="Équipes"/>
      <div className="flex flex-wrap gap-6 justify-center mx-2">
        {Object.keys(teamsWithPlayers).map((teamId) => (
          <div
            key={teamId}
            className="p-6 w-full sm:w-80 bg-zinc-500 text-white rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4">
              <span>{teamsWithPlayers[teamId].name}</span>
            </h3>
            {teamsWithPlayers[teamId].players.length === 0 ? (
              <p className="italic">Aucun joueur dans cette équipe</p>
            ) : (
              <div className="flex flex-col gap-4">
                {teamsWithPlayers[teamId].players.map((player: TeamsWithPlayersDataType) => (
                  <div
                    key={player.pk_player}
                    className="flex flex-col items-start bg-gray-700 p-4 rounded-md"
                  >
                    <div className="flex flex-col justify-between w-full mb-2">
                      <strong className="font-paladinsgrad text-xl">{player.username}</strong>
                      <span className="text-sm text-gray-400">({player.rank})</span>
                    </div>
                    <div className="flex items-center w-full justify-between gap-4 mb-2">
                      <div className="text-sm italic">
                        Discord: {player.discord}<br/>
                        Riot ID: {player.riot_username}
                      </div>
                      <div>
                        {player.twitch && (
                          <SocialIcon url={player.twitch} target="_blank" className="!size-10"/>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mb-20"></div>
    </>
  );
};

export default Home;
