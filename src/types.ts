export interface AudioSegment {
  id: string;
  start: number; // in seconds
  end: number;   // in seconds
  isSilence: boolean;
  text: string;
}

export interface EditingPreset {
  id: string;
  name: string;
  threshold: number; // in dB
  minDuration: number; // in ms
  padding: number; // in ms
  description: string;
}

export interface LicenseConfig {
  seats: number;
  pricePerSeat: number;
  hasPrioritySupport: boolean;
  hasBetaAccess: boolean;
}
