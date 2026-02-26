import { motion } from 'framer-motion';

export function Anmeldung() {
  return (
    <section id="anmeldung" className="section section--light">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">Anmeldung & Buchung</span>
        </motion.div>
        <motion.div
          className="anmeldung-hero"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="anmeldung-intro">
            <p className="anmeldung-intro__lead">
              Die Anmeldung für den Sportmedizin Kongress 2026 wird bald verfügbar sein.
            </p>
            <p className="anmeldung-intro__main">
              Die Anmeldung zum Grundkurs LIP, den Theorie- und Praxisseminaren, den Workshops, dem Ärztesport sowie dem Reinhard-Suckert-Symposium ist über unser Buchungsportal möglich.
            </p>
            <p className="anmeldung-intro__detail">
              Dort finden Sie auch detaillierte Informationen über die Teilnahmegebühren und die Zahlungsmodalitäten.
            </p>
            <p className="anmeldung-intro__note">
              Bitte beachten Sie, dass bei den Seminaren und Workshops eine begrenzte Teilnehmerzahl besteht.
            </p>
            <div className="anmeldung-intro__cta">
              <motion.a
                href="https://sweapevent.com/b?p=sportmedizinkongressstchristoph"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Anmeldung
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 4 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </motion.a>
            </div>
          </div>
          <div className="anmeldung-hero__image">
            <img src="/buchung.png" alt="Anmeldung & Buchung" />
          </div>
        </motion.div>

        <div className="anmeldung-grid">
          <motion.div
            className="anmeldung-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="anmeldung-card__image">
              <img src="/logo-oegsmp.png" alt="ÖGSMP" />
            </div>
            <h3 className="subsection-title">Vergünstigung für ÖGSMP-Mitglieder</h3>
            <p className="anmeldung-card__lead">
              Mitglieder der Österreichischen Gesellschaft für Sportmedizin und Prävention (ÖGSMP) erhalten einen Rabatt von € 20,00 auf das Reinhard-Suckert-Symposium.
            </p>
            <div className="anmeldung-card__links">
              <div className="anmeldung-card__link-block">
                <span className="anmeldung-card__label">Weitere Informationen</span>
                <a href="https://www.sportmedizingesellschaft.at" target="_blank" rel="noopener noreferrer">
                  www.sportmedizingesellschaft.at
                </a>
              </div>
              <div className="anmeldung-card__link-block">
                <span className="anmeldung-card__label">Mitglied werden</span>
                <a href="https://www.sportmedizingesellschaft.at/registrierunganmeldung" target="_blank" rel="noopener noreferrer">
                  Registrierung
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="anmeldung-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="anmeldung-card__image">
              <img src="/logo-ski-academy.png" alt="Ski Austria Academy" />
            </div>
            <h3 className="subsection-title">Zimmerreservierung</h3>
            <p className="anmeldung-card__lead">
              Zimmer können ab sofort in der SKI AUSTRIA ACADEMY St. Christoph am Arlberg reserviert werden, wo auch der Fortbildungskongress stattfindet und ein gewisses Zimmerkontingent bereits vorreserviert wurde. Die Zimmerreservierung (nach dem Prinzip „first come, first served“) hat selbständig durch jeden Kongressteilnehmer bis spätestens 15.01.2026 zu erfolgen.
            </p>
            <div className="anmeldung-card__links">
              <div className="anmeldung-card__link-block">
                <span className="anmeldung-card__label">Mehr Details</span>
                <a href="https://www.skiakademie.at" target="_blank" rel="noopener noreferrer">
                  www.skiakademie.at
                </a>
              </div>
            </div>
            <p className="anmeldung-card__note">
              Bitte beachten Sie, dass es sich hierbei lediglich um die Zimmerreservierung handelt – die Kongressanmeldung erfolgt über das Anmeldeportal.
            </p>
            <p className="anmeldung-card__note">
              Die Teilnahme am Praxisseminar Schi Alpin und Ärztesport unter der Leitung der Skilehrer der Ski Austria Academy ist nur Gästen der Ski Austria Academy möglich und ist im Zimmerpreis inkludiert.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
