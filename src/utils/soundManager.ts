import { Howl } from "howler";

// Sound effect URLs - you can replace these with your own sound files
const SOUND_URLS = {
  countdown: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  correctAnswer: "https://www.soundjay.com/misc/sounds/success-1.wav",
  wrongAnswer: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav",
  gameStart: "https://www.soundjay.com/misc/sounds/start-game.wav",
  gameFinish: "https://www.soundjay.com/misc/sounds/complete.wav",
  tick: "https://www.soundjay.com/misc/sounds/clock-tick.wav",
  timeWarning: "https://www.soundjay.com/misc/sounds/warning.wav",
};

class SoundManager {
  private sounds: { [key: string]: Howl } = {};
  private isEnabled: boolean = true;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds() {
    // Initialize all sounds
    Object.entries(SOUND_URLS).forEach(([key, url]) => {
      this.sounds[key] = new Howl({
        src: [url],
        volume: 0.5,
        preload: true,
        html5: true, // Use HTML5 Audio for better compatibility
        onloaderror: (_, error) => {
          console.warn(`Failed to load sound: ${key}`, error);
        },
      });
    });

    // Special configuration for specific sounds
    this.sounds.tick.volume(0.3);
    this.sounds.timeWarning.volume(0.7);
    this.sounds.correctAnswer.volume(0.8);
    this.sounds.wrongAnswer.volume(0.6);
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  playCountdown() {
    if (this.isEnabled && this.sounds.countdown) {
      this.sounds.countdown.play();
    }
  }

  playCorrectAnswer() {
    if (this.isEnabled && this.sounds.correctAnswer) {
      this.sounds.correctAnswer.play();
    }
  }

  playWrongAnswer() {
    if (this.isEnabled && this.sounds.wrongAnswer) {
      this.sounds.wrongAnswer.play();
    }
  }

  playGameStart() {
    if (this.isEnabled && this.sounds.gameStart) {
      this.sounds.gameStart.play();
    }
  }

  playGameFinish() {
    if (this.isEnabled && this.sounds.gameFinish) {
      this.sounds.gameFinish.play();
    }
  }

  playTick() {
    if (this.isEnabled && this.sounds.tick) {
      this.sounds.tick.play();
    }
  }

  playTimeWarning() {
    if (this.isEnabled && this.sounds.timeWarning) {
      this.sounds.timeWarning.play();
    }
  }

  stopAll() {
    Object.values(this.sounds).forEach((sound) => {
      sound.stop();
    });
  }

  setVolume(volume: number) {
    Object.values(this.sounds).forEach((sound) => {
      sound.volume(volume);
    });
  }
}

// Create a singleton instance
export const soundManager = new SoundManager();
