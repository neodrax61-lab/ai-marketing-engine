export type StoryFrame = {
  ordem: number;
  texto: string;
};

export type StorySequence = {
  id: string;
  objetivo: 'educar' | 'relacionar' | 'converter';
  titulo: string;
  frames: StoryFrame[];
  cta: string;
};

export type StoryKit = {
  sequencias: StorySequence[];
};
