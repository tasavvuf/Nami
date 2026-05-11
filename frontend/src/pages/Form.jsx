import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { defaultTag, getTagValue, predefinedTags } from "../constants/tags.js";

const API_BASE_URL = "https://nami-production-35f9.up.railway.app";

function Form({ onCreated }) {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState(defaultTag);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedNote, setSubmittedNote] = useState(null);
  const [matchingNote, setMatchingNote] = useState(null);
  const navigate = useNavigate();

  const handleReset = () => {
    setContent("");
    setTag(defaultTag);
    setStatus("");
    setError("");
    setSubmittedNote(null);
    setMatchingNote(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedContent = content.trim();
    const trimmedTag = getTagValue(tag);
    if (!trimmedContent) {
      setError("Please write something before sending your wish.");
      setStatus("");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      setStatus("");
      setSubmittedNote(null);
      setMatchingNote(null);

      const { data } = await axios.post(`${API_BASE_URL}/wish`, {
        content: trimmedContent,
        tag: trimmedTag,
      });

      onCreated?.(data);
      setSubmittedNote(data);
      setStatus("Wish added successfully.");

      try {
        const { data: relatedNotes } = await axios.get(`${API_BASE_URL}/notes`, {
          params: {
            tag: trimmedTag,
            limit: 1,
            random: true,
            excludeId: data._id,
          },
        });

        setMatchingNote(
          Array.isArray(relatedNotes) ? relatedNotes[0] ?? null : null
        );
      } catch (relatedNotesError) {
        console.error("Error fetching related note:", relatedNotesError);
      }
    } catch (submitError) {
      setError(
        submitError.response?.data?.message ||
          "Something went wrong while sending your wish."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedNote) {
    return (
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="min-w-0 max-w-xl">
          <p className="mb-3 w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-50/85 shadow-lg shadow-cyan-950/20 backdrop-blur-xl">
            your note is in the wave
          </p>
          <h2 className="break-words text-[clamp(2rem,8vw,4.2rem)] font-black leading-[0.98] tracking-[-0.05em] text-white drop-shadow-[0_16px_35px_rgba(2,6,23,0.35)]">
            Someone else left something under this feeling too.
          </h2>
          <p className="mt-5 text-base font-medium leading-7 text-slate-100/75 sm:leading-8">
            Your note was posted. Here&apos;s one other message from the same tag,
            chosen at random, without showing your own back to you.
          </p>
        </section>

        <section className="glass-card min-w-0 rounded-[2rem] p-[1px]">
          <div className="glass-card-inner relative overflow-hidden rounded-[1.95rem] p-5 sm:p-7">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent opacity-70" />
            <div className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />

            {status && (
              <p className="relative rounded-2xl border border-emerald-200/25 bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-emerald-50">
                {status}
              </p>
            )}

            <div className="relative mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-cyan-100/25 bg-cyan-100/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-50 shadow-inner shadow-white/10">
                {submittedNote.tag}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-100/60">
                Random note from the same tag
              </span>
            </div>

            {matchingNote ? (
              <article className="relative mt-5 rounded-[1.6rem] border border-white/15 bg-slate-950/25 p-5 shadow-inner shadow-black/15 backdrop-blur-xl">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-cyan-100/25 bg-cyan-100/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-50 shadow-inner shadow-white/10">
                    {matchingNote.tag}
                  </span>
                  <time
                    className="text-xs font-medium text-slate-100/65"
                    dateTime={matchingNote.createdAt}
                  >
                    {new Date(matchingNote.createdAt).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </time>
                </div>
                <p className="whitespace-pre-wrap break-words text-base font-bold leading-7 text-white/95 sm:text-lg sm:leading-relaxed">
                  {matchingNote.content}
                </p>
              </article>
            ) : (
              <div className="relative mt-5 rounded-[1.6rem] border border-white/15 bg-slate-950/25 px-5 py-6 text-sm font-semibold leading-7 text-slate-100/78 shadow-inner shadow-black/15 backdrop-blur-xl">
                No other notes are available in this tag yet, so yours is the
                first one drifting there for now.
              </div>
            )}

            <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleReset}
                className="glass-action flex-1 text-cyan-50 hover:border-cyan-100/45 hover:bg-cyan-300/25 focus:outline-none focus:ring-2 focus:ring-cyan-100/80"
              >
                write another note
              </button>
              <button
                type="button"
                onClick={() => navigate("/site")}
                className="glass-action flex-1 text-white/90 hover:border-white/40 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                view all notes
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="min-w-0 max-w-xl">
        <p className="mb-3 w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-50/85 shadow-lg shadow-cyan-950/20 backdrop-blur-xl">
          we care of you
        </p>
        <h2 className="break-words text-[clamp(2rem,8vw,4.4rem)] font-black leading-[0.98] tracking-[-0.05em] text-white drop-shadow-[0_16px_35px_rgba(2,6,23,0.35)]">
          Write a note, let it upon us (Nami).
        </h2>
        <p className="mt-5 text-base font-medium leading-7 text-slate-100/75 sm:leading-8">
          It won&apos;t go to them. But it&apos;ll go somewhere. And that&apos;s
          enough. Remember, for us you matter, buddy.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="glass-card min-w-0 rounded-[2rem] p-[1px]"
      >
        <div className="glass-card-inner relative overflow-hidden rounded-[1.95rem] p-5 sm:p-7">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent opacity-70" />
          <div className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />

          <label
            htmlFor="wish-content"
            className="relative block text-sm font-bold uppercase tracking-[0.22em] text-cyan-50/80"
          >
            Content
          </label>
          <textarea
            id="wish-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your note here..."
            rows={8}
            className="relative mt-4 min-h-48 w-full resize-y rounded-[1.35rem] border border-white/15 bg-slate-950/25 px-4 py-4 text-base font-semibold leading-7 text-white/95 shadow-inner shadow-black/15 outline-none backdrop-blur-xl transition placeholder:text-slate-200/45 focus:border-cyan-100/55 focus:ring-2 focus:ring-cyan-100/70 sm:px-5 sm:leading-8"
          />

          <div className="relative mt-6">
            <label
              htmlFor="wish-tag"
              className="block text-sm font-bold uppercase tracking-[0.22em] text-cyan-50/80"
            >
              Tag
            </label>
            <input
              id="wish-tag"
              list="wish-tag-suggestions"
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              placeholder="Choose a tag or write your own"
              className="mt-4 w-full rounded-[1.35rem] border border-white/15 bg-slate-950/25 px-4 py-3 text-base font-semibold text-white/95 shadow-inner shadow-black/15 outline-none backdrop-blur-xl transition placeholder:text-slate-200/45 focus:border-cyan-100/55 focus:ring-2 focus:ring-cyan-100/70 sm:px-5"
            />
            <datalist id="wish-tag-suggestions">
              {predefinedTags.map((suggestion) => (
                <option key={suggestion} value={suggestion} />
              ))}
            </datalist>

            <div className="mt-3 flex flex-wrap gap-2">
              {predefinedTags.map((suggestion) => {
                const isSelected = tag === suggestion;

                return (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setTag(suggestion)}
                    className={`min-h-11 rounded-full border px-3 py-2 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-cyan-100/80 ${
                      isSelected
                        ? "border-cyan-100/55 bg-cyan-200/25 text-white shadow-inner shadow-white/10"
                        : "border-white/15 bg-white/10 text-cyan-50/80 hover:border-white/35 hover:bg-white/15"
                    }`}
                  >
                    {suggestion}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <p className="relative mt-4 rounded-2xl border border-rose-200/25 bg-rose-500/15 px-4 py-3 text-sm font-semibold text-rose-50">
              {error}
            </p>
          )}
          {status && (
            <p className="relative mt-4 rounded-2xl border border-emerald-200/25 bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-emerald-50">
              {status}
            </p>
          )}

          <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="glass-action flex-1 text-cyan-50 hover:border-cyan-100/45 hover:bg-cyan-300/25 focus:outline-none focus:ring-2 focus:ring-cyan-100/80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "post note to nami"}
            </button>
            <Link
              to="/site"
              className="glass-action flex-1 text-white/90 hover:border-white/40 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              View Notes
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
