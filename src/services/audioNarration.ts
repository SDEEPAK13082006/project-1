// Audio narration service using Web Speech API & Web Audio Synthesizer for ambient bedtime soundscapes

class SoundscapeSynthesizer {
  private ctx: AudioContext | null = null;
  private currentOscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playSoundEffect(type: 'click' | 'pageturn' | 'magicChime') {
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (type === 'click') {
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } else if (type === 'pageturn') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } else if (type === 'magicChime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1046.50, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    }
  }

  public playAmbient(type: string) {
    this.stopAmbient();
    if (type === 'Off') return;

    this.initCtx();
    if (!this.ctx) return;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.07, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    if (type === 'Forest' || type === 'Campfire') {
      const freqs = type === 'Forest' ? [261.63, 329.63, 392.00, 523.25] : [196.00, 246.94, 293.66, 392.00];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        oscGain.gain.setValueAtTime(0.02, this.ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.gainNode);
        osc.start();
        this.currentOscillators.push(osc);
      });
    } else if (type === 'Rain' || type === 'Wind' || type === 'Ocean') {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.03;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      whiteNoise.connect(this.gainNode);
      whiteNoise.start();
    }
  }

  public stopAmbient() {
    this.currentOscillators.forEach(osc => {
      try { osc.stop(); } catch {}
    });
    this.currentOscillators = [];
    if (this.gainNode) {
      try { this.gainNode.disconnect(); } catch {}
      this.gainNode = null;
    }
  }
}

export const ambientSynth = new SoundscapeSynthesizer();

export interface SpeechOptions {
  text: string;
  voiceType: string;
  speed: number;
  onEnd?: () => void;
  onBoundary?: (charIndex: number) => void;
}

export class SpeechNarrator {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

  public static getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  public static speak(options: SpeechOptions) {
    if (!this.synth) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(options.text);
    utterance.rate = options.speed || 0.9;

    const voices = this.getVoices();
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    const selectedVoice = englishVoices.find(v => {
      const name = v.name.toLowerCase();
      if (options.voiceType === 'Mother' || options.voiceType === 'Female' || options.voiceType === 'Grandma') return name.includes('female') || name.includes('zira') || name.includes('samantha') || name.includes('victoria');
      if (options.voiceType === 'Father' || options.voiceType === 'Male' || options.voiceType === 'Grandpa') return name.includes('male') || name.includes('david') || name.includes('alex') || name.includes('george');
      return false;
    }) || englishVoices[0] || voices[0];

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    if (options.voiceType === 'Grandma') {
      utterance.pitch = 1.15;
    } else if (options.voiceType === 'Grandpa') {
      utterance.pitch = 0.85;
    }

    utterance.onend = () => {
      if (options.onEnd) options.onEnd();
    };

    this.synth.speak(utterance);
  }

  public static pause() {
    if (this.synth) this.synth.pause();
  }

  public static resume() {
    if (this.synth) this.synth.resume();
  }

  public static stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}
