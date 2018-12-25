export type StoryId = string;
export type Score = string | number;
export type Story = {
    id: StoryId;
    title: string;
    description: string;
    score: Score;
};
