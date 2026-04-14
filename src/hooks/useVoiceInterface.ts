/**
 * useVoiceInterface — Web Speech API hook for hands-free JWORDENAI interaction.
 * Field crews speak commands; JWORDENAI responds via speech synthesis.
 */

import { useState, useCallback, useRef } from 'react';

// Web Speech API type declarations (not always present in TypeScript DOM types)
interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}
interface ISpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): { transcript: string };
  [index: number]: { transcript: string };
}
interface ISpeechRecognitionResultList {
  readonly length: number;
  item(index: number): ISpeechRecognitionResult;
  [index: number]: ISpeechRecognitionResult;
}
interface ISpeechRecognitionEvent {
  readonly results: ISpeechRecognitionResultList;
}
type SpeechRecognitionCtor = new () => ISpeechRecognition;

interface SpeechAPIWindow extends Window {
  SpeechRecognition?: SpeechRecognitionCtor;
  webkitSpeechRecognition?: SpeechRecognitionCtor;
}

function getSpeechRecognition(): SpeechRecognitionCtor | null {
  const w = window as SpeechAPIWindow;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export interface VoiceState {
  isListening: boolean;
  transcript: string;
  isSpeaking: boolean;
  isSupported: boolean;
  error: string | null;
}

export function useVoiceInterface(onTranscript: (text: string) => void) {
  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const [state, setState] = useState<VoiceState>({
    isListening: false,
    transcript: '',
    isSpeaking: false,
    isSupported,
    error: null,
  });

  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setState((s) => ({ ...s, error: 'Voice not supported in this browser.' }));
      return;
    }

    const SpeechRecognitionAPI = getSpeechRecognition();
    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    recognition.onstart = () => setState((s) => ({ ...s, isListening: true, error: null, transcript: '' }));

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      let text = '';
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setState((s) => ({ ...s, transcript: text }));
      const last = event.results[event.results.length - 1];
      if (last.isFinal) onTranscript(text);
    };

    recognition.onerror = (event: { error: string }) => {
      setState((s) => ({ ...s, isListening: false, error: `Voice error: ${event.error}` }));
    };

    recognition.onend = () => setState((s) => ({ ...s, isListening: false }));

    recognition.start();
  }, [isSupported, onTranscript]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setState((s) => ({ ...s, isListening: false }));
  }, []);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => v.lang === 'en-US' && v.name.includes('Google')) ||
      voices.find((v) => v.lang === 'en-US');
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => setState((s) => ({ ...s, isSpeaking: true }));
    utterance.onend = () => setState((s) => ({ ...s, isSpeaking: false }));

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setState((s) => ({ ...s, isSpeaking: false }));
  }, []);

  return { state, startListening, stopListening, speak, stopSpeaking };
}
