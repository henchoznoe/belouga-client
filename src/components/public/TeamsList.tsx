import { TeamsWithPlayersDataType } from "@/types/register.ts";
import { SocialIcon } from "react-social-icons";

type TeamsListProps = {
  teams: TeamsWithPlayersDataType[];
}

const TeamsList = (props: TeamsListProps) => {

  if ( props.teams.length === 0 ) return <p className="italic">Aucune équipe ni joueur inscrit pour le moment.</p>;

  const playersWithoutTeam = props.teams.filter((player) => player.fk_team === null);
  const teamsWithPlayers = props.teams.reduce((acc: Record<string, any>, player) => {
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
    <div className="space-y-6">
      {playersWithoutTeam.length > 0 && (
        <div className="p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Joueurs sans équipe</h3>
          <ul className="">
            {playersWithoutTeam.map((player) => (
              <div key={player.pk_player}>
                <strong>{player.username}</strong> ({player.rank})
                <div className="text-sm">
                  Discord : {player.discord}, Riot ID : {player.riot_username}
                  {player.twitch && (
                    <span>
                      , <a href={player.twitch} className="text-blue-500 underline">Twitch</a>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}

      {Object.keys(teamsWithPlayers).map((teamId) => (
        <div
          key={teamId}
          className="p-4 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-2">
            Équipe {teamId} : {teamsWithPlayers[teamId].name}
          </h3>
          <ul className="">
            {teamsWithPlayers[teamId].players.length === 0 ? (
              <span className="italic">Aucun joueur dans cette équipe</span>
            ) : (
              teamsWithPlayers[teamId].players.map((player: TeamsWithPlayersDataType) => (
                <div key={player.pk_player}>
                  <strong>- {player.username}</strong> ({player.rank}) {player.twitch &&
                  <SocialIcon url={player.twitch} className="!size-8"/>}
                  <div className="text-sm italic">
                    Discord : {player.discord}, Riot ID : {player.riot_username}
                  </div>
                </div>
              ))
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};


export default TeamsList;
