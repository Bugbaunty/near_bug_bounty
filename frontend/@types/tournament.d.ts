export interface ITournamentData {
    id: number;
    background: string;
    title: string;
    description: string;
    genre: string;
    action: string;
    adventure: string;
} 

export type tournamentContextType = {
    tournamentData: ITournamentData[];
    userName: string;
}