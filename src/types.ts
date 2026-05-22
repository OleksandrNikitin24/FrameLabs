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
  minDuration: number; // in frames
  padding: number; // in frames
  description: string;
}

export interface LicenseConfig {
  seats: number;
  pricePerSeat: number;
  hasPrioritySupport: boolean;
  hasBetaAccess: boolean;
}
