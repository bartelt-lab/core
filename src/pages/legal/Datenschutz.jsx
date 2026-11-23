import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/useLanguage'
import { operator, privacyRevised } from '../../data/legal'
import { Address, Block, Ext, LegalPage } from './shared'

// Privacy policy (Art. 13 GDPR). Every section describes something this site
// actually does, so it has to change with the code:
//   - Hosting ............ GitHub Pages (.github/workflows/deploy.yml)
//   - Fonts .............. Google Fonts links in index.html and in
//                          components/tuc/Layout.jsx
//   - Videos ............. YouTube and Google Drive iframes (DemoCard,
//                          ProjectLayout, FinishedProjectContent, AiTeamProjects,
//                          MilestoneBrowser)
//   - Browser storage .... language (i18n/) and theme (ThemeToggle)
// If one of these goes away (fonts hosted locally, embeds made click-to-load),
// change or remove its section. The wording is a draft: have the operator, and
// ideally a data protection officer, read it before it goes live.
const Datenschutz = () => {
    const { pick } = useLanguage()

    return (
        <LegalPage title={pick('Privacy policy', 'Datenschutzerklärung')}>
            <Block id="controller" title={pick('Who is responsible', 'Verantwortlicher')}>
                <Address pick={pick} />
                <p>
                    {pick('Email: ', 'E-Mail: ')}
                    <a href={`mailto:${operator.email}`}>{operator.email}</a>
                </p>
                <p>
                    {pick(
                        'Use this address for any question about your data on this website. More details are in the ',
                        'An diese Adresse können Sie sich mit allen Fragen zu Ihren Daten auf dieser Website wenden. Weitere Angaben stehen im ',
                    )}
                    <Link to="/impressum">{pick('legal notice', 'Impressum')}</Link>.
                </p>
            </Block>

            <Block id="overview" title={pick('In short', 'Kurz gefasst')}>
                <p>
                    {pick(
                        'This website has no user accounts, no contact forms, no advertising and no visitor analytics, and it sets no cookies of its own. Personal data is processed in the four situations below: when the pages are delivered, when fonts are loaded, when a page shows an embedded video, and when you write to us.',
                        'Diese Website hat keine Benutzerkonten, keine Kontaktformulare, keine Werbung und keine Besucherstatistik und setzt selbst keine Cookies. Personenbezogene Daten werden in den vier folgenden Fällen verarbeitet: beim Ausliefern der Seiten, beim Laden von Schriften, beim Anzeigen eingebetteter Videos und wenn Sie uns schreiben.',
                    )}
                </p>
            </Block>

            <Block id="hosting" title={pick('Hosting', 'Hosting')}>
                <p>
                    {pick(
                        'This website is hosted on GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. When you open a page, GitHub’s servers receive your IP address and technical details of the request (time, page requested, browser and operating system) and may store them in log files, also on servers in the USA. We have no access to these logs.',
                        'Diese Website wird über GitHub Pages bereitgestellt, einen Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf einer Seite erhalten die Server von GitHub Ihre IP-Adresse und technische Angaben zur Anfrage (Zeitpunkt, aufgerufene Seite, Browser und Betriebssystem) und können sie in Protokolldateien speichern, auch auf Servern in den USA. Wir haben keinen Zugriff auf diese Protokolle.',
                    )}
                </p>
                <p>
                    {pick(
                        'This processing is needed to deliver the website and keep it secure. The legal basis is our legitimate interest in running it (Art. 6 (1) (f) GDPR). Details: ',
                        'Diese Verarbeitung ist nötig, um die Website auszuliefern und sicher zu betreiben. Rechtsgrundlage ist unser berechtigtes Interesse am Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO). Näheres: ',
                    )}
                    <Ext href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">{pick('GitHub privacy statement', 'Datenschutzerklärung von GitHub')}</Ext>.
                </p>
            </Block>

            <Block id="fonts" title={pick('Fonts', 'Schriften')}>
                <p>
                    {pick(
                        'The pages load their fonts from Google Fonts, a service of Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. To do so, your browser connects to Google’s servers, which receive your IP address and the address of the page you are on. Data may also be transferred to Google LLC in the USA.',
                        'Die Seiten laden ihre Schriften von Google Fonts, einem Dienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Dazu verbindet sich Ihr Browser mit Servern von Google, die Ihre IP-Adresse und die Adresse der aufgerufenen Seite erhalten. Daten können auch an die Google LLC in den USA übermittelt werden.',
                    )}
                </p>
                <p>
                    {pick('Details: ', 'Näheres: ')}
                    <Ext href="https://policies.google.com/privacy">{pick('Google privacy policy', 'Datenschutzerklärung von Google')}</Ext>.
                </p>
            </Block>

            <Block id="videos" title={pick('Embedded videos', 'Eingebettete Videos')}>
                <p>
                    {pick(
                        'Some project pages show videos that are embedded from YouTube or Google Drive, both services of Google Ireland Limited. On those pages your browser connects to Google’s servers as soon as the video player loads, in some cases without a click. Google then receives your IP address and the address of the page, and may set cookies or use similar techniques. If you are signed in to a Google account, Google can link the visit to it.',
                        'Einige Projektseiten zeigen Videos, die von YouTube oder Google Drive eingebettet sind, beides Dienste der Google Ireland Limited. Auf diesen Seiten verbindet sich Ihr Browser mit Servern von Google, sobald der Videoplayer lädt, teils ohne Klick. Google erhält dann Ihre IP-Adresse und die Adresse der Seite und kann Cookies setzen oder ähnliche Techniken einsetzen. Sind Sie bei einem Google-Konto angemeldet, kann Google den Besuch diesem Konto zuordnen.',
                    )}
                </p>
                <p>
                    {pick(
                        'Videos that are stored on this website itself are delivered together with the pages and involve no third party.',
                        'Videos, die auf dieser Website selbst gespeichert sind, werden zusammen mit den Seiten ausgeliefert; daran ist kein Dritter beteiligt.',
                    )}
                </p>
            </Block>

            <Block id="storage" title={pick('Settings stored in your browser', 'Einstellungen in Ihrem Browser')}>
                <p>
                    {pick(
                        'The language you choose (English or German) and, if you switch it, the light or dark design are stored in your browser’s local storage, so that the choice survives a reload. This information stays on your device and is not sent to us. You can delete it at any time through your browser settings.',
                        'Die gewählte Sprache (Englisch oder Deutsch) und, wenn Sie es umschalten, das helle oder dunkle Design werden im lokalen Speicher Ihres Browsers abgelegt, damit die Wahl beim erneuten Laden erhalten bleibt. Diese Angaben bleiben auf Ihrem Gerät und werden nicht an uns übertragen. Sie können sie jederzeit über die Einstellungen Ihres Browsers löschen.',
                    )}
                </p>
            </Block>

            <Block id="email" title={pick('When you write to us', 'Wenn Sie uns schreiben')}>
                <p>
                    {pick(
                        'If you send an email to one of the addresses on this website, for example an application or a collaboration request, we use what you send to answer and handle your request (Art. 6 (1) (b) and (f) GDPR). We delete it once it is no longer needed for that purpose, unless the law requires us to keep it longer.',
                        'Wenn Sie eine E-Mail an eine der Adressen auf dieser Website senden, etwa eine Bewerbung oder eine Kooperationsanfrage, verwenden wir Ihre Angaben, um die Anfrage zu beantworten und zu bearbeiten (Art. 6 Abs. 1 lit. b und f DSGVO). Wir löschen sie, sobald sie dafür nicht mehr gebraucht werden, sofern keine gesetzliche Pflicht eine längere Aufbewahrung verlangt.',
                    )}
                </p>
            </Block>

            <Block id="links" title={pick('Links to other websites', 'Links zu anderen Websites')}>
                <p>
                    {pick(
                        'This website links to other websites, such as university pages, Google Scholar, GitHub and LinkedIn profiles. Following a link takes you to that provider, whose own privacy rules then apply.',
                        'Diese Website verlinkt auf andere Websites, etwa Seiten der Universitäten sowie Profile bei Google Scholar, GitHub und LinkedIn. Mit einem Klick auf einen Link wechseln Sie zum jeweiligen Anbieter; dann gelten dessen Datenschutzregeln.',
                    )}
                </p>
            </Block>

            <Block id="rights" title={pick('Your rights', 'Ihre Rechte')}>
                <p>
                    {pick(
                        'Under the GDPR you have the right to be told what data about you is processed (Art. 15), to have it corrected (Art. 16), deleted (Art. 17) or its processing restricted (Art. 18), to receive it in a portable format (Art. 20), and to object to processing that rests on a legitimate interest (Art. 21). To use these rights, write to the address above.',
                        'Nach der DSGVO haben Sie das Recht auf Auskunft über die zu Ihnen verarbeiteten Daten (Art. 15), auf Berichtigung (Art. 16), Löschung (Art. 17) und Einschränkung der Verarbeitung (Art. 18), auf Datenübertragbarkeit (Art. 20) sowie das Recht, einer Verarbeitung zu widersprechen, die auf einem berechtigten Interesse beruht (Art. 21). Um diese Rechte auszuüben, schreiben Sie an die oben genannte Adresse.',
                    )}
                </p>
                <p>
                    {pick(
                        'You can also complain to a data protection supervisory authority, for example the State Commissioner for Data Protection of Lower Saxony: ',
                        'Sie können sich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel bei der Landesbeauftragten für den Datenschutz Niedersachsen: ',
                    )}
                    <Ext href="https://www.lfd.niedersachsen.de">www.lfd.niedersachsen.de</Ext>.
                </p>
                <p className="text-sm text-slate-600">
                    {pick('Last revised: ', 'Stand: ')}
                    {pick(privacyRevised[1], privacyRevised[0])}
                </p>
            </Block>
        </LegalPage>
    )
}

export default Datenschutz
