import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FaBars,
  FaBookOpen,
  FaBrain,
  FaExternalLinkAlt,
  FaFlask,
  FaIndustry,
  FaServer,
  FaTimes,
  FaUserPlus,
} from "react-icons/fa";
import ThemedLogo from "./ThemedLogo";
import ShellLink from "./ShellLink";
import { useLanguage } from "../../i18n/useLanguage";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // Below lg (1024) the sections and the lab sites live in a menu that drops
  // out of the bar: five icons without labels did not say where they led.
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const reducedMotion = useReducedMotion();
  const location = useLocation();
  const { pick } = useLanguage();

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Shrink the bar slightly once scrolled. (To make the bar hide entirely past a
  // scroll threshold on a specific route, see wiki/navbar-scroll-hide.md.)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const labSites = [
    { initials: "TUC", to: "/tuc", title: "TU Clausthal lab", place: "Clausthal" },
    {
      initials: "MDS",
      href: "https://www.mds-lab.de/",
      title: "MDS Lab, Rostock",
      place: "Rostock",
    },
    { initials: "UBB", to: "/ubb", title: "CORE Cluj, Babeș-Bolyai University", place: "Cluj-Napoca" },
  ];

  const navItems = [
    {
      to: "/publications",
      label: "Publications",
      labelDe: "Publikationen",
      icon: FaBookOpen,
      isActive: location.pathname === "/publications",
    },
    {
      to: "/industry-projects",
      label: "Industry Projects",
      labelDe: "Industrieprojekte",
      icon: FaIndustry,
      isActive: location.pathname.startsWith("/industry-projects"),
    },
    {
      to: "/core-labs",
      label: "CORE Labs",
      icon: FaFlask,
      isActive: location.pathname.startsWith("/core-labs"),
    },
    {
      to: "/ai-team-projects",
      label: "AI Team Projects",
      labelDe: "AI-Team-Projekte",
      icon: FaBrain,
      isActive: location.pathname.startsWith("/ai-team-projects"),
    },
    {
      to: "/compute-cluster",
      label: "Compute Cluster",
      labelDe: "Rechencluster",
      icon: FaServer,
      isActive: location.pathname === "/compute-cluster",
    },
  ];

  return (
    <>
    {/* Tapping beside the open menu closes it. Outside the header, because the
        header is transformed and would trap a fixed child inside its own box. */}
    {menuOpen && (
      <div
        className="fixed inset-0 z-[59] bg-slate-950/40 lg:hidden"
        onClick={closeMenu}
        aria-hidden="true"
      />
    )}
    <header
      className={`fixed inset-x-3 top-3 z-[60] mx-auto max-w-[94rem] transition-all duration-300 sm:inset-x-5 sm:top-4 ${
        isScrolled ? "scale-[0.985] opacity-100" : "scale-100 opacity-100"
      }`}
    >
      <div className="flex h-[3.75rem] items-center gap-2 rounded-[1.5rem] border border-white/90 bg-white/90 p-2.5 shadow-[0_18px_55px_-24px_rgba(15,23,42,0.34)] backdrop-blur-xl sm:h-[4.5rem] sm:gap-4 sm:p-3"
        // The viewTransitionNames in this bar pair its parts with the lab
        // header's (LabHeader.jsx), so they morph on the way to a lab site.
        style={{ viewTransitionName: "shell-header" }}
      >
        <Link
          to="/"
          onClick={closeMenu}
          style={{ viewTransitionName: "shell-logo" }}
          aria-label="CORE Network home"
          className="flex h-full w-14 shrink-0 items-center justify-center rounded-2xl transition hover:bg-slate-50 sm:w-[7.5rem] 2xl:w-[9rem]"
        >
          <ThemedLogo
            name="core"
            alt="CORE Network"
            className="h-9 max-w-[3.25rem] object-contain sm:h-12 sm:max-w-[6.75rem]"
          />
        </Link>

        <div
          className="hidden h-10 w-px shrink-0 bg-slate-200 lg:block"
          aria-hidden="true"
        />

        <div className="flex-1 lg:hidden" aria-hidden="true" />

        <nav className="relative hidden h-full min-w-0 flex-1 items-center justify-center overflow-hidden rounded-[1.4rem] border border-slate-700/40 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 px-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_-18px_rgba(15,23,42,0.9)] sm:px-3 lg:flex"
          style={{ viewTransitionName: "shell-nav" }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                title={pick(item.label, item.labelDe ?? item.label)}
                aria-label={pick(item.label, item.labelDe ?? item.label)}
                className={`group relative flex h-full min-w-0 flex-1 items-center justify-center gap-2 px-0 text-xs font-semibold whitespace-nowrap transition-colors duration-200 sm:gap-2.5 sm:px-2 sm:text-sm lg:flex-auto lg:px-1.5 lg:text-[12.5px] xl:gap-2 xl:text-[13px] 2xl:gap-2.5 2xl:px-3 2xl:text-[15px] ${
                  item.isActive
                    ? "text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {/* What shows per width, so five items always fit beside the
                    logo, the Join Us button and the lab pills:
                      below lg (1024)  not in the bar: see the menu below
                      lg to xl         label only, small
                      xl (1280) up     icon and label
                    Items size to their label from lg up (flex-auto): equal
                    widths made the long labels run into their neighbours. */}
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors sm:h-[1.1rem] sm:w-[1.1rem] lg:hidden xl:block ${
                    item.isActive
                      ? "text-primary-400"
                      : "text-slate-300 group-hover:text-primary-300"
                  }`}
                  aria-hidden="true"
                />
                <span className="hidden lg:inline">
                  {pick(item.label, item.labelDe ?? item.label)}
                </span>
                {item.isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 h-[3px] w-6 rounded-t-full bg-primary-400 shadow-[0_-2px_12px_rgba(74,222,128,0.42)] sm:w-16"
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/join-us"
          onClick={closeMenu}
          style={{ viewTransitionName: "shell-join" }}
          aria-label={pick("Join Us", "Mitmachen")}
          title={pick("Join Us", "Mitmachen")}
          className="flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full border border-primary-700 text-sm font-semibold whitespace-nowrap text-primary-700 transition hover:bg-primary-700 hover:text-white min-[360px]:w-auto min-[360px]:px-3.5 sm:px-4 lg:w-10 lg:px-0 xl:w-auto xl:px-4"
        >
          <FaUserPlus className="h-4 w-4 shrink-0" aria-hidden="true" />
          {/* Icon only from lg to xl, where the nav labels need the room, and
              on the narrowest phones. */}
          <span className="hidden min-[360px]:inline lg:hidden xl:inline">{pick("Join Us", "Mitmachen")}</span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-slate-700/40 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 px-3.5 text-sm font-semibold text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:px-4 lg:hidden"
        >
          {menuOpen ? (
            <FaTimes className="h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" />
          ) : (
            <FaBars className="h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" />
          )}
          {/* The label stays put while the icon changes: a longer word here
              would push the bar wider than a phone screen in German. */}
          {pick("Menu", "Menü")}
        </button>

        <div
          className="hidden h-10 w-px shrink-0 bg-slate-200 lg:block"
          aria-hidden="true"
        />

        <div
          className="hidden h-10 shrink-0 items-center rounded-full border border-slate-200/80 bg-slate-50/80 p-0.5 px-1 lg:flex"
          style={{ viewTransitionName: "shell-labs" }}
          aria-label="Lab sites"
        >
          {labSites.map((lab) => {
            // No pill is highlighted: this navbar only shows on the network
            // site, where none of the labs is the current one. (A lab's own
            // header, LabHeader.jsx, marks that lab.)
            const cls =
              "flex h-8 min-w-12 flex-1 items-center justify-center rounded-full px-3 text-xs font-semibold tracking-wide text-slate-600 transition duration-200 hover:bg-white hover:text-slate-900";
            return lab.to ? (
              <ShellLink
                key={lab.initials}
                to={lab.to}
                title={lab.title}
                aria-label={lab.title}
                className={cls}
              >
                {lab.initials}
              </ShellLink>
            ) : (
              <a
                key={lab.initials}
                href={lab.href}
                target="_blank"
                rel="noreferrer"
                title={lab.title}
                aria-label={lab.title}
                className={cls}
              >
                {lab.initials}
              </a>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[1.5rem] border border-white/90 bg-white p-2.5 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.5)] lg:hidden"
          >
            <nav aria-label={pick("Sections", "Bereiche")}>
              <ul>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={closeMenu}
                        aria-current={item.isActive ? "page" : undefined}
                        className={`flex items-center gap-3 rounded-2xl px-2.5 py-2.5 text-[15px] font-semibold transition-colors ${
                          item.isActive
                            ? "bg-primary-50 text-primary-800"
                            : "text-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            item.isActive
                              ? "bg-primary-100 text-primary-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        {pick(item.label, item.labelDe ?? item.label)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-2 border-t border-slate-200 px-2.5 pt-3 pb-1">
              <p className="text-xs font-semibold text-slate-500">
                {pick("Lab sites", "Seiten der Labs")}
              </p>
              <ul className="mt-2 grid grid-cols-3 gap-2">
                {labSites.map((lab) => {
                  const cls =
                    "flex h-full flex-col rounded-2xl border border-slate-200 px-3 py-2.5 transition-colors hover:border-primary-300 hover:bg-slate-50";
                  const body = (
                    <>
                      <span className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                        {lab.initials}
                        {lab.href && (
                          <FaExternalLinkAlt className="h-2.5 w-2.5 text-slate-500" aria-hidden="true" />
                        )}
                      </span>
                      <span className="mt-0.5 text-xs text-slate-600">{lab.place}</span>
                    </>
                  );
                  return (
                    <li key={lab.initials}>
                      {lab.to ? (
                        <ShellLink to={lab.to} onClick={closeMenu} aria-label={lab.title} className={cls}>
                          {body}
                        </ShellLink>
                      ) : (
                        <a href={lab.href} target="_blank" rel="noreferrer" aria-label={lab.title} className={cls}>
                          {body}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
};

export default Navbar;
