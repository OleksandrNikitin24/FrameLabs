export type AppTab = "privacy" | "terms" | "support" | "extensions" | "gdpr";

export interface Extension {
  id: string;
  name: string;
  tagline: string;
  price: number;
  rating: number;
  reviewsCount: number;
  version: string;
  category: "Timeline" | "Tracking" | "Color" | "VFX";
  hosts: string[];
  specs: {
    processor: string;
    ram: string;
    gpu: string;
  };
  features: string[];
  thumbnailUrl: string; // Hotlinked visual placeholders
}

export interface CartItem {
  extension: Extension;
  quantity: number;
  licenseEmail?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface GDPRRequestResult {
  success: boolean;
  referenceID: string;
  email: string;
  dataType?: string;
  estimatedDelivery?: string;
  packageInfo?: {
    user_identity: {
      email: string;
      role: string;
    };
    direct_data: {
      account_registered: string;
      active_subscriptions: string[];
      billing_provider: string;
      card_stored_on_framelabs_servers: string;
    };
    technical_logs: {
      last_hardware_fingerprint_hash: string;
      recorded_os_families: string[];
      license_verification_handshakes: number;
      unauthorized_execution_alerts: number;
    };
  };
  action?: string;
  status?: string;
}
