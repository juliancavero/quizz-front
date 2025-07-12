import { soundSequences } from "./soundGenerator";

class SoundManager {
  private isEnabled: boolean = true;

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  playCountdown() {
    if (this.isEnabled) {
      soundSequences.countdown();
    }
  }

  playCorrectAnswer() {
    if (this.isEnabled) {
      soundSequences.correct();
    }
  }

  playWrongAnswer() {
    if (this.isEnabled) {
      soundSequences.wrong();
    }
  }

  playGameStart() {
    if (this.isEnabled) {
      soundSequences.gameStart();
    }
  }

  playGameFinish() {
    if (this.isEnabled) {
      soundSequences.gameFinish();
    }
  }

  playTick() {
    if (this.isEnabled) {
      soundSequences.tick();
    }
  }

  playTimeWarning() {
    if (this.isEnabled) {
      soundSequences.warning();
    }
  }

  stopAll() {
    // For procedural sounds, we can't stop them once started
    // This method is kept for API compatibility
  }

  setVolume(volume: number) {
    // Volume control could be implemented in soundGenerator
    console.log(`Volume set to: ${volume}`);
  }
}

// Create a singleton instance
export const soundManager = new SoundManager();
