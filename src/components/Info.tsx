import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INFO_BLOCKS = [
  {
    title: 'Wissenschaftliches Programm',
    reverse: false,
    image: '/heft.png',
    content: [
      'Die Teilnahme am Grundkurs LIP, an den Theorie- und Praxisseminaren sowie am Workshop ist Ärztinnen und Ärzten vorbehalten.',
      'Das Reinhard-Suckert-Symposium kann nur als Block gebucht werden. Tageskarten sind nicht erhältlich.',
      'Der Veranstalter behält sich sowohl zeitliche als auch inhaltliche Änderungen des Programms vor. Für die Theorie- und Praxisseminare ist eine Mindestteilnehmerzahl von 5 Personen pro Gruppe notwendig. Sollte diese Anzahl nicht erreicht werden, behält sich der Veranstalter vor, die Gruppen entweder zusammenzulegen oder das Seminar gegen Kostenrückerstattung zu stornieren. Programmänderungen aufgrund von Referentenwechsel oder zu geringer Teilnehmerzahl sind darüber hinaus jederzeit möglich.',
      'Für den Workshop sowie die Praxisseminare empfehlen wir bequeme Sportbekleidung und Schuhe.',
      'Bitte beachten Sie, dass Gesundheit und körperliche Eignung Voraussetzung für die Teilnahme an den Praxisseminaren sowie am Ärztesport sind.',
    ],
  },
  {
    title: 'Praxisseminar Schi Alpin & Ärztesport',
    reverse: true,
    image: '/skifahrer.png',
    content: [
      'Das Praxisseminar Schi Alpin und Ärztesport kann nur gemeinsam und in Kombination mit einer weiteren Fortbildungseinheit gebucht und bestätigt werden. Die Teilnahme am Praxisseminar Schi Alpin und Ärztesport erfolgt unter der Leitung der Skilehrer der Ski Austria Academy und ist ausschließlich den Gästen derselben vorbehalten.',
      'Die Kosten hierfür sind bereits im Zimmerpreis inkludiert. Bitte reservieren Sie daher rechtzeitig Ihre Hotelunterkunft, da in der Ski Austria Academy ein limitiertes Zimmerkontingent zur Verfügung steht. Für nähere Informationen hierzu wenden Sie sich bitte direkt an die Ski Austria Academy.',
    ],
  },
  {
    title: 'Schipass',
    reverse: false,
    image: '/lift.png',
    content: [
      'Die Liftgebühren sind in den Kongressgebühren nicht inbegriffen. Liftkarten müssen eigenständig an den Verkaufsstellen erworben werden und bereits bei der Gruppeneinteilung zum Praxisseminar Ski Alpin und Ärztesport vorhanden sein. Es besteht die Möglichkeit, 5-Tages-Ski-Pässe im Zuge der Zimmerreservierung bei der Ski Austria Academy vorzubestellen. Wenn Sie den Preis für den Schipass (zzgl. der Depotgebühr für die Chipkarte) zusammen mit der Anzahlung für das Hotelzimmer an die Ski Austria Academy überweisen, bekommen Sie den Schipass beim Einchecken im Hotel ausgehändigt.',
      'Alle benötigten Sportgeräte (Schi, Schuhe, Stöcke etc.) und die entsprechende Sportbekleidung sind selbst mitzubringen. Bitte erscheinen Sie pünktlich in kompletter Ausrüstung zum Praxisseminar Schi Alpin und zum Ärztesport. Die Pausen während dieser Kurse werden jeweils in den Gruppen festgelegt. Die Ausübung von Sport abseits der Pisten ist abhängig von der Schnee- und Wetterlage.',
    ],
  },
  {
    title: 'Anrechenbarkeit & Teilnahmegebühren',
    reverse: true,
    image: '/gebuehren.png',
    clickable: true,
    content: [
      'Die vom Veranstalter angesuchten anrechenbaren Stunden für das ÖÄK-Diplom Sportmedizin (Änderungen vorbehalten) und die Teilnahmegebühren (inkl. Mwst.) für die Kongressveranstaltungen können Sie der folgenden Tabelle entnehmen.',
      'Die vom Veranstalter angesuchten DFP\'s für das ÖÄK-Diplom Sportmedizin werden in voller Höhe nur bei vollständiger Anwesenheit vergeben. Bei mehrmaligem Fehlen erfolgt eine entsprechende Aliquotierung der Stunden.',
      'Der Veranstalter weist darauf hin, dass laut Urteil des Verwaltungsgerichtshofes die steuerliche Absetzbarkeit nur dann gegeben ist, wenn mindestens acht Stunden (Grundkurs, Theorie, Praxis) exklusive dem Ärztesport nachgewiesen werden. Wir haben bei der Gestaltung des Programms diesem Umstand Rechnung getragen, um die steuerliche Absetzbarkeit zu ermöglichen.',
      'Bitte lesen Sie das wissenschaftliche Programm vor Beginn der Veranstaltung durch und markieren/notieren Sie sich die von Ihnen gebuchten Vorträge/Seminare.',
      'Bitte erscheinen Sie pünktlich zu den Veranstaltungen. Ihre Anwesenheit wird kontrolliert und ist Voraussetzung für die Anerkennung der DFP\'s.',
    ],
  },
  {
    title: 'Anmeldung',
    reverse: false,
    image: '/anmeldung.png',
    imageFullSize: true,
    contentBlocks: [
      { type: 'p', text: 'Ihre verbindliche Anmeldung ist nur online unter www.sportmedizin-arlberg.at möglich. Die definitive Anmeldung wird erst mit dem Zahlungseingang gültig.' },
      { type: 'p', text: 'Die Vergabe von limitierten Seminarplätzen erfolgt in der Reihenfolge des Einlangens der Teilnahmegebühren am Kongresskonto.' },
      { type: 'p', text: 'Bei Änderungswünschen oder zusätzlichen Buchungen nach bereits erfolgter Anmeldung Ihrer Person zum Kongress über unsere Homepage bitten wir Sie, direkt mit unserem Kongresssekretariat unter info@sportmedizin-arlberg.at in Kontakt zu treten und keine erneute Buchung/Doppelbuchung über die Homepage vorzunehmen.' },
      {
        type: 'highlight',
        title: 'Frühbucherbonus',
        text: 'Für die Inanspruchnahme des Frühbucherbonus gilt nicht das Anmeldedatum, sondern das Einlangen der gesamten Kongressgebühr bis spätestens 18.1.2026 am Kongresskonto (bitte beachten Sie die entsprechende Bearbeitungszeit der Überweisung durch Ihre Bank). Anschließend wird der Normaltarif verrechnet. Bei verspäteter Einzahlung bitten wir höflich um entsprechende selbständige Anpassung und Einzahlung des zu leistenden Restbetrages.',
      },
      {
        type: 'storno',
        title: 'Stornogebühren',
        items: [
          { period: 'Bis einschließlich 31.12.2025', note: 'keine Stornogebühren' },
          { period: '1.1. – 31.1.2026', note: '50% Refundierung des einbezahlten Betrages' },
          { period: 'Ab 1.2.2026', note: 'keine Rückerstattung (buchhalterische Gründe)' },
        ],
      },
      { type: 'notice', text: 'Wir weisen darauf hin, dass der Veranstalter, die Referenten und die Trainer keine wie immer geartete Haftung gegenüber den Teilnehmern oder dritten Personen übernehmen. Die Teilnahme an den Sportveranstaltungen erfolgt auf eigene Gefahr. Der Abschluss einer Haftpflicht- bzw. Unfallversicherung wird empfohlen!' },
    ],
  },
  {
    title: 'Zimmer-Reservierung',
    reverse: true,
    image: '/zimmer.png',
    content: [
      'Zimmer können ab sofort in der Ski Austria Academy St. Christoph am Arlberg reserviert werden. Für die Kongressteilnehmer wurde ein begrenztes Zimmerkontingent (n = 155 mit Zahlungsfrist bis 1.1.2026) vorgemerkt. Die Zimmerreservierung (nach dem Prinzip „first come, first serve“) hat selbständig durch die KongressteilnehmerInnen zu erfolgen.',
      'Mehr Details zur Zimmerreservierung erfahren Sie auf der Website www.skiakademie.at',
      'Die Übernachtungskosten werden separat und direkt mit der Ski Austria Academy verrechnet.',
    ],
  },
];

const TAGUNGSORT = {
  title: 'Tagungsort & Erreichbarkeit',
  reverse: false,
  image: '/laptop.png',
  contentBlocks: [
    {
      type: 'block',
      title: 'Tagungsort und Tagungssekretariat',
      content: 'Ski Austria Academy St. Christoph am Arlberg',
    },
    {
      type: 'block',
      title: 'Öffnungszeiten',
      rows: [
        { label: 'Sonntag', value: '15:00–17:00, 18:00–20:00 Uhr' },
        { label: 'Mo. – Fr.', value: '07:45–08:15, 09:15–09:45, 16:30–17:00 Uhr' },
      ],
    },
    {
      type: 'block',
      title: 'Kontakt',
      content: 'info@sportmedizin-arlberg.at',
    },
    {
      type: 'block',
      title: 'Termine',
      rows: [
        { label: 'Beginn', value: 'Sonntag 01.03.2026, 15:00 Uhr' },
        { label: 'Eröffnung & Festvortrag', value: 'Sonntag 01.03.2026, 17:00 Uhr' },
        { label: 'Ende', value: 'Freitag 06.03.2026, 19:00 Uhr' },
      ],
    },
  ],
};

export function Info() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  return (
    <section id="info" className="section section--light">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">Informationen</span>
        </motion.div>

        {INFO_BLOCKS.map((block) => (
          <motion.div
            key={block.title}
            className={`info-block ${block.reverse ? 'info-block--reverse' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="info-block__text">
              <h3 className="subsection-title">{block.title}</h3>
              {'contentBlocks' in block && block.contentBlocks
                ? block.contentBlocks.map((item, j) => {
                    if (item.type === 'p') return <p key={j}>{item.text}</p>;
                    if (item.type === 'highlight') return (
                      <div key={j} className="info-highlight">
                        <strong>{item.title}</strong>
                        <span>{item.text}</span>
                      </div>
                    );
                    if (item.type === 'storno') return (
                      <div key={j} className="info-storno">
                        <strong className="info-storno__title">{item.title}</strong>
                        <ul className="info-storno__list">
                          {item.items.map((row, i) => (
                            <li key={i}>
                              <span className="info-storno__period">{row.period}</span>
                              <span className="info-storno__note">{row.note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                    if (item.type === 'notice') return (
                      <p key={j} className="info-notice">{item.text}</p>
                    );
                    return null;
                  })
                : block.content.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
            </div>
            <div
              className={`info-block__image ${block.clickable ? 'info-block__image--clickable' : ''} ${'imageFullSize' in block && block.imageFullSize ? 'info-block__image--full' : ''}`}
              role={block.clickable ? 'button' : undefined}
              tabIndex={block.clickable ? 0 : undefined}
              onClick={block.clickable ? () => setLightboxOpen(true) : undefined}
              onKeyDown={block.clickable ? (e) => e.key === 'Enter' && setLightboxOpen(true) : undefined}
            >
              <img src={block.image} alt={block.title} />
            </div>
          </motion.div>
        ))}

        <motion.div
          className={`info-block ${TAGUNGSORT.reverse ? 'info-block--reverse' : ''}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="info-block__text">
            <h3 className="subsection-title">{TAGUNGSORT.title}</h3>
            <div className="tagungsort-blocks">
              {TAGUNGSORT.contentBlocks.map((item, j) => (
                item.type === 'block' && (
                  <div key={j} className="tagungsort-block">
                    <h4 className="tagungsort-block__title">{item.title}</h4>
                    {'content' in item && item.content && (
                      <p className="tagungsort-block__content">{item.content}</p>
                    )}
                    {'rows' in item && item.rows && (
                      <dl className="tagungsort-block__list">
                        {item.rows.map((row, i) => (
                          <div key={i} className="tagungsort-block__row">
                            <dt>{row.label}</dt>
                            <dd>{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
          <div className="info-block__image">
            <img src={TAGUNGSORT.image} alt={TAGUNGSORT.title} />
          </div>
        </motion.div>

        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              className="image-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxOpen(false)}
            >
              <motion.div
                className="image-lightbox__content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="image-lightbox__close"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Bild schließen"
                >
                  ×
                </button>
                <img src="/gebuehren.png" alt="Gebührentabelle vergrößert" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
