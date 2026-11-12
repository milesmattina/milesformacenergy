"use client";

import Image from "next/image";
import resumeText from "./resume-text.json";
import { useEffect, useRef, useState } from "react";

type FieldNote = {
  title: string;
  label: string;
  oneLiner: string;
  color: "blue" | "red" | "gold";
  folder: string;
  artifacts: {
    detail: string;
    label: string;
  }[];
  links: {
    label: string;
    href: string;
  }[];
};

type ResumeMode = "closed" | "opening" | "open" | "full" | "minimized" | "closing";

type WhyCard = {
  title: string;
  note?: string;
  secondLine?: string;
  tone?: "sincere" | "bridge";
};

type WhySlideDirection = "next" | "prev";

type CanArrowGeometry = {
  height: number;
  path: string;
  width: number;
};

type ArtifactMedia =
  | {
      alt: string;
      href?: string;
      objectPosition: string;
      src: string;
      type: "image";
    }
  | {
      ariaLabel: string;
      href?: string;
      src: string;
      poster: string;
      type: "video";
    };

const buoyBirdMedia: ArtifactMedia[] = [
  {
    alt: "Buoy Bird merch booth with an orange bus and shirts",
    objectPosition: "center 72%",
    src: "/portfolio/buoy-bird-photo-1-f2087122.webp",
    type: "image",
  },
  {
    alt: "Clear Lake and Mount Konocti from above at dusk",
    objectPosition: "center",
    src: "/portfolio/buoy-bird-photo-2-289f2e5a.webp",
    type: "image",
  },
  {
    ariaLabel: "Clear Lake community video",
    src: "/clear-lake-context.mp4",
    poster: "/portfolio/clear-lake-context-dae269b3.webp",
    type: "video",
  },
  {
    ariaLabel: "Buoy Bird Cinema by the Shore reel",
    href: "https://www.instagram.com/p/DNjMhHCSgwV/",
    src: "/buoy-bird-cbts-reel.mp4",
    poster: "/portfolio/buoy-bird-cbts-reel-8e75ed86.webp",
    type: "video",
  },
];

const konoctiClimbMedia: (ArtifactMedia | undefined)[] = [
  {
    ariaLabel: "Konocti Climb flyover video",
    src: "/konocti-climb-ai-ascent.mp4#t=2",
    poster: "/portfolio/konocti-climb-ai-ascent-762ca070.webp",
    type: "video",
  },
  {
    ariaLabel: "Konocti Climb race-day operations reel",
    href: "https://www.instagram.com/p/DP1VLnyDi2P/",
    src: "/konocti-climb-reel.mp4",
    poster: "/portfolio/konocti-climb-reel-ca0ca006.webp",
    type: "video",
  },
  {
    alt: "Konocti Climb horizontal logo from the website footer",
    objectPosition: "center",
    src: "/portfolio/konocti-climb-horizontal-card-5a3c288d.webp",
    type: "image",
  },
  {
    alt: "Konocti Climb homepage hero with Mount Konocti at sunset",
    objectPosition: "center",
    src: "/portfolio/konocti-climb-home-cover-22e465ed.webp",
    type: "image",
  },
];

const southOfSoberMedia: ArtifactMedia[] = [
  {
    alt: "South of Sober wordmark on a black background",
    objectPosition: "center",
    src: "/portfolio/south-of-sober-logo-9db5395f.webp",
    type: "image",
  },
  {
    alt: "South of Sober band members posing with guitars and amplifiers at UCLA",
    objectPosition: "center",
    src: "/portfolio/south-of-sober-band-f6567d32.webp",
    type: "image",
  },
  {
    ariaLabel: "South of Sober Battle of the Bands performance clip",
    src: "/south-of-sober-botb.mp4",
    poster: "/portfolio/south-of-sober-botb-f9ac86f7.webp",
    type: "video",
  },
  {
    ariaLabel: "South of Sober Hear You Out performance clip",
    src: "/south-of-sober-hear-you-out.mp4",
    poster: "/portfolio/south-of-sober-hear-you-out-5e4aca0a.webp",
    type: "video",
  },
];

const whyCards: WhyCard[] = [
  {
    title: "I BUILT YOU THIS WEBSITE.",
    note: "So that's gotta count for something.",
  },
  {
    title: "I LIKE A BRAND WITH NOTHING TO HIDE.",
    note: "So I brought the work. And the receipts.",
  },
  {
    title: "I PUT MY RESUME IN AN ENERGY CAN.",
    note: "Apparently, I take brand consistency pretty seriously.",
  },
  {
    title: "YOU ASKED FOR A RESUME.",
    note: "I may have gotten a little carried away.",
  },
  {
    title: "I'VE SOLD T-SHIRTS OUT OF A VOLKSWAGEN BUS.",
    note: "There's probably a transferable skill in there somewhere.",
  },
  {
    title: "I MAKE THINGS PEOPLE ACTUALLY WANT TO LOOK AT.",
    note: "You're still clicking these.",
  },
  {
    title: "SERIOUSLY, THOUGH.",
    secondLine: "I THINK I'D BE REALLY GOOD AT THIS.",
    tone: "sincere",
  },
  {
    title: "DON'T BELIEVE ME?",
    tone: "bridge",
  },
];

const fieldNotes: FieldNote[] = [
  {
    title: "Buoy Bird",
    label: "local apparel brand / community pride / in-person sales",
    oneLiner:
      "I built Buoy Bird to make Lake County feel worth rallying around: products, Shopify, content, pop-up sales, and free lakeside movie nights under one local brand.",
    color: "blue",
    folder: "/work/buoy-bird/",
    artifacts: [
      {
        label: "Volkswagen bus booth",
        detail: "Sold merch in person at local events, including straight out of the bus.",
      },
      {
        label: "Cinema by the Shore",
        detail:
          "Turned Buoy Bird into five free community movie nights with 1,500+ total attendees.",
      },
      {
        label: "Clear Lake context",
        detail: "The brand was built around local pride, lake life, and giving the town something positive to point at.",
      },
      {
        label: "Shopify + social",
        detail: "Ran the store, products, fulfillment, customer issues, paid ads, and content that reached 350K+ views.",
      },
    ],
    links: [
      { label: "buoybird.shop", href: "https://buoybird.shop" },
      {
        label: "@buoybirdofficial",
        href: "https://www.instagram.com/buoybirdofficial/",
      },
    ],
  },
  {
    title: "Konocti Climb",
    label: "public race / mountain brand / full event system",
    oneLiner:
      "A 5K up Mount Konocti where I owned the visible stuff and the invisible stuff: identity, route flow, volunteers, sponsors, shirts, medals, trophies, promotion, and the website.",
    color: "red",
    folder: "/work/konocti-climb/",
    artifacts: [
      {
        label: "166 first-year racers",
        detail: "Built the participant experience for a new race up Lake County's volcanic landmark.",
      },
      {
        label: "Race-day operations",
        detail: "Mapped parking, shuttles, water stations, summit logistics, volunteers, staffing, and flow.",
      },
      {
        label: "Identity + gear",
        detail: "Designed the visual system, bibs, shirts, medals, trophies, flyers, videos, and social assets.",
      },
      {
        label: "Interactive website",
        detail: "Built a responsive event site with course info, mapping, flyover-style presentation, and custom branding.",
      },
    ],
    links: [
      { label: "konocticlimb.com", href: "https://konocticlimb.com" },
      {
        label: "@lakecountyparksandrec",
        href: "https://www.instagram.com/lakecountyparksandrec/",
      },
    ],
  },
  {
    title: "South of Sober",
    label: "band / original music / artist-manager mode",
    oneLiner:
      "The band is the cleanest version of how I work: write the songs, recruit the people, book the room, build the brand, run the logistics, and still get on stage.",
    color: "gold",
    folder: "/work/south-of-sober/",
    artifacts: [
      {
        label: "Original music",
        detail: "Lead singer, guitarist, songwriter, and creative lead for an active Los Angeles band.",
      },
      {
        label: "Crowds in the hundreds",
        detail: "Scaled from early UCLA shows into larger campus events and Los Angeles venues.",
      },
      {
        label: "Booking + operations",
        detail: "Coordinate members, rehearsals, venue relationships, gear, expenses, schedules, and show logistics.",
      },
      {
        label: "Brand + commitment",
        detail: "Named the band, built the website, shaped the visual identity, and bought a cargo van for gear.",
      },
    ],
    links: [{ label: "SouthofSober.com", href: "https://southofsober.com/" }],
  },
];

const navItems = [
  ["Why", "#why-me"],
  ["Receipts", "#field-notes"],
  ["Resume", "#top"],
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function createCanArrowGeometry(
  sectionRect: DOMRectReadOnly,
  buttonRect: DOMRectReadOnly,
  canRect: DOMRectReadOnly,
): CanArrowGeometry {
  const localX = (value: number) => value - sectionRect.left;
  const localY = (value: number) => value - sectionRect.top;
  const canIsBelow = canRect.top > buttonRect.bottom + 36;
  const sectionWidth = Math.max(1, sectionRect.width);
  const sectionHeight = Math.max(1, sectionRect.height);
  let path: string;

  if (canIsBelow || sectionWidth < 820) {
    const startX = localX(buttonRect.right - 1);
    const startY = localY(buttonRect.bottom - 1);
    const endX = localX(canRect.left + canRect.width * 0.78);
    const endY = localY(canRect.top + canRect.height * 0.11);
    const distanceX = Math.max(120, endX - startX);
    const distanceY = Math.max(120, endY - startY);
    const pull = Math.min(96, Math.max(52, distanceY * 0.38));

    path = [
      `M ${startX.toFixed(1)} ${startY.toFixed(1)}`,
      `C ${(startX + distanceX * 0.16).toFixed(1)} ${(startY + pull).toFixed(1)},`,
      `${(endX - distanceX * 0.16).toFixed(1)} ${(endY - pull).toFixed(1)},`,
      `${endX.toFixed(1)} ${endY.toFixed(1)}`,
    ].join(" ");
  } else {
    const startX = localX(buttonRect.right - 1);
    const startY = localY(buttonRect.top + buttonRect.height * 0.5);
    const endX = localX(canRect.left + Math.min(22, canRect.width * 0.1));
    const endY = localY(
      clamp(
        Math.max(
          buttonRect.top + buttonRect.height * 0.34,
          canRect.top + canRect.height * 0.46,
        ),
        canRect.top + 24,
        canRect.bottom - 20,
      ),
    );
    const distance = Math.max(160, endX - startX);
    const laneY = Math.max(startY + 2, endY);
    const bow = Math.min(36, Math.max(14, distance * 0.045));

    path = [
      `M ${startX.toFixed(1)} ${startY.toFixed(1)}`,
      `C ${(startX + distance * 0.34).toFixed(1)} ${(laneY + bow).toFixed(1)},`,
      `${(endX - distance * 0.34).toFixed(1)} ${(endY + bow).toFixed(1)},`,
      `${endX.toFixed(1)} ${endY.toFixed(1)}`,
    ].join(" ");
  }

  return {
    height: sectionHeight,
    path,
    width: sectionWidth,
  };
}

function colorClasses(color: FieldNote["color"]) {
  if (color === "red") {
    return "bg-[var(--mac-orange)] text-[var(--mac-black)] shadow-[10px_10px_0_var(--mac-black)]";
  }

  if (color === "gold") {
    return "bg-[var(--mac-orange)] text-[var(--ink)] shadow-[10px_10px_0_var(--mac-accent)]";
  }

  return "bg-[var(--mac-black)] text-white shadow-[10px_10px_0_var(--mac-accent)]";
}

type ResumeCanProps = {
  isResumeActive: boolean;
  isPrompting: boolean;
  openResume: () => void;
  resumeMode: ResumeMode;
  onCanMotionEnd: () => void;
};

function ResumeCan({ isResumeActive, isPrompting, openResume, resumeMode, onCanMotionEnd }: ResumeCanProps) {
  const moving = resumeMode === "opening" || resumeMode === "closing";
  return (
    <button
      aria-label="Open Miles Mattina resume can"
      aria-expanded={isResumeActive}
      aria-controls="resume-viewer"
      aria-busy={moving}
      data-state={resumeMode}
      className={`resume-can ${moving ? `resume-can--${resumeMode}` : ""} ${isPrompting && !isResumeActive ? "resume-can--prompt" : ""} ${isResumeActive && resumeMode !== "opening" ? "resume-can--open" : ""}`}
      disabled={moving}
      onClick={openResume}
      type="button"
    >
      <svg className="resume-can__art" viewBox="0 0 320 540" aria-hidden="true">
        <defs>
          <linearGradient id="can-metal" x1="0" x2="1">
            <stop stopColor="#626b6c"/><stop offset=".13" stopColor="#eff1ed"/><stop offset=".28" stopColor="#939b99"/><stop offset=".46" stopColor="#f7faf3"/><stop offset=".7" stopColor="#7c8582"/><stop offset=".87" stopColor="#d8ded6"/><stop offset="1" stopColor="#555e58"/>
          </linearGradient>
          <linearGradient id="can-black" x1="0" x2="1">
            <stop stopColor="#888b8c"/><stop offset=".13" stopColor="#e9eae8"/><stop offset=".3" stopColor="#fafbf8"/><stop offset=".54" stopColor="#dadcd9"/><stop offset=".8" stopColor="#b8bcba"/><stop offset=".96" stopColor="#eeefec"/><stop offset="1" stopColor="#929695"/>
          </linearGradient>
          <linearGradient id="can-lid" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#e3e5e4"/><stop offset=".45" stopColor="#858a89"/><stop offset="1" stopColor="#dce0de"/>
          </linearGradient>
          <linearGradient id="can-glint" x1="0" x2="1">
            <stop stopColor="#fff" stopOpacity="0"/><stop offset=".45" stopColor="#fff" stopOpacity=".17"/><stop offset="1" stopColor="#fff" stopOpacity="0"/>
          </linearGradient>
          <clipPath id="can-opening"><ellipse cx="160" cy="89" rx="43" ry="16"/></clipPath>
        </defs>
        <ellipse cx="165" cy="510" rx="116" ry="14" fill="#000" opacity=".5"/>
        <path d="M66 86Q56 112 51 128V465Q51 489 74 494H246Q269 489 269 465V128Q264 108 254 86Z" fill="url(#can-metal)"/>
        <path d="M65 105Q57 124 57 140V463Q57 478 76 482H244Q263 478 263 463V140Q263 124 255 105Z" fill="url(#can-black)" stroke="#41483c"/>
        <path d="M73 123V460" stroke="#d3dcc9" strokeOpacity=".18" strokeWidth="3"/>
        <path d="M245 125V460" stroke="#000" strokeWidth="7" opacity=".5"/>
        <path d="M62 469Q160 494 258 469V480Q160 506 62 480Z" fill="url(#can-metal)"/>
        <path d="M65 483Q160 506 255 483" fill="none" stroke="#eef3eb" strokeOpacity=".8" strokeWidth="2"/>
        <text x="160" y="143" fill="#292929" fontSize="8.5" letterSpacing="2.1" textAnchor="middle">INDEPENDENT APPLICATION</text>
        <g transform="translate(82 389) rotate(-90)">
          <image href="/brand/mac-logo.png" width="230" height="93" style={{filter: "brightness(0)"}} />
        </g>
        <path d="M199 161H246V390H199Z" fill="#f26403" />
        <g transform="translate(212 177) rotate(90)" className="resume-can__label">
          <text fill="#171717" fontSize="28" letterSpacing="1.5">MILES MATTINA</text>
        </g>
        <g className="resume-can__label" textAnchor="middle">
          <text x="160" y="428" fill="#191919" fontSize="38" letterSpacing="2">RESUME</text>
          <path d="M84 439H236" stroke="#333" strokeWidth="1" />
          <text x="160" y="457" fill="#242424" fontFamily="Arial, sans-serif" fontSize="9" letterSpacing="1.6">BRAND MANAGER / MAC ENERGY</text>
        </g>
        {Array.from({length: 20}, (_, i) => <g key={i} transform={`translate(${69 + (i * 43) % 181} ${155 + (i * 67) % 242})`}>
          <ellipse rx={1.6 + i % 3} ry={2.3 + i % 3} fill="#fff" fillOpacity=".15" stroke="#fff" strokeOpacity=".6" strokeWidth=".7" />
          <path d="M-1 1L1 2" stroke="#323232" strokeOpacity=".35" strokeWidth=".8" />
        </g>)}
        <path d="M78 131H113V470H78Z" fill="url(#can-glint)"/>
        <ellipse cx="160" cy="88" rx="98" ry="30" fill="url(#can-metal)" stroke="#b9bfbc" strokeWidth="2"/>
        <ellipse cx="160" cy="86" rx="89" ry="24" fill="url(#can-lid)" stroke="#555958"/>
        <ellipse cx="160" cy="86" rx="81" ry="20" fill="none" stroke="#e5e9e7" strokeOpacity=".65"/>
        <ellipse cx="160" cy="89" rx="45" ry="18" fill="#1b1b1b" stroke="#747a77" strokeWidth="2"/>
        <g clipPath="url(#can-opening)">
          <rect className="resume-can__shutter" x="113" y="69" width="94" height="40" rx="18" fill="url(#can-metal)" stroke="#c9d3c1"/>
        </g>
        <g className="resume-can__ticket">
          <path d="M140 94V55H180V94" fill="#fff" stroke="#bbb"/>
          <path d="M147 64H173M147 70H173M147 76H167" stroke="#222" strokeWidth="2"/>
          <path d="M147 82H159" stroke="#f26403" strokeWidth="3"/>
        </g>
        <g className="resume-can__tab" onAnimationEnd={(event) => { if (event.target === event.currentTarget) onCanMotionEnd(); }}>
          <path d="M148 77Q138 67 140 56Q142 46 160 46Q178 46 180 56Q182 67 172 77Z" fill="url(#can-metal)" stroke="#656b68" strokeWidth="2"/>
          <ellipse cx="160" cy="59" rx="11" ry="7" fill="#292929" stroke="#e5e9e6" strokeWidth="1.5"/>
          <path d="M150 71H170" stroke="#5b625f" strokeWidth="2"/>
        </g>
        <ellipse cx="160" cy="77" rx="5" ry="3" fill="#dce2df" stroke="#707875"/>
        <path d="M66 86Q160 117 254 86" fill="none" stroke="#f2f5f3" strokeOpacity=".8" strokeWidth="2"/>
      </svg>
      <span className="resume-can__cta">{isResumeActive ? "Resume, on tap ↗" : "Pop open my resume ↗"}</span>
    </button>
  );
}

type ArtifactMediaFrameProps = {
  artifactLabel: string;
  media: ArtifactMedia;
};

function ArtifactMediaFrame({ artifactLabel, media }: ArtifactMediaFrameProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.15 });
    observer.observe(video);
    return () => { observer.disconnect(); video.pause(); };
  }, []);
  const frameClassName =
    "relative block h-40 overflow-hidden border-2 border-[var(--mac-accent)] bg-white";
  const content =
    media.type === "image" ? (
      <Image
        alt={media.alt}
        className="object-cover"
        fill
        loading="eager"
        fetchPriority="high"
        unoptimized
        sizes="(max-width: 640px) calc(100vw - 4rem), 25vw"
        src={media.src}
        style={{
          objectPosition: media.objectPosition,
        }}
      />
    ) : (
      <>
        <link rel="preload" as="image" href={media.poster} fetchPriority="high" />
        <video
        aria-label={media.ariaLabel}
        ref={videoRef}
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        className="pointer-events-none h-full w-full object-cover"
        loop
        muted
        playsInline
        preload="none"
        poster={media.poster}
      >
        <source src={media.src} type="video/mp4" />
      </video>
      </>
    );

  if (media.href) {
    return (
      <a
        aria-label={`Open ${artifactLabel} on Instagram`}
        className={`${frameClassName} transition hover:-translate-y-0.5`}
        href={media.href}
        rel="noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return <div className={frameClassName}>{content}</div>;
}

export default function Home() {
  const [cardIndex, setCardIndex] = useState(0);
  const [canPromptLevel, setCanPromptLevel] = useState<0 | 1 | 2>(0);
  const [isCanPrompting, setIsCanPrompting] = useState(false);
  const [cardSlideDirection, setCardSlideDirection] =
    useState<WhySlideDirection | null>(null);
  const [isWhyStackComplete, setIsWhyStackComplete] = useState(false);
  const [resumeMode, setResumeMode] = useState<ResumeMode>("closed");
  const [isResumeZoomed, setIsResumeZoomed] = useState(false);
  const [canArrowGeometry, setCanArrowGeometry] =
    useState<CanArrowGeometry | null>(null);
  const canPromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardSlideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousResumeModeRef = useRef<ResumeMode>("closed");
  const topSectionRef = useRef<HTMLElement | null>(null);
  const canPromptButtonRef = useRef<HTMLButtonElement | null>(null);
  const currentCard = whyCards[cardIndex];
  const isFinalCard = cardIndex === whyCards.length - 1;
  const isSincereCard = currentCard.tone === "sincere";
  const isBridgeCard = currentCard.tone === "bridge";
  const isCardSliding = cardSlideDirection !== null;
  const isResumeVisible = resumeMode === "open" || resumeMode === "full";
  const isResumeActive =
    resumeMode !== "closed" && resumeMode !== "closing";

  useEffect(() => () => {
    if (cardSlideTimerRef.current) clearTimeout(cardSlideTimerRef.current);
    if (canPromptTimerRef.current) clearTimeout(canPromptTimerRef.current);
  }, []);

  useEffect(() => {
    if (resumeMode !== "opening" && resumeMode !== "closing") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      setResumeMode((mode) => mode === "opening" ? "open" : mode === "closing" ? "closed" : mode);
    }, reduced ? 0 : 1250);
    return () => window.clearTimeout(timer);
  }, [resumeMode]);

  useEffect(() => {
    if (isResumeVisible) document.querySelector<HTMLAnchorElement>(".resume-download")?.focus({ preventScroll: true });
    if (resumeMode === "closed" && previousResumeModeRef.current === "closing") document.querySelector<HTMLButtonElement>(".resume-can")?.focus({ preventScroll: true });
    previousResumeModeRef.current = resumeMode;
  }, [isResumeVisible, resumeMode]);

  useEffect(() => {
    if (!isResumeVisible) return;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setResumeMode("closing");
        document.querySelector<HTMLButtonElement>(".resume-can")?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [isResumeVisible]);


  useEffect(() => {
    if (canPromptLevel !== 2) {
      return;
    }

    const topSection = topSectionRef.current;
    const promptButton = canPromptButtonRef.current;
    const can = topSection?.querySelector(".resume-can");

    if (!topSection || !promptButton || !(can instanceof HTMLElement)) {
      return;
    }

    let animationFrame = 0;
    const measureArrow = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        setCanArrowGeometry(
          createCanArrowGeometry(
            topSection.getBoundingClientRect(),
            promptButton.getBoundingClientRect(),
            can.getBoundingClientRect(),
          ),
        );
      });
    };

    measureArrow();
    const settleTimer = window.setTimeout(measureArrow, 560);
    const lateSettleTimer = window.setTimeout(measureArrow, 920);
    window.addEventListener("resize", measureArrow);
    window.addEventListener("orientationchange", measureArrow);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measureArrow);

    resizeObserver?.observe(topSection);
    resizeObserver?.observe(promptButton);
    resizeObserver?.observe(can);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(settleTimer);
      window.clearTimeout(lateSettleTimer);
      window.removeEventListener("resize", measureArrow);
      window.removeEventListener("orientationchange", measureArrow);
      resizeObserver?.disconnect();
    };
  }, [canPromptLevel]);

  function moveCard(direction: WhySlideDirection) {
    if (isCardSliding) {
      return;
    }

    if (direction === "prev" && cardIndex === 0) {
      return;
    }

    setCardSlideDirection(direction);

    if (cardSlideTimerRef.current) {
      clearTimeout(cardSlideTimerRef.current);
    }

    cardSlideTimerRef.current = setTimeout(() => {
      if (direction === "next" && isFinalCard) {
        setIsWhyStackComplete(true);
      } else {
        setCardIndex((index) =>
          direction === "next"
            ? Math.min(index + 1, whyCards.length - 1)
            : Math.max(index - 1, 0),
        );
      }

      setCardSlideDirection(null);
      cardSlideTimerRef.current = null;
    }, 240);
  }

  function advanceCard() {
    moveCard("next");
  }

  function resetCards() {
    if (cardSlideTimerRef.current) {
      clearTimeout(cardSlideTimerRef.current);
      cardSlideTimerRef.current = null;
    }

    setCardSlideDirection(null);
    setCardIndex(0);
    setIsWhyStackComplete(false);
  }

  function promptCanClick() {
    if (canPromptTimerRef.current) {
      clearTimeout(canPromptTimerRef.current);
    }

    setCanPromptLevel((level) => (level === 0 ? 1 : 2));
    setIsCanPrompting(false);
    requestAnimationFrame(() => {
      setIsCanPrompting(true);
      canPromptTimerRef.current = setTimeout(() => {
        setIsCanPrompting(false);
        canPromptTimerRef.current = null;
      }, 520);
    });
  }

  function openResume() {
    if (isResumeVisible || resumeMode === "opening" || resumeMode === "closing") return;
    setCanPromptLevel(0);
    setResumeMode(resumeMode === "minimized" ? "open" : "opening");
  }

  function finishCanMotion() {
    setResumeMode((mode) => mode === "opening" ? "open" : mode === "closing" ? "closed" : mode);
  }

  function scrollToWork() {
    const workSection = document.getElementById("field-notes");

    if (!workSection) {
      return;
    }

    window.scrollTo({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      top: workSection.getBoundingClientRect().top + window.scrollY - 88,
    });
  }

  function scrollToCan() {
    const topSection = document.getElementById("top");

    if (!topSection) {
      return;
    }

    window.scrollTo({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      top: topSection.offsetTop,
    });

    window.setTimeout(promptCanClick, 650);
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--background)] text-[var(--ink)]">

      <nav
        aria-label="Main sections"
        className="site-nav sticky top-0 z-50 border-b-4 border-[var(--mac-black)] bg-white/90 px-4 py-3 shadow-[0_6px_0_var(--mac-accent)] backdrop-blur sm:px-6"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a
            className="font-mono text-xs font-black uppercase tracking-[0.22em] text-[var(--mac-black)]"
            href="#top"
          >
            <span>Miles Mattina</span><span className="nav-slash" aria-hidden="true">/</span>
            <Image className="nav-brand" src="/brand/mac-logo.png" alt="MAC Energy" width={100} height={33} unoptimized priority />
          </a>
          <div className="flex flex-wrap justify-end gap-2">
            {navItems.map(([label, href]) => (
              <a
                className="border-2 border-[var(--mac-black)] bg-white px-3 py-1.5 text-xs font-black uppercase text-[var(--mac-black)] shadow-[3px_3px_0_var(--mac-accent)] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--mac-accent)]"
                href={href}
                key={href}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section
        className="mac-hero relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-16"
        id="top"
        ref={topSectionRef}
      >
        <div className="hero-copy relative z-10">
          <p className="mb-5 inline-flex -rotate-2 border-2 border-[var(--mac-black)] bg-[var(--mac-orange)] px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-[var(--mac-black)] shadow-[5px_5px_0_var(--mac-accent)]">
            Brand Manager application
          </p>
          <h1 className="max-w-3xl text-6xl font-black uppercase leading-[0.84] text-[var(--mac-black)] sm:text-7xl lg:text-8xl">
            Who is this guy?
          </h1>
          <p className="mt-7 max-w-2xl text-xl font-semibold leading-8 sm:text-2xl">
            A custom hello from Miles Mattina, built for MAC Energy with
            a little brand-building experience, a lot of creative follow-through,
            and a very earnest interest in the job.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center gap-3">
            <button
              className={`can-prompt-button ${
                canPromptLevel === 2 ? "can-prompt-button--final" : ""
              }`}
              onClick={promptCanClick}
              ref={canPromptButtonRef}
              type="button"
            >
                {canPromptLevel === 0
                  ? "Click the can"
                  : canPromptLevel === 1
                    ? "no, click the can"
                    : "THE CAN"}
            </button>
            {canPromptLevel === 1 ? (
              <span
                aria-hidden="true"
                className="pointer-events-none text-4xl font-black text-[var(--mac-accent)] sm:text-5xl"
              >
                →
              </span>
            ) : null}
          </div>
        </div>

        {canPromptLevel === 2 && canArrowGeometry ? (
          <svg
            aria-hidden="true"
            className="can-target-arrow"
            viewBox={`0 0 ${canArrowGeometry.width} ${canArrowGeometry.height}`}
          >
            <defs>
              <marker
                id="can-target-arrow-head"
                markerHeight="28"
                markerUnits="userSpaceOnUse"
                markerWidth="34"
                orient="auto"
                refX="30"
                refY="14"
              >
                <path d="M 0 0 L 34 14 L 0 28 Z" fill="currentColor" />
              </marker>
            </defs>
            <g className="can-target-arrow__draw">
              <path
                className="can-target-arrow__path"
                d={canArrowGeometry.path}
                markerEnd="url(#can-target-arrow-head)"
              />
            </g>
          </svg>
        ) : null}

        <div
          aria-label="Interactive Miles Mattina resume can"
          className="can-stage relative min-h-[560px]"
        >
          <ResumeCan
            isResumeActive={isResumeActive}
            isPrompting={isCanPrompting}
            openResume={openResume}
            resumeMode={resumeMode}
            onCanMotionEnd={finishCanMotion}
          />
        </div>
      </section>

      <section
        className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-20"
        id="why-me"
      >
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.26em] text-[var(--mac-accent)]">
            pull cards
          </p>
          <h2 className="mt-2 text-5xl font-black uppercase leading-none text-[var(--mac-black)] sm:text-6xl">
            Why me?
          </h2>
          {cardIndex > 0 || isWhyStackComplete ? (
            <button
              className="mt-6 border-2 border-[var(--mac-black)] bg-white px-4 py-2 text-xs font-black uppercase text-[var(--mac-black)] shadow-[4px_4px_0_var(--mac-accent)]"
              onClick={resetCards}
              type="button"
            >
              Restack
            </button>
          ) : null}
        </div>

        <div
          className="relative min-h-[470px]"
        >
          {isWhyStackComplete ? (
            <div className="absolute inset-x-0 top-0 mx-auto flex h-80 w-[calc(100%-1.25rem)] max-w-xl flex-col justify-center gap-8 border-4 border-[var(--mac-black)] bg-[var(--mac-orange)] p-8 text-[var(--mac-black)] shadow-[10px_10px_0_var(--mac-accent)] sm:w-full sm:shadow-[14px_14px_0_var(--mac-accent)]">
              <h3 className="text-5xl font-black uppercase leading-[0.88] sm:text-6xl">
                THEN LET ME PROVE IT.
              </h3>
              <button
                className="self-start border-2 border-[var(--mac-black)] bg-white px-5 py-3 text-sm font-black uppercase text-[var(--mac-black)] shadow-[5px_5px_0_var(--mac-accent)] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--mac-accent)]"
                onClick={scrollToWork}
                type="button"
              >
                Start snooping
              </button>
            </div>
          ) : (
            <>
              {whyCards
                .slice(cardIndex + 1, cardIndex + 4)
                .map((card, offset) => (
                  <div
                    className={`pointer-events-none absolute inset-x-0 mx-auto w-[calc(100%-1.25rem)] max-w-xl border-4 border-[var(--mac-black)] bg-white shadow-[8px_8px_0_rgba(0,0,0,0.1)] sm:w-full sm:shadow-[10px_10px_0_rgba(0,0,0,0.1)] h-80`}
                    key={card.title}
                    style={{
                      top: `${24 + offset * 16}px`,
                      transform: `rotate(${
                        offset % 2 === 0 ? 2 : -2
                      }deg) scale(${0.96 - offset * 0.03})`,
                      zIndex: 3 - offset,
                    }}
                  />
                ))}
              <div
                aria-live="polite"
                className={`why-card ${isBridgeCard ? "why-card--bridge" : isSincereCard ? "why-card--sincere" : ""} absolute inset-x-0 top-0 z-10 mx-auto flex w-[calc(100%-1.25rem)] max-w-xl border-4 border-[var(--mac-black)] text-left shadow-[10px_10px_0_var(--mac-accent)] transition hover:-translate-y-1 sm:w-full sm:shadow-[14px_14px_0_var(--mac-accent)] h-80 ${
                  cardSlideDirection === "next" ? "why-card--exit-next" : ""
                } ${
                  cardSlideDirection === "prev" ? "why-card--exit-prev" : ""
                } ${
                  isSincereCard
                    ? "flex-col justify-center gap-7 bg-[var(--mac-black)] p-9 text-white sm:p-10"
                    : isBridgeCard
                      ? "items-center justify-center bg-[var(--mac-orange)] p-9 text-center text-[var(--mac-black)] sm:p-10"
                      : "flex-col justify-between bg-white p-6 text-[var(--ink)] sm:p-7"
                }`}
              >
                {isSincereCard || isBridgeCard ? null : (
                  <span className="font-mono text-xs font-black uppercase tracking-[0.24em] opacity-70">
                    card {cardIndex + 1} / {whyCards.length}
                  </span>
                )}
                  <>
                    <span
                      className={`[overflow-wrap:anywhere] font-black uppercase leading-[0.9] ${
                        isSincereCard
                          ? "text-4xl sm:text-5xl"
                          : isBridgeCard
                            ? "text-5xl sm:text-6xl"
                            : "text-[clamp(2.2rem,10vw,3rem)] sm:text-5xl"
                      }`}
                    >
                      {currentCard.title}
                    </span>
                    {currentCard.secondLine ? (
                      <span className="text-4xl font-black uppercase leading-[0.9] sm:text-5xl">
                        {currentCard.secondLine}
                      </span>
                    ) : null}
                    {currentCard.note ? (
                      <span className="max-w-md text-xl font-bold leading-7">
                        {currentCard.note}
                      </span>
                    ) : null}
                  </>
              </div>
              <div
                className={`absolute inset-x-0 z-20 mx-auto flex w-[calc(100%-1.25rem)] max-w-xl items-center justify-between gap-3 sm:w-full top-[348px]`}
              >
                <button
                  aria-label="Previous reason"
                  className="grid size-12 place-items-center border-2 border-[var(--mac-black)] bg-white text-3xl font-black leading-none text-[var(--mac-black)] shadow-[4px_4px_0_var(--mac-accent)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
                  disabled={cardIndex === 0 || isCardSliding}
                  onClick={() => moveCard("prev")}
                  type="button"
                >
                  ←
                </button>
                <button
                  aria-label="Next reason"
                  className="grid size-12 place-items-center border-2 border-[var(--mac-black)] bg-[var(--mac-black)] text-3xl font-black leading-none text-white shadow-[4px_4px_0_var(--mac-accent)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isCardSliding}
                  onClick={advanceCard}
                  type="button"
                >
                  →
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20"
        id="field-notes"
      >
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-black uppercase tracking-[0.26em] text-[var(--mac-accent)]">
            The receipts
          </p>
          <h2 className="mt-2 text-5xl font-black uppercase leading-none text-[var(--mac-black)] sm:text-6xl">
            Here&apos;s what I&apos;ve been up to.
          </h2>
          <p className="mt-5 text-lg font-semibold leading-7">
            A few real things I&apos;ve built, sold, booked, branded, and dragged
            across the finish line. From a consumer brand to public-sector
            launches: the story, the rollout, and the follow-through.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {fieldNotes.map((note, index) => (
            <article
              className="relative grid gap-5 lg:grid-cols-[0.78fr_1.22fr]"
              key={note.title}
            >
              <div
                className={`project-intro relative border-4 border-white p-6 outline outline-4 outline-[var(--mac-black)] ${
                  note.title === "Buoy Bird" || note.title === "South of Sober"
                    ? "overflow-hidden pr-28 sm:pr-36"
                    : ""
                } ${colorClasses(note.color)}`}
              >
                <p className="font-mono text-xs font-black uppercase tracking-[0.24em] opacity-80">
                  {note.label}
                </p>
                <h3 className="mt-8 text-5xl font-black uppercase leading-none">
                  {note.title}
                </h3>
                <p className="mt-6 text-xl font-bold leading-7">
                  {note.oneLiner}
                </p>
                {note.title === "Buoy Bird" ? (
                  <a
                    className="mt-7 block border-4 border-white bg-[var(--mac-accent)] p-5 text-white shadow-[8px_8px_0_rgba(0,0,0,0.36)] transition hover:-translate-y-0.5"
                    href="https://www.instagram.com/buoybirdofficial/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="block font-mono text-xs font-black uppercase tracking-[0.2em]">
                      Start here
                    </span>
                    <span className="mt-3 block text-3xl font-black uppercase leading-[0.9]">
                      Watch the pinned Cinema by the Shore preview videos.
                    </span>
                    <span className="mt-4 inline-block border-2 border-white bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--mac-black)] shadow-[4px_4px_0_rgba(0,0,0,0.28)]">
                      @buoybirdofficial on Instagram
                    </span>
                  </a>
                ) : null}
                <div className="mt-7 flex flex-wrap gap-3">
                  {note.links.map((link) => (
                    <a
                      className="border-2 border-white bg-white px-4 py-2 text-xs font-black uppercase text-[var(--mac-black)] shadow-[4px_4px_0_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5"
                      href={link.href}
                      key={link.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                {note.title === "Buoy Bird" ? (
                  <Image
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    unoptimized
                    className="buoy-sticker buoy-sticker--bird"
                    height={844}
                    src="/portfolio/buoy-bird-sticker-b4176e37.webp"
                    width={780}
                  />
                ) : null}
                {note.title === "Konocti Climb" ? (
                  <Image
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    unoptimized
                    className="buoy-sticker konocti-climb-sticker"
                    height={750}
                    src="/portfolio/konocti-climb-sticker-e69b00a8.webp"
                    width={750}
                  />
                ) : null}
                {note.title === "South of Sober" ? (
                  <Image
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    unoptimized
                    className="buoy-sticker south-of-sober-sticker"
                    height={2000}
                    src="/portfolio/south-of-sober-sticker-a017d3fe.webp"
                    width={2000}
                  />
                ) : null}
              </div>

              <div className="relative grid gap-4 sm:grid-cols-2">
                {note.artifacts.map((artifact, artifactIndex) => {
                  const media =
                    note.title === "Buoy Bird"
                      ? buoyBirdMedia[artifactIndex]
                      : note.title === "Konocti Climb"
                        ? konoctiClimbMedia[artifactIndex]
                        : note.title === "South of Sober"
                          ? southOfSoberMedia[artifactIndex]
                      : undefined;

                  return (
                    <div
                      className={`artifact-card min-h-56 border-4 border-[var(--mac-black)] bg-white p-3 shadow-[8px_8px_0_rgba(0,0,0,0.1)] ${
                        (artifactIndex + index) % 2 === 0
                          ? "-rotate-1"
                          : "rotate-1"
                      }`}
                      key={artifact.label}
                    >
                      {media ? (
                        <ArtifactMediaFrame
                          artifactLabel={artifact.label}
                          media={media}
                        />
                      ) : (
                        <div className="flex h-40 items-center justify-center border-2 border-dashed border-[var(--mac-accent)] bg-[linear-gradient(135deg,#fff_0_32%,#eeeeeb_32%_50%,#fff_50%_70%,#f5e8df_70%)] text-center">
                          <p className="max-w-32 font-mono text-xs font-black uppercase tracking-[0.16em] text-[var(--mac-black)]">
                            {artifact.label}
                          </p>
                        </div>
                      )}
                      <p className="mt-3 text-sm font-black uppercase text-[var(--mac-accent)]">
                        {artifact.label}
                      </p>
                      <p className="mt-2 text-sm font-bold leading-5 text-[var(--ink)]">
                        {artifact.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-24"
        id="talk"
      >
        <div className="talk-card max-w-4xl border-4 border-[var(--mac-black)] bg-white p-7 shadow-[14px_14px_0_var(--mac-accent)] sm:p-10">
          <p className="font-mono text-xs font-black uppercase tracking-[0.26em] text-[var(--mac-accent)]">
            closing tab
          </p>
          <h2 className="mt-6 text-6xl font-black uppercase leading-[0.86] text-[var(--mac-black)] sm:text-7xl">
            We should probably talk.
          </h2>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-8">
            If you want the official version, it&apos;s still hiding up top in
            the can.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              className="border-2 border-[var(--mac-black)] bg-[var(--mac-orange)] px-5 py-3 text-sm font-black uppercase text-[var(--mac-black)] shadow-[5px_5px_0_var(--mac-accent)] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--mac-accent)]"
              onClick={scrollToCan}
              type="button"
            >
              Back to the can
            </button>
            <a className="contact-link" href="mailto:milesmattina@gmail.com">Email Miles ↗</a>
            <a className="contact-link" href="https://www.linkedin.com/in/milesmattina" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
      </section>

      <footer className="portfolio-footer">Miles Mattina · An independent application for MAC Energy.</footer>

      {resumeMode === "minimized" ? (
        <button
          className="fixed bottom-4 right-4 z-[70] border-4 border-[var(--mac-black)] bg-[var(--mac-orange)] px-5 py-4 text-left text-sm font-black uppercase text-[var(--mac-black)] shadow-[8px_8px_0_var(--mac-accent)] transition hover:-translate-y-1"
          onClick={openResume}
          type="button"
        >
          Resume tucked away
          <span className="block text-xs">open again</span>
        </button>
      ) : null}

      {isResumeVisible ? (
        <aside
          id="resume-viewer"
          data-mode={resumeMode}
          aria-label="Miles Mattina resume viewer"
          className={`fixed z-[80] flex flex-col border-4 border-[var(--mac-black)] bg-white shadow-[18px_18px_0_var(--mac-accent)] transition-all duration-500 ${
            resumeMode === "full"
              ? "inset-3 sm:inset-5"
              : "bottom-4 right-4 top-20 w-[calc(100vw-2rem)] lg:w-[52vw]"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-[var(--mac-black)] bg-[var(--mac-black)] px-4 py-3 text-white">
            <div>
              <p className="font-mono text-[11px] font-black uppercase tracking-[0.22em] text-[var(--mac-orange)]">
                resume can contents
              </p>
              <h3 className="text-2xl font-black uppercase leading-none">
                Miles Mattina Resume
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <a className="resume-download" href="/Miles_Mattina_Resume.pdf" download>Download PDF</a>
              <button type="button" className="resume-zoom" onClick={() => setIsResumeZoomed((zoomed) => !zoomed)}>{isResumeZoomed ? "Fit page" : "Zoom in"}</button>
              <button
                className="border-2 border-white bg-white px-3 py-2 text-xs font-black uppercase text-[var(--mac-black)] shadow-[3px_3px_0_var(--mac-accent)]"
                onClick={() =>
                  setResumeMode((mode) => (mode === "full" ? "open" : "full"))
                }
                type="button"
              >
                {resumeMode === "full" ? "Half screen" : "Full screen"}
              </button>
              <button
                className="border-2 border-white bg-[var(--mac-orange)] px-3 py-2 text-xs font-black uppercase text-[var(--mac-black)] shadow-[3px_3px_0_var(--mac-accent)]"
                onClick={() => setResumeMode("minimized")}
                type="button"
              >
                Minimize
              </button>
              <button
                className="border-2 border-white bg-[var(--mac-accent)] px-3 py-2 text-xs font-black uppercase text-white shadow-[3px_3px_0_var(--mac-orange)]"
                onClick={() => setResumeMode("closing")}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
          <div className="resume-page min-h-0 flex-1 overflow-auto bg-white" tabIndex={0} aria-label="Resume document">
            <Image src="/resume-preview.png" alt="Miles Mattina resume, original document" width={1469} height={1901} unoptimized className={`h-auto w-full ${isResumeZoomed ? "min-w-[850px]" : ""}`} />
            <p className="sr-only">{resumeText}</p>
          </div>
        </aside>
      ) : null}
    </main>
  );
}
