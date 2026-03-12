export type StoryDraft = {
  child: string;
  idea: string;
  tone: string;
  length: string;
};

export type GeneratedStory = StoryDraft & {
  title?: string;
  text: string;
};

export type SavedStory = GeneratedStory & {
  savedAt: number;
  guestName?: string;
};
