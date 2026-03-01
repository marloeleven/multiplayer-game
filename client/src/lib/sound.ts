const isProd = process.env.NODE_ENV === 'production';

const assetPrefix = isProd ? '/multiplayer-game' : '';

export const SOUND_TYPE = {
  COUNTDOWN: 'countdown',
  WINNER: 'winner',
} as const;

type SoundType = typeof SOUND_TYPE;
type SoundTypeValues = SoundType[keyof SoundType];

class SoundManager {
  sounds = new Map<string, HTMLAudioElement>();

  addAudio(key: string, src: string) {
    const sound = new Audio(`${assetPrefix}${src}`);
    sound.preload = 'auto';

    this.sounds.set(key, sound);
  }

  playAudio(key: SoundTypeValues, startTimeSec = 0, durationMs = 0) {
    const sound = this.sounds.get(key);

    if (!sound) {
      throw Error('Audio not found!');
    }

    sound.currentTime = startTimeSec;

    sound.play();
    if (durationMs) {
      setTimeout(() => {
        sound.pause();
      }, durationMs);
    }
  }

  stopAudio(key: SoundTypeValues) {
    const sound = this.sounds.get(key);

    sound?.pause();
  }

  on(
    key: SoundTypeValues,
    config: { durationMs?: number; startTime?: number },
  ) {
    const { startTime = 0, durationMs = 0 } = config;

    this.playAudio(key, startTime, durationMs);
  }
}

const soundManager = new SoundManager();

export { soundManager };

