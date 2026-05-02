import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import Form from "./pages/Form.jsx";
import aboutImage from "./assets/images/about.png";
import landingOne from "./assets/images/landing/homepage-final.png";
import landingTwo from "./assets/images/landing/homepage-final-2.png";
import landingThree from "./assets/images/landing/homepage-final-3.png";
import {
  defaultTag,
  getTagValue,
  isPredefinedTag,
  predefinedTags,
} from "./constants/tags.js";

const deskImages = import.meta.glob("./assets/images/backgrounds/desktop/*", {
  eager: true,
});

const backgrounds = Object.entries(deskImages)
  .map(([path, module]) => ({ src: module.default, path }))
  .sort((a, b) => a.path.localeCompare(b.path));

const landingPanels = [
  {
    image: landingOne,
    eyebrow: "things left unsaid",
    title: "Welcome to home of unsaid human emotions",
    copy: "Leave a message for someone without mentioning them.",
    align: "items-start text-left",
    actions: true,
  },
  {
    image: landingTwo,
    eyebrow: "you are held here",
    title: "Don't worry, let it upon us",
    copy: "We care about you.",
    align: "items-end text-right",
  },
  {
    image: landingThree,
    eyebrow: "from Nami",
    title: "Remember, for us you matter, buddy",
    copy: "- Nami developer (Tasavvuf Gori)",
    align: "items-start text-left",
  },
];

const namiStoryLines = [
  "Some feelings don't need answers.",
  "They just need somewhere to exist.",
  "Nami is that place.",
  "No names.",
  "No conversations.",
  "No expectations.",
  "Just a moment where you can be honest without being seen.",
  "You write it.",
  "You let it go.",
];

const namiMeanings = [
  { word: "波", roman: "Nami", meaning: "wave" },
  { word: "涙", roman: "Namida", meaning: "tears" },
];

const developerLinks = [
  {
    label: "Email",
    value: "tasavvufg@gmail.com",
    href: "mailto:tasavvufg@gmail.com",
  },
  {
    label: "Instagram",
    value: "@10.186.21.208",
    href: "https://www.instagram.com/10.186.21.208/",
  },
];

function getRandomBackgroundIndex() {
  if (!backgrounds.length) return 0;
  return Math.floor(Math.random() * backgrounds.length);
}

function getBackgroundStyle(background) {
  return {
    backgroundImage: `url(${background.src})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "100% 100%",
    width: "100vw",
    height: "100dvh",
    filter: "brightness(1.12) saturate(1.08)",
  };
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M11.2 2.6a.9.9 0 0 1 1.6 0l1.85 4.06a.9.9 0 0 0 .45.45l4.3 2.02a.9.9 0 0 1 0 1.62l-4.3 2.02a.9.9 0 0 0-.45.45l-1.85 4.06a.9.9 0 0 1-1.6 0l-1.85-4.06a.9.9 0 0 0-.45-.45L4.6 10.75a.9.9 0 0 1 0-1.62l4.3-2.02a.9.9 0 0 0 .45-.45L11.2 2.6Zm7.25 12.58a.68.68 0 0 1 1.22 0l.55 1.18a.68.68 0 0 0 .33.33l1.18.55a.68.68 0 0 1 0 1.22l-1.18.55a.68.68 0 0 0-.33.33l-.55 1.18a.68.68 0 0 1-1.22 0l-.55-1.18a.68.68 0 0 0-.33-.33l-1.18-.55a.68.68 0 0 1 0-1.22l1.18-.55a.68.68 0 0 0 .33-.33l.55-1.18Z"
      />
    </svg>
  );
}

function LandingPage() {
  return (
    <main className="relative z-10 h-dvh snap-y snap-mandatory overflow-y-auto scroll-smooth bg-[#07111f]">
      <div className="fixed left-0 top-0 z-30 w-full">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 select-none">
            <h1 className="bg-linear-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-2xl font-black tracking-tight text-transparent drop-shadow-[0_8px_26px_rgba(125,211,252,0.35)]">
              Nami
            </h1>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.28em] text-cyan-50/80 shadow-inner shadow-white/10 backdrop-blur-xl">
              ( 波 )
            </span>
          </Link>
          <Link
            to="/site"
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/90 shadow-lg shadow-cyan-950/20 backdrop-blur-xl transition hover:border-cyan-100/45 hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-100/80"
          >
            Go to Site
          </Link>
        </div>
      </div>

      {landingPanels.map((panel, index) => (
        <section
          key={panel.title}
          className="relative flex min-h-dvh snap-start overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
        >
          <img
            src={panel.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_40%),linear-gradient(90deg,rgba(3,7,18,0.72),rgba(3,7,18,0.24)_48%,rgba(3,7,18,0.68))]" />
          <div className="noise-layer" />

          <div
            className={`relative mx-auto flex min-h-[calc(100dvh-12rem)] w-full max-w-6xl flex-col justify-center ${panel.align}`}
          >
            <p className="mb-4 w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-50/85 shadow-lg shadow-cyan-950/20 backdrop-blur-xl">
              {panel.eyebrow}
            </p>
            <h2 className="max-w-3xl text-4xl font-black leading-tight text-white drop-shadow-[0_16px_35px_rgba(2,6,23,0.42)] sm:text-6xl lg:text-7xl">
              {panel.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-100/85 drop-shadow-[0_10px_24px_rgba(2,6,23,0.38)] sm:text-2xl">
              {panel.copy}
            </p>

            {panel.actions && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/wish"
                  className="glass-action px-6 text-cyan-50 hover:border-cyan-100/45 hover:bg-cyan-300/25 focus:outline-none focus:ring-2 focus:ring-cyan-100/80"
                >
                  Leave a Message
                </Link>
                <Link
                  to="/site"
                  className="glass-action px-6 text-white/90 hover:border-white/40 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  Go to Site
                </Link>
                <Link
                  to="/about"
                  className="glass-action px-6 text-white/90 hover:border-white/40 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  About Nami
                </Link>
              </div>
            )}
          </div>
        </section>
      ))}
    </main>
  );
}

function AboutPage() {
  return (
    <main className="relative z-10 min-h-screen overflow-hidden px-4 pt-24 pb-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 about-current" />
      <div className="pointer-events-none absolute inset-x-0 top-24 h-40 bg-linear-to-b from-cyan-200/10 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <section className="about-section grid min-h-[calc(100dvh-8rem)] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <p className="mb-4 w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-50/85 shadow-lg shadow-cyan-950/20 backdrop-blur-xl">
              about the wave
            </p>
            <h2 className="text-4xl font-black leading-tight text-white drop-shadow-[0_16px_35px_rgba(2,6,23,0.42)] sm:text-6xl lg:text-7xl">
              A soft place for the words that stayed.
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-100/85 drop-shadow-[0_10px_24px_rgba(2,6,23,0.38)] sm:text-2xl">
              Nami was built for the quiet emotional moments that do not ask for
              replies. It lets a feeling exist, breathe, and move on like water.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/tasavvuf/Nami"
                target="_blank"
                rel="noreferrer"
                className="glass-action px-6 text-cyan-50 hover:border-cyan-100/45 hover:bg-cyan-300/25 focus:outline-none focus:ring-2 focus:ring-cyan-100/80"
              >
                Star on GitHub
              </a>
              <Link
                to="/wish"
                className="glass-action px-6 text-white/90 hover:border-white/40 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                Release a Note
              </Link>
            </div>
          </div>

          <aside className="glass-card about-float rounded-[2rem] p-[1px]">
            <div className="glass-card-inner relative overflow-hidden rounded-[1.95rem] p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent opacity-70" />
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-50/70">
                support the project
              </p>
              <h3 className="mt-4 text-3xl font-black leading-tight text-white">
                Give Nami a star if it made you feel a little less alone.
              </h3>
              <p className="mt-5 text-base font-semibold leading-7 text-slate-100/75">
                Stars help this small Indian-built corner of the internet reach
                more people who need somewhere gentle to put their feelings.
              </p>
              <a
                href="https://github.com/tasavvuf/Nami"
                target="_blank"
                rel="noreferrer"
                className="glass-action mt-7 w-full text-cyan-50 hover:border-cyan-100/45 hover:bg-cyan-300/25 focus:outline-none focus:ring-2 focus:ring-cyan-100/80"
              >
                Support on GitHub
              </a>
            </div>
          </aside>
        </section>

        <section className="about-section py-12">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <article className="glass-card rounded-[2rem] p-[1px]">
              <div className="glass-card-inner relative overflow-hidden rounded-[1.95rem] p-6 sm:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-50/70">
                  what's Nami really
                </p>
                <div className="mt-6 grid gap-4">
                  {namiMeanings.map((item) => (
                    <div
                      key={item.word}
                      className="rounded-[1.35rem] border border-white/15 bg-slate-950/25 p-5 shadow-inner shadow-white/5 backdrop-blur-xl"
                    >
                      <p className="text-5xl font-black text-white">
                        {item.word}
                      </p>
                      <p className="mt-3 text-lg font-bold text-cyan-50">
                        {item.roman}
                      </p>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100/60">
                        {item.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="glass-card rounded-[2rem] p-[1px]">
              <div className="glass-card-inner relative overflow-hidden rounded-[1.95rem] p-6 sm:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-50/70">
                  the story
                </p>
                <div className="mt-6 space-y-4">
                  {namiStoryLines.map((line, index) => (
                    <p
                      key={line}
                      className="story-line text-xl font-black leading-relaxed text-white/95 sm:text-2xl"
                      style={{ animationDelay: `${index * 90}ms` }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="about-section py-12">
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="glass-card rounded-[2rem] p-[1px] lg:col-span-2">
              <div className="glass-card-inner relative overflow-hidden rounded-[1.95rem] p-6 sm:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-50/70">
                  from the developer
                </p>
                <h3 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
                  Made by Tasavvuf, from India, for feelings that cross every
                  border.
                </h3>
                <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-100/75 sm:text-lg">
                  Nami is not trying to solve every sadness. It is trying to
                  make one honest moment feel possible. That is enough for this
                  wave to begin.
                </p>
              </div>
            </article>

            <article className="glass-card rounded-[2rem] p-[1px]">
              <div className="glass-card-inner relative overflow-hidden rounded-[1.95rem] p-6 sm:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-50/70">
                  connect
                </p>
                <div className="mt-6 grid gap-3">
                  {developerLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="rounded-[1.25rem] border border-white/15 bg-white/10 px-4 py-4 font-bold text-white/90 transition hover:border-cyan-100/45 hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-100/80"
                    >
                      <span className="block text-xs uppercase tracking-[0.22em] text-cyan-50/65">
                        {link.label}
                      </span>
                      <span className="mt-1 block break-words text-sm sm:text-base">
                        {link.value}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

function NoteReader({ notes, onHeart, onFelt, isHeart, isfelt }) {
  const { id } = useParams();
  const note = notes.find((item) => item._id === id);

  if (!note) {
    return (
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-24 pb-10 sm:px-6 lg:px-8">
        <section className="glass-card max-w-xl rounded-[2rem] p-[1px] text-center">
          <div className="glass-card-inner rounded-[1.95rem] p-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-cyan-50/70">
              Note not found
            </p>
            <h2 className="text-3xl font-black text-white">
              This note is still drifting somewhere.
            </h2>
            <Link
              to="/site"
              className="glass-action mx-auto mt-6 w-fit px-6 text-cyan-50 hover:border-cyan-100/45 hover:bg-cyan-300/25 focus:outline-none focus:ring-2 focus:ring-cyan-100/80"
            >
              Back to Notes
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen px-4 pt-24 pb-10 sm:px-6 lg:px-8">
      <article className="glass-card mx-auto max-w-4xl rounded-[2.25rem] p-[1px]">
        <div className="glass-card-inner relative overflow-hidden rounded-[2.2rem] p-6 sm:p-9 lg:p-12">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent opacity-70" />
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative mb-8 flex flex-col gap-4 border-b border-white/15 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-fit rounded-full border border-cyan-100/25 bg-cyan-100/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-50 shadow-inner shadow-white/10">
                {note.tag}
              </span>
              <time
                className="text-sm font-semibold text-slate-100/65"
                dateTime={note.createdAt}
              >
                {new Date(note.createdAt).toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <Link
              to="/site"
              className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/85 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-100/80"
            >
              Back
            </Link>
          </div>

          <p className="relative whitespace-pre-wrap break-words text-2xl font-black leading-relaxed text-white/95 drop-shadow-[0_2px_16px_rgba(2,6,23,0.28)] sm:text-3xl">
            {note.content}
          </p>

          <div className="relative mt-10 grid max-w-md grid-cols-2 gap-3 border-t border-white/15 pt-5">
            <button
              className="glass-action text-rose-50 hover:border-rose-100/45 hover:bg-rose-400/25 focus:outline-none focus:ring-2 focus:ring-rose-100/80"
              onClick={() => onHeart(note._id, isHeart ? "dislike" : "like")}
              aria-label={`Heart note. Current count ${note.heartcount}`}
            >
              <HeartIcon />
              <span>{note.heartcount}</span>
            </button>
            <button
              className="glass-action text-cyan-50 hover:border-cyan-100/45 hover:bg-cyan-300/25 focus:outline-none focus:ring-2 focus:ring-cyan-100/80"
              onClick={() => onFelt(note._id, isfelt ? "dislike" : "like")}
              aria-label={`Felt note. Current count ${note.feltCount}`}
            >
              <SparkIcon />
              <span>{note.feltCount}</span>
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const [activeBackground, setActiveBackground] = useState(() =>
    getRandomBackgroundIndex()
  );
  const [Note, setNote] = useState([]);
  const [activeTagFilter, setActiveTagFilter] = useState("All");
  const [isfelt, setFelt] = useState(false);
  const [isHeart, setHeart] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    axios
      .get("https://nami-production-35f9.up.railway.app/notes")
      .then((response) => setNote(response.data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);
  useEffect(() => {
    const id = window.setTimeout(() => {
      setActiveBackground(getRandomBackgroundIndex());
    }, 0);

    return () => window.clearTimeout(id);
  }, [location.pathname]);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const background = isAboutPage
    ? { src: aboutImage }
    : backgrounds.length
      ? backgrounds[activeBackground]
      : null;
  const filteredNotes = Note.filter((note) => {
    const tag = getTagValue(note.tag);

    if (activeTagFilter === "All") {
      return true;
    }

    if (activeTagFilter === "Other") {
      return !isPredefinedTag(tag);
    }

    if (activeTagFilter === defaultTag) {
      return tag === defaultTag || tag.toLowerCase() === "general";
    }

    return tag === activeTagFilter;
  });
  const tagFilters = ["All", ...predefinedTags, "Other"];
  
  const handleFeltCount = async (id, type) => {
    try {
      const { data } = await axios.patch(`https://nami-production-35f9.up.railway.app/notes/${id}/felt`, { type });
      setFelt(!isfelt);
      setNote((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? data : note))
      );
    } catch (error) {
      console.error("Error updating felt count:", error);
    }
  };

  const handleHeartCount = async (id, type) => {
    try {
      const { data } = await axios.patch(`https://nami-production-35f9.up.railway.app/notes/${id}/heart`, { type });
      setHeart(!isHeart);
      setNote((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? data : note))
      );
    } catch (error) {
      console.error("Error updating heart count:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#07111f] text-white antialiased">
      {!isLandingPage && (
        <div className="fixed inset-0 overflow-hidden" aria-hidden="true">
          {background && (
            <div
              key={background.src}
              className="absolute inset-0 transition-opacity duration-700"
              style={getBackgroundStyle(background)}
            />
          )}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.22),transparent_42%),linear-gradient(180deg,rgba(4,12,27,0.24),rgba(3,7,18,0.72))]" />
          <div className="glow-orb glow-orb-cyan" />
          <div className="glow-orb glow-orb-fuchsia" />
          <div className="glow-orb glow-orb-emerald" />
          <div className="noise-layer" />
        </div>
      )}

      {!isLandingPage && (
        <header className="fixed left-0 top-0 z-50 w-full border-b border-white/15 bg-slate-950/25 shadow-[0_18px_60px_rgba(2,6,23,0.28)] backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-3 select-none">
              <h1 className="bg-linear-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-2xl font-black tracking-tight text-transparent drop-shadow-[0_8px_26px_rgba(125,211,252,0.35)]">
                Nami
              </h1>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.28em] text-cyan-50/80 shadow-inner shadow-white/10 backdrop-blur-xl">
                ( 波 )
              </span>
            </Link>

            <nav className="hidden items-center gap-2 text-sm font-medium text-slate-200 md:flex">
              <NavLink
                to="/site"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/80 ${
                    isActive ? "bg-white/15 text-white" : ""
                  }`
                }
              >
                Notes
              </NavLink>
              <NavLink
                to="/wish"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/80 ${
                    isActive ? "bg-white/15 text-white" : ""
                  }`
                }
              >
                Add Note
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/80 ${
                    isActive ? "bg-white/15 text-white" : ""
                  }`
                }
              >
                About
              </NavLink>
            </nav>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-200/80"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {isMobileMenuOpen && (
            <nav className="md:hidden border-t border-white/15 bg-slate-950/50 backdrop-blur-xl">
              <div className="mx-auto max-w-6xl px-4 py-3 space-y-1 sm:px-6 lg:px-8">
                <NavLink
                  to="/site"
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-200/80 ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  Notes
                </NavLink>
                <NavLink
                  to="/wish"
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-200/80 ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  Add Note
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-200/80 ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  About
                </NavLink>
              </div>
            </nav>
          )}
        </header>
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/site"
          element={
            <main
              id="notes"
              className="relative z-10 min-h-screen px-4 pt-24 pb-10 sm:px-6 lg:px-8"
            >
              <div className="mx-auto max-w-6xl">
                <section className="mb-8 max-w-2xl">
                  <p className="mb-3 w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-50/85 shadow-lg shadow-cyan-950/20 backdrop-blur-xl">
                  things left unsaid
                  </p>
                  <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] text-white drop-shadow-[0_16px_35px_rgba(2,6,23,0.35)] sm:text-4xl md:text-5xl lg:text-6xl">
                   You couldn't say it. So you left it here.

                  </h2>
                </section>

                <section
                  className="mb-7"
                  aria-label="Filter notes by tag"
                >
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {tagFilters.map((filter) => {
                      const isActive = activeTagFilter === filter;

                      return (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setActiveTagFilter(filter)}
                          className={`rounded-full border px-2.5 py-1.5 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-cyan-100/80 sm:px-4 sm:py-2 ${
                            isActive
                              ? "border-cyan-100/55 bg-cyan-200/25 text-white shadow-inner shadow-white/10"
                              : "border-white/15 bg-white/10 text-cyan-50/80 hover:border-white/35 hover:bg-white/15"
                          }`}
                        >
                          {filter}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <div className="grid auto-rows-max grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {filteredNotes.map((note) => (
                    <article
                      key={note._id}
                      role="button"
                      tabIndex={0}
                      className="glass-card group flex h-fit min-h-52 cursor-pointer flex-col gap-5 rounded-[1.75rem] p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-100/80"
                      onClick={() => navigate(`/notes/${note._id}`)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          navigate(`/notes/${note._id}`);
                        }
                      }}
                    >
                      <div className="glass-card-inner relative flex min-h-52 flex-1 flex-col justify-between overflow-hidden rounded-[1.7rem] p-5 sm:p-6">
                        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent opacity-70" />
                        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl transition duration-300 group-hover:bg-cyan-200/30" />

                        <div className="relative flex-1">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <span className="w-fit rounded-full border border-cyan-100/25 bg-cyan-100/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-50 shadow-inner shadow-white/10">
                              {note.tag}
                            </span>
                            <time
                              className="text-xs font-medium text-slate-100/65"
                              dateTime={note.createdAt}
                            >
                              {new Date(note.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </time>
                          </div>
                          <p className="note-preview break-words text-lg font-bold leading-relaxed text-white/95 drop-shadow-[0_2px_16px_rgba(2,6,23,0.28)]">
                            {note.content}
                          </p>
                        </div>

                        <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-white/15 pt-4">
                          <button
                            className="glass-action text-rose-50 hover:border-rose-100/45 hover:bg-rose-400/25 focus:outline-none focus:ring-2 focus:ring-rose-100/80"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleHeartCount(
                                note._id,
                                isHeart ? "dislike" : "like"
                              );
                            }}
                            aria-label={`Heart note. Current count ${note.heartcount}`}
                          >
                            <HeartIcon />
                            <span>{note.heartcount}</span>
                          </button>
                          <button
                            className="glass-action text-cyan-50 hover:border-cyan-100/45 hover:bg-cyan-300/25 focus:outline-none focus:ring-2 focus:ring-cyan-100/80"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleFeltCount(
                                note._id,
                                isfelt ? "dislike" : "like"
                              );
                            }}
                            aria-label={`Felt note. Current count ${note.feltCount}`}
                          >
                            <SparkIcon />
                            <span>{note.feltCount}</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {!filteredNotes.length && (
                  <section className="glass-card mt-6 rounded-[1.75rem] p-[1px]">
                    <div className="glass-card-inner relative overflow-hidden rounded-[1.7rem] p-6 text-center">
                      <p className="text-base font-bold text-cyan-50/85">
                        No notes found for this tag.
                      </p>
                    </div>
                  </section>
                )}
              </div>
            </main>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <NoteReader
              notes={Note}
              onHeart={handleHeartCount}
              onFelt={handleFeltCount}
              isHeart={isHeart}
              isfelt={isfelt}
            />
          }
        />
        <Route
          path="/wish"
          element={
            <main className="relative z-10 min-h-screen px-4 pt-24 pb-10 sm:px-6 lg:px-8">
              <Form onCreated={(newNote) => setNote((notes) => [newNote, ...notes])} />
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
