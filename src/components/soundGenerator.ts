// Simple sound generator utility
// This can be used to generate basic sounds if audio files are not available

export const generateSimpleSound = (
  frequency: number,
  duration: number,
  volume: number = 0.3,
  type: OscillatorType = "sine"
): Promise<void> => {
  return new Promise((resolve) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        volume,
        audioContext.currentTime + 0.01
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);

      setTimeout(() => {
        resolve();
      }, duration * 1000);
    } catch (error) {
      console.warn("Could not generate sound:", error);
      resolve();
    }
  });
};

export const playSequence = async (
  notes: Array<{ frequency: number; duration: number; delay?: number }>
) => {
  for (const note of notes) {
    if (note.delay) {
      await new Promise((resolve) => setTimeout(resolve, note.delay));
    }
    await generateSimpleSound(note.frequency, note.duration);
  }
};

// Predefined sound sequences
export const soundSequences = {
  countdown: () => generateSimpleSound(800, 0.2),
  correct: () =>
    playSequence([
      { frequency: 523, duration: 0.2 },
      { frequency: 659, duration: 0.2, delay: 100 },
      { frequency: 784, duration: 0.3, delay: 100 },
    ]),
  wrong: () =>
    playSequence([
      { frequency: 400, duration: 0.3 },
      { frequency: 300, duration: 0.3, delay: 150 },
    ]),
  gameStart: () =>
    playSequence([
      { frequency: 261, duration: 0.15 },
      { frequency: 329, duration: 0.15, delay: 100 },
      { frequency: 392, duration: 0.15, delay: 100 },
      { frequency: 523, duration: 0.3, delay: 100 },
    ]),
  gameFinish: () =>
    playSequence([
      { frequency: 523, duration: 0.2 },
      { frequency: 659, duration: 0.2, delay: 150 },
      { frequency: 784, duration: 0.2, delay: 150 },
      { frequency: 1047, duration: 0.4, delay: 150 },
    ]),
  tick: () => generateSimpleSound(1000, 0.1, 0.1),
  warning: () =>
    playSequence([
      { frequency: 800, duration: 0.1 },
      { frequency: 800, duration: 0.1, delay: 200 },
      { frequency: 800, duration: 0.1, delay: 200 },
    ]),
};
