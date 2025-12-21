import { Team, Group } from '../data/groups';
import './GroupTable.css';

interface GroupTableProps {
  group: Group;
}

export default function GroupTable({ group }: GroupTableProps) {
  // Trier les équipes par points, puis différence de buts, puis buts marqués
  const sortedTeams = [...group.teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  const getRankColor = (index: number) => {
    if (index === 0 || index === 1) return '#004682'; // Bleu pour qualification directe
    if (index === 2) return '#63CB7B'; // Vert pour possible qualification
    return 'transparent';
  };

  return (
    <div className="group-table-wrapper">
      <h2 className="group-title">{group.name}</h2>
      <div className="table-container">
        <table className="group-table">
          <thead>
            <tr>
              <th className="rank-header">#</th>
              <th className="team-header">Équipe</th>
              <th>MJ</th>
              <th>V</th>
              <th>N</th>
              <th>D</th>
              <th>B</th>
              <th>DIFF</th>
              <th className="points-header">Pts</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <tr key={team.id} className={index < 2 ? 'qualified' : index === 2 ? 'possible-qualified' : ''}>
                <td className="rank-cell">
                  <span 
                    className="rank-badge"
                    style={{ backgroundColor: getRankColor(index) }}
                  >
                    {index + 1}
                  </span>
                </td>
                <td className="team-cell">
                  <div className="team-info">
                    <span className="team-flag">{team.flag}</span>
                    <span className="team-name">{team.name}</span>
                  </div>
                </td>
                <td>{team.played}</td>
                <td>{team.won}</td>
                <td>{team.drawn}</td>
                <td>{team.lost}</td>
                <td className="goals-cell">{team.goalsFor}:{team.goalsAgainst}</td>
                <td className={team.goalDifference >= 0 ? 'positive' : 'negative'}>
                  {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                </td>
                <td className="points-cell">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

