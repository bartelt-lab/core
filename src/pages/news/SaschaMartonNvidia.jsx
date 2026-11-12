import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { formatNewsDate, saschaMartonNvidia as article } from '../../data/news'
import { getMemberBySlug } from '../../data/team'
import useInstitution from '../../hooks/useInstitution'
import { useLanguage } from '../../i18n/useLanguage'
import assetUrl from '../../utils/assetUrl'
import { withInstitution as applyInstitution } from '../../utils/institutions'

const sascha = getMemberBySlug('marton')
const bartelt = getMemberBySlug('bartelt')
const textLink = 'text-primary-700 underline decoration-primary-200 underline-offset-4 hover:decoration-primary-700 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700'

export default function SaschaMartonNvidia() {
  const { pick, language } = useLanguage()
  const { withInstitution } = useInstitution()

  return (
    <article className="min-h-screen bg-white pb-20 pt-32 text-slate-950 md:pb-28 md:pt-40">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <Link
          to={withInstitution('/#news')}
          className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700"
        >
          <FaArrowLeft className="h-3 w-3" aria-hidden="true" />
          {pick('Back to news', 'Zurück zu Aktuelles')}
        </Link>

        <header className="mt-10 border-b border-slate-200 pb-10 md:mt-12 md:pb-12">
          <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_12rem] md:gap-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
            <div>
              <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                <time dateTime={article.date}>{formatNewsDate(article.date, language)}</time>
                <span>TU Clausthal</span>
              </div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {pick(article.title.en, article.title.de)}
              </h1>
            </div>
            <figure className="w-40 md:w-full">
              <img
                src={assetUrl(article.image)}
                alt={pick(article.imageAlt.en, article.imageAlt.de)}
                width="600"
                height="600"
                decoding="async"
                className="aspect-square w-full object-contain"
              />
            </figure>
          </div>
        </header>

        <div className="mt-10 max-w-[70ch] space-y-6 text-base leading-8 text-slate-700 sm:text-lg sm:leading-8">
          <p className="text-lg leading-8 text-slate-950 sm:text-xl sm:leading-9">
            {pick(
              <>Dr. <a className={textLink} href={sascha.links.scholar}>Sascha Marton</a> joins NVIDIA in November 2026. He will research tabular foundation models: pretrained AI models that open up new ways to apply machine learning to data stored in tables.</>,
              <>Dr. <a className={textLink} href={sascha.links.scholar}>Sascha Marton</a> wechselt im November 2026 zu NVIDIA. Dort wird er an Tabular Foundation Models forschen: vortrainierten KI-Modellen, die neue Möglichkeiten für maschinelles Lernen auf tabellarischen Daten eröffnen.</>,
            )}
          </p>

          <p>
            {pick(
              <>During his doctorate in Prof. Dr. Christian Bartelt’s AI Systems Engineering group at the University of Mannheim, Marton studied how to bring decision trees and deep learning together. His work led to methods including <a className={textLink} href="https://ojs.aaai.org/index.php/AAAI/article/view/29345">GradTree</a> and <a className={textLink} href="https://openreview.net/forum?id=XEFWBxi075">GRANDE</a>, published at the international AI conferences AAAI and ICLR.</>,
              <>Während seiner Promotion in der Forschungsgruppe AI Systems Engineering von Prof. Dr. Christian Bartelt an der Universität Mannheim untersuchte Marton, wie sich Entscheidungsbäume und Deep Learning miteinander verbinden lassen. Daraus entstanden unter anderem die Verfahren <a className={textLink} href="https://ojs.aaai.org/index.php/AAAI/article/view/29345">GradTree</a> und <a className={textLink} href="https://openreview.net/forum?id=XEFWBxi075">GRANDE</a>, die auf den internationalen KI-Konferenzen AAAI und ICLR veröffentlicht wurden.</>,
            )}
          </p>

          <p>
            {pick(
              <>After completing his doctorate, Marton joined the COgnitive SoftwaRE (CORE) research group as a postdoctoral researcher. <a className={textLink} href={bartelt.links.scholar}>Prof. Dr. Christian Bartelt</a> founded the group at the <a className={textLink} href="https://www.isse.tu-clausthal.de/">Institute for Software and Systems Engineering (ISSE)</a> after moving to TU Clausthal. Here, Marton shifted his research focus to tabular foundation models.</>,
              <>Nach seiner Promotion wechselte Marton als Postdoc in die Forschungsgruppe COgnitive SoftwaRE (CORE). Diese gründete <a className={textLink} href={bartelt.links.scholar}>Prof. Dr. Christian Bartelt</a> nach seinem Wechsel an die TU Clausthal am <a className={textLink} href="https://www.isse.tu-clausthal.de/">Institute for Software and Systems Engineering (ISSE)</a>. Hier verlagerte Marton seinen Forschungsschwerpunkt auf Tabular Foundation Models.</>,
            )}
          </p>

          <p>
            {pick(
              'At NVIDIA, he will continue this work with his team, developing open-source models that others can use and build on.',
              'Bei NVIDIA wird er diesen Schwerpunkt weiterverfolgen und gemeinsam mit seinem Team an Open-Source-Modellen arbeiten, die andere einsetzen und weiterentwickeln können.',
            )}
          </p>

          <p>
            {pick(
              <>We at CORE thank Sascha Marton for the enjoyable and successful time working together. We wish him every success in his research career and look forward to further joint projects as he stays connected with us as a member of the <Link className={textLink} to={withInstitution('/')}>CORE research network</Link>.</>,
              <>Wir als Forschungsgruppe CORE danken Sascha Marton für die schöne und erfolgreiche Zusammenarbeit. Für seine weitere Forschungskarriere wünschen wir ihm viel Erfolg. Zugleich freuen wir uns auf weitere gemeinsame Forschungsprojekte und darauf, dass er uns als Mitglied im <Link className={textLink} to={withInstitution('/')}>CORE-Forschernetzwerk</Link> verbunden bleibt.</>,
            )}
          </p>

          <p>
            {pick(
              'His path shows one of the opportunities that university AI research offers: developing original ideas, making internationally visible contributions, and bringing that experience into industrial research. For prospective doctoral researchers, CORE combines fundamental research, practical applications, and collaboration with international academic and industry partners.',
              'Sein Weg zeigt eine Perspektive, die universitäre KI-Forschung eröffnet: eigene Ideen entwickeln, international sichtbare Beiträge leisten und diese Erfahrung in die industrielle Forschung einbringen. Für angehende Promovierende bietet CORE ein Umfeld, das Grundlagenforschung, praktische Anwendungen und den Austausch mit internationalen Forschungs- und Industriepartnern verbindet.',
            )}
          </p>

          <section className="border-t border-slate-200 pt-8" aria-labelledby="research-opportunities">
            <h2 id="research-opportunities" className="text-xl font-semibold text-slate-950">
              {pick('Want to research AI?', 'Du möchtest selbst an KI forschen?')}
            </h2>
            <p className="mt-3">
              {pick(
                <>Find information about a doctorate at CORE and how to get in touch on our <Link className={textLink} to={applyInstitution('/team#join-us', 'TUC')}>PhD opportunities and joining CORE</Link> page.</>,
                <>Informationen zu einer Promotion bei CORE und Kontaktmöglichkeiten findest du auf unserer Seite <Link className={textLink} to={applyInstitution('/team#join-us', 'TUC')}>Promotion und Mitarbeit bei CORE</Link>.</>,
              )}
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}
