import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/useLanguage'
import { editor, operator } from '../../data/legal'
import { Address, Block, LegalPage, Missing } from './shared'

// Legal notice required by § 5 DDG, plus the editorial contact required by
// § 18 Abs. 2 MStV (the site carries a News section). Operator details live in
// src/data/legal.js. The wording here is a draft: have the operator read it
// before it goes live.
const Impressum = () => {
    const { pick } = useLanguage()

    return (
        <LegalPage title={pick('Legal notice (Impressum)', 'Impressum')}>
            <Block id="operator" title={pick('Operator and contact', 'Anbieter und Kontakt')}>
                <p className="text-sm text-slate-600">{pick('Information according to § 5 DDG', 'Angaben gemäß § 5 DDG')}</p>
                <Address pick={pick} />
                <p>
                    {pick('Email: ', 'E-Mail: ')}
                    <a href={`mailto:${operator.email}`}>{operator.email}</a>
                    <br />
                    {pick('Phone: ', 'Telefon: ')}
                    {operator.phone ?? <Missing label={pick('phone number missing', 'Telefonnummer fehlt')} />}
                </p>
                <p>
                    {pick('Responsible for content under § 18 (2) MStV: ', 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: ')}
                    {editor.name}
                    {pick(', address as above.', ', Anschrift wie oben.')}
                </p>
            </Block>

            <Block id="about" title={pick('About this website', 'Über diese Website')}>
                <p>
                    {pick(
                        'CORE is a network of researchers and research groups. This website is run by the person named above. It is not an official website of TU Clausthal, Babeș-Bolyai University or the University of Rostock. Their names and logos appear here to show where members of the network work.',
                        'CORE ist ein Netzwerk von Forschenden und Forschungsgruppen. Diese Website wird von der oben genannten Person betrieben. Sie ist keine offizielle Website der TU Clausthal, der Babeș-Bolyai-Universität oder der Universität Rostock. Deren Namen und Logos zeigen, wo Mitglieder des Netzwerks arbeiten.',
                    )}
                </p>
            </Block>

            <Block id="liability" title={pick('Content, links and copyright', 'Inhalte, Links und Urheberrecht')}>
                <p>
                    {pick(
                        'We write and check the content of this website with care, but cannot guarantee that it is complete, correct and up to date at all times.',
                        'Wir erstellen und prüfen die Inhalte dieser Website sorgfältig, können aber nicht garantieren, dass sie jederzeit vollständig, richtig und aktuell sind.',
                    )}
                </p>
                <p>
                    {pick(
                        'This website links to websites run by others. Their operators alone are responsible for that content. We checked the linked pages when we set the links and found nothing unlawful; if you notice a problem, tell us and we will remove the link.',
                        'Diese Website verlinkt auf Websites anderer Anbieter. Für deren Inhalte sind allein die jeweiligen Betreiber verantwortlich. Beim Setzen der Links haben wir die verlinkten Seiten geprüft und nichts Rechtswidriges festgestellt; bei einem Hinweis auf Probleme entfernen wir den Link.',
                    )}
                </p>
                <p>
                    {pick(
                        'Texts, images and videos on this website are protected by copyright. Reuse needs the consent of the respective author, unless the law allows it. Logos of universities and partners belong to their owners.',
                        'Texte, Bilder und Videos dieser Website sind urheberrechtlich geschützt. Eine Weiterverwendung braucht die Zustimmung der jeweiligen Urheberin oder des jeweiligen Urhebers, soweit das Gesetz sie nicht ohnehin erlaubt. Logos von Universitäten und Partnern gehören ihren Inhabern.',
                    )}
                </p>
                <p>
                    {pick('How this website handles personal data: ', 'Wie diese Website mit personenbezogenen Daten umgeht: ')}
                    <Link to="/datenschutz">{pick('Privacy policy', 'Datenschutzerklärung')}</Link>.
                </p>
            </Block>
        </LegalPage>
    )
}

export default Impressum
