import { Extension } from "./types";

export const EXTENSIONS_DATA: Extension[] = [
  {
    id: "flowcut-pro",
    name: "FlowCut Pro",
    tagline: "Intellectual timeline rhythm tracker & smart automatic cut companion.",
    price: 129,
    rating: 4.9,
    reviewsCount: 384,
    version: "2.4.1",
    category: "Timeline",
    hosts: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    specs: {
      processor: "Apple Silicon M1/M2/M3 or Intel i7/i9 10th Gen+",
      ram: "16 GB Minimum (32 GB Recommended)",
      gpu: "Metal or DirectX 12 compatible GPU with 4GB+ VRAM"
    },
    features: [
      "Dynamic beat-matching clip alignment with custom transient sensors",
      "One-click multi-cam dialogue track sync with audio signature repair",
      "Automatic silence trimmer with fluid speed-ramping presets",
      "ProRes & DNxHR smart rendering optimization proxies"
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "precision-tracker",
    name: "Precision Tracker 3D",
    tagline: "Sub-pixel geometric solver and camera lens nodal point matching overlay.",
    price: 89,
    rating: 4.8,
    reviewsCount: 219,
    version: "3.0.2",
    category: "Tracking",
    hosts: ["After Effects", "DaVinci Resolve"],
    specs: {
      processor: "Intel Xeon / Apple M Series Max or higher",
      ram: "32 GB Recommended",
      gpu: "CUDA / Metal API with 8GB+ VRAM"
    },
    features: [
      "Planar tracking with advanced optical flow drift compensation",
      "Spherical lens distortion mapping and chromatic anomaly grids",
      "Nodal camera path reconstruction with robust export to Blender/Cinema4D",
      "Dynamic point-cloud isolation filter for complex occlusion handling"
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "chrono-glitch",
    name: "ChronoGlitch VFX",
    tagline: "Ultra-precise analog tape noise synthesizer and signal decay simulator.",
    price: 49,
    rating: 4.7,
    reviewsCount: 512,
    version: "1.8.0",
    category: "VFX",
    hosts: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Final Cut Pro"],
    specs: {
      processor: "Standard Multi-core CPU",
      ram: "8 GB Minimum",
      gpu: "OpenGL 4.1+ Accelerated"
    },
    features: [
      "Procedural VHS horizontal head switching and physical magnetic stretch sync",
      "NTSC color bleeding with customized luma/chroma shift controllers",
      "Real-time audio signal synchronization with CRT tube thermal simulation",
      "25 customizable CRT scanline overlays and scan phosphor presets"
    ],
    thumbnailUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80"
  }
];

export const TRUST_FAQS = [
  {
    question: "How is my local hardware telemetry kept anonymous?",
    answer: "Our system generates a unique UUID upon activation. This ID undergoes a salt-hash algorithm locally using Sha-256 before leaving your system. The hashed fingerprint is entirely detached from your name, email address, and billing keys in our databases, serving purely to prevent multiple parallel license activations."
  },
  {
    question: "Do FrameLabs plugins scan or index my video footage or files?",
    answer: "No. Our extensions are technically containerized to run inside host environments (Premiere, Resolve, After Effects). The plugins strictly read the timeline tracks current frame buffers that you apply the filter on. We do not inspect, write, or catalog filenames, directory structures, or render paths on your system drives."
  },
  {
    question: "How can I requests a signed copy of my collected records?",
    answer: "You can download a standardized GDPR transaction log from the GDPR compliance portal immediately. You can also initiate a verified secure PDF/JSON request by providing your email and clicking 'Export Compliance Package' on our workspace portal."
  },
  {
    question: "What exactly is the 'Technical Log' mentioned under section 2?",
    answer: "It includes variables like Host App Version (e.g. 'DaVinci Resolve v19.0.1b'), operating system type (e.g. 'macOS 15.1'), and basic hardware benchmarks (GPU execution speeds on core shaders). This ensures our team can debug performance bottlenecks and crash vectors on specific customer rigs."
  },
  {
    question: "Is FrameLabs compliant with GDPR, CCPA, and COPPA?",
    answer: "Yes, we undergo yearly external audits to guarantee full compliance. We do not store or process details of users under 16 years of age (COPPA compliant) and provide clear, simple interfaces for Californians and Europeans to export or wipe all accounts instantly."
  }
];
