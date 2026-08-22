import {
  FaCheckCircle,
  FaCode,
  FaCogs,
  FaExternalLinkAlt,
  FaFolderOpen,
  FaPlayCircle,
} from "react-icons/fa";
import LazyVideo from "../common/LazyVideo";
import assetUrl from "../../utils/assetUrl";
import { useLanguage } from "../../i18n/useLanguage";

const FinishedProjectContent = ({
  showcase,
  summary,
  focus = [],
  artifacts = [],
  benchmark,
  materialTitle = "Project materials",
  materialBody = "Open the submitted project material.",
  materialHref,
  materialLabel = "Open material",
  materialIcon = "folder",
  showMaterial = true,
  showShowcase = true,
  showDetails = true,
}) => {
  const { pick } = useLanguage();
  const MaterialIcon =
    materialIcon === "github"
      ? FaCode
      : materialIcon === "video"
        ? FaPlayCircle
        : FaFolderOpen;
  const mediaUrl = (src) => {
    if (!src) return undefined;
    return /^https?:\/\//i.test(src) ? src : assetUrl(src);
  };
  const isMediaOnly = Boolean(showcase?.mediaOnly);

  return (
    <div
      className={`space-y-8 ${isMediaOnly ? "pt-1" : "border-t border-gray-100 pt-6"}`}
    >
      {showShowcase && showcase && (
        <section
          className={`relative mx-auto w-full overflow-hidden border text-white ${isMediaOnly ? "max-w-6xl rounded-[2rem] border-white/80 bg-white/70 p-2.5 shadow-[0_28px_80px_-58px_rgba(15,23,42,0.55)] backdrop-blur-sm sm:p-3" : "max-w-6xl rounded-2xl border-slate-200 bg-slate-950 shadow-xl shadow-slate-200/70"}`}
        >
          {showcase.backgroundImage && (
            <div className="absolute inset-0" aria-hidden="true">
              <img
                src={mediaUrl(showcase.backgroundImage)}
                alt=""
                className="h-full w-full scale-105 object-cover opacity-100 blur-[2px]"
              />
              <div className="absolute inset-0 bg-slate-950/55" />
            </div>
          )}

          <div
            className={
              isMediaOnly
                ? "relative"
                : "relative grid gap-0 lg:grid-cols-[0.9fr_1.1fr]"
            }
          >
            {!isMediaOnly && (
              <div className="relative p-6 sm:p-8 lg:p-10">
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(34,197,94,0.18),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0),rgba(15,23,42,0.72))]"
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="mb-7 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/15 text-primary-300 ring-1 ring-primary-400/30">
                      <FaPlayCircle className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-base font-black leading-tight">
                        {showcase.title}
                      </p>
                      <p className="text-xs font-semibold text-slate-300">
                        {showcase.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs font-black uppercase tracking-widest text-primary-300">
                    {showcase.eyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                    {showcase.heading}
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
                    {showcase.body}
                  </p>
                </div>
              </div>
            )}

            <div
              className={`flex items-center ${isMediaOnly ? "" : `p-3 sm:p-4 lg:min-h-[34rem] ${showcase.backgroundImage ? "bg-slate-950/25 backdrop-blur-[2px]" : "bg-slate-900"}`}`}
            >
              <div
                className={`w-full overflow-hidden ${isMediaOnly ? "aspect-video rounded-[1.4rem] border border-slate-200/70 bg-white shadow-[0_18px_50px_-38px_rgba(15,23,42,0.55)] sm:aspect-[21/9]" : "rounded-xl border border-white/10 bg-black shadow-2xl shadow-black/20"}`}
              >
                {showcase.videoSrc ? (
                  <LazyVideo
                    src={mediaUrl(showcase.videoSrc)}
                    poster={mediaUrl(showcase.poster)}
                    controls
                    autoPlay
                    muted
                    loop
                    className={
                      isMediaOnly
                        ? `h-full w-full ${showcase.mediaFit === "contain" ? "object-contain" : "object-cover"}`
                        : "aspect-video w-full object-cover"
                    }
                  />
                ) : showcase.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${showcase.youtubeId}?rel=0&autoplay=1&mute=1&loop=1&playlist=${showcase.youtubeId}`}
                    title={showcase.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={
                      isMediaOnly ? "h-full w-full" : "aspect-video w-full"
                    }
                  />
                ) : showcase.imageSrc ? (
                  <img
                    src={mediaUrl(showcase.imageSrc)}
                    alt={showcase.imageAlt || showcase.title}
                    loading="lazy"
                    decoding="async"
                    className={
                      isMediaOnly
                        ? "h-full w-full object-cover"
                        : "aspect-video w-full object-cover"
                    }
                  />
                ) : (
                  (showcase.driveId || showcase.embedUrl) && (
                    <iframe
                      src={
                        showcase.embedUrl ||
                        `https://drive.google.com/file/d/${showcase.driveId}/preview?autoplay=1`
                      }
                      title={showcase.title}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      className={
                        isMediaOnly ? "h-full w-full" : "aspect-video w-full"
                      }
                    />
                  )
                )}
              </div>
            </div>
          </div>
          {isMediaOnly && showcase.caption && (
            <p className="relative px-3 pb-1 pt-3 text-center text-xs font-semibold leading-5 text-slate-500 sm:px-5">
              {showcase.caption}
            </p>
          )}
        </section>
      )}

      {benchmark && (
        <section className="mx-auto max-w-6xl border-y border-gray-200 py-6">
          <div className="grid gap-6 lg:grid-cols-[30rem_1fr] lg:items-center">
            <figure className="mx-auto w-full max-w-[30rem] lg:mx-0">
              <img
                src={mediaUrl(benchmark.image.src)}
                alt={benchmark.image.alt}
                width={benchmark.image.width}
                height={benchmark.image.height}
                decoding="async"
                className="h-auto w-full rounded-lg border border-gray-800 bg-black"
              />
              {benchmark.image.caption && (
                <figcaption className="mt-2 flex gap-2 border-l-2 border-primary-300 pl-3 text-xs italic leading-5 text-gray-500">
                  <span className="shrink-0 font-mono font-bold not-italic uppercase text-primary-700">
                    {pick("Figure", "Abbildung")}
                  </span>
                  <span>{benchmark.image.caption}</span>
                </figcaption>
              )}
            </figure>

            <div className="px-1 py-2">
              <p className="text-xs font-black uppercase tracking-widest text-primary-600">
                {benchmark.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-black leading-tight text-gray-950">
                {benchmark.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {benchmark.description}
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4">
                {benchmark.highlights.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-base font-black text-gray-950">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {showDetails && (
        <section
          className={`mx-auto grid max-w-6xl ${isMediaOnly ? "gap-6 lg:grid-cols-[1.15fr_0.85fr]" : "gap-5 lg:grid-cols-[1.25fr_0.9fr]"}`}
        >
          <div
            className={
              isMediaOnly
                ? "rounded-[2rem] border border-slate-200/70 bg-white/75 p-7 shadow-[0_24px_70px_-55px_rgba(15,23,42,0.5)] backdrop-blur-sm sm:p-8"
                : "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-slate-100/80"
            }
          >
            <h3 className="text-2xl font-bold leading-tight text-gray-950">
              {summary.title}
            </h3>
            {summary.paragraphs.map((paragraph, index) => (
              <p
                key={typeof paragraph === "string" ? paragraph : index}
                className="mt-4 text-base leading-7 text-gray-600"
              >
                {paragraph}
              </p>
            ))}
            {summary.image && (
              <figure className="mt-6">
                <img
                  src={mediaUrl(summary.image.src)}
                  alt={summary.image.alt}
                  width={summary.image.width}
                  height={summary.image.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-video w-full rounded-lg border border-gray-200 bg-white object-contain"
                />
                {summary.image.caption && (
                  <figcaption className="mt-2 flex gap-2 border-l-2 border-primary-300 pl-3 text-xs italic leading-5 text-gray-500">
                    <span className="shrink-0 font-mono font-bold not-italic uppercase text-primary-700">
                      {pick("Figure", "Abbildung")}
                    </span>
                    <span>{summary.image.caption}</span>
                  </figcaption>
                )}
              </figure>
            )}
          </div>

          <div className="grid gap-5">
            <div
              className={
                isMediaOnly
                  ? "rounded-[2rem] border border-slate-200/70 bg-white/75 p-7 shadow-[0_24px_70px_-55px_rgba(15,23,42,0.5)] backdrop-blur-sm"
                  : "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-slate-100/80"
              }
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-primary-600">
                  {pick("Technical focus", "Technischer Fokus")}
                </h4>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                  <FaCode className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm shadow-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={
                isMediaOnly
                  ? "rounded-[2rem] border border-slate-200/70 bg-white/75 p-7 shadow-[0_24px_70px_-55px_rgba(15,23,42,0.5)] backdrop-blur-sm"
                  : "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-slate-100/80"
              }
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-primary-600">
                  {pick("Implementation details", "Implementierungsdetails")}
                </h4>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 ring-1 ring-primary-100">
                  <FaCogs className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
              <ul className="space-y-3">
                {artifacts.map((item, index) => (
                  <li
                    key={typeof item === "string" ? item : index}
                    className="flex gap-3 text-sm font-semibold leading-6 text-gray-700"
                  >
                    <FaCheckCircle
                      className="mt-1 h-4 w-4 shrink-0 text-primary-600"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {showMaterial && (
        <section className="mx-auto max-w-6xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm shadow-slate-100/80">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-700 ring-1 ring-gray-200">
                <MaterialIcon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-950">
                  {materialTitle}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                  {materialBody}
                </p>
              </div>
            </div>

            {materialHref && (
              <a
                href={materialHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gray-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black hover:shadow-md"
              >
                {materialLabel}
                <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" />
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default FinishedProjectContent;
