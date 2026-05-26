export default function ScoreFlow() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-body)" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            </div>
            <span className="font-bold text-emerald-900 text-lg" style={{ fontFamily: "var(--font-display)" }}>ScoreFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-emerald-700">
            <a href="#scoring" className="hover:text-emerald-500">Scoring IA</a>
            <a href="#pipeline" className="hover:text-emerald-500">Pipeline</a>
            <a href="#roi" className="hover:text-emerald-500">ROI</a>
          </div>
          <a href="#cta" className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors">
            Qualifier mes leads
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-20 bg-emerald-50 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
              ✦ Qualification automatique BANT + scoring IA
            </div>
            <div className="relative">
              <div className="text-[180px] md:text-[220px] font-bold text-emerald-100 leading-none select-none absolute inset-0 flex items-center justify-center pointer-events-none" style={{ fontFamily: "var(--font-display)" }} aria-hidden>80%</div>
              <h1 className="relative text-5xl md:text-6xl font-bold text-emerald-950 leading-tight mb-6 pt-8" style={{ fontFamily: "var(--font-display)" }}>
                80% de vos prospects<br />
                qualifiés <span className="text-emerald-500">sans intervention</span>
              </h1>
            </div>
            <p className="text-emerald-700 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              ScoreFlow analyse chaque lead entrant — Budget, Autorité, Besoin, Timing — et route automatiquement les deals chauds vers vos closers. Fini les cycles perdus sur des prospects froids.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#cta" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-200">
                Qualifier mes leads →
              </a>
              <a href="#pipeline" className="bg-white text-emerald-700 border-2 border-emerald-200 hover:border-emerald-400 px-8 py-4 rounded-xl font-bold text-lg transition-all">
                Voir le pipeline
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SCORING CRITERIA */}
      <section id="scoring" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Le scoring BANT réinventé par l&apos;IA
            </h2>
            <p className="text-emerald-600 text-lg">Pas juste un score — une analyse contextuelle complète.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { letter: "B", word: "Budget", desc: "Taille de l'entreprise, budget tech estimé, signaux de dépense récents", color: "bg-emerald-500" },
              { letter: "A", word: "Autorité", desc: "Rôle décisionnel, niveau hiérarchique, accès au budget", color: "bg-teal-500" },
              { letter: "N", word: "Besoin", desc: "Problèmes identifiés via web scraping, contenus consultés, recherches récentes", color: "bg-cyan-500" },
              { letter: "T", word: "Timing", desc: "Signaux d'achat, appels d'offres publiés, croissance récente", color: "bg-green-500" },
            ].map((c) => (
              <div key={c.letter} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                <div className={`w-12 h-12 ${c.color} text-white rounded-xl flex items-center justify-center font-bold text-2xl mb-4`} style={{ fontFamily: "var(--font-display)" }}>{c.letter}</div>
                <h3 className="font-bold text-emerald-950 text-lg mb-2" style={{ fontFamily: "var(--font-display)" }}>{c.word}</h3>
                <p className="text-emerald-600 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PIPELINE FLOW */}
      <section id="pipeline" className="py-20 bg-emerald-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Routing automatique selon le score
          </h2>
          <p className="text-emerald-300 text-lg mb-12">Votre closer ne voit que les deals à &gt;70 points.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {[
              { label: "Lead entrant", sub: "Formulaire, inbound, import", color: "bg-emerald-800 border-emerald-700", score: null },
              { label: "→", sub: null, color: null, score: null },
              { label: "Scoring IA", sub: "Analyse BANT en < 30s", color: "bg-emerald-700 border-emerald-600", score: null },
              { label: "→", sub: null, color: null, score: null },
              { label: "Score < 40", sub: "Nurturing automatique", color: "bg-gray-800 border-gray-700 text-gray-300", score: "Froid" },
              { label: "Score 40–70", sub: "Séquence de warm-up", color: "bg-yellow-900 border-yellow-700", score: "Tiède" },
              { label: "Score > 70", sub: "Routé vers closer immédiatement", color: "bg-emerald-500 border-emerald-400", score: "Chaud 🔥" },
            ].map((s, i) => s.label === "→" ? (
              <div key={i} className="text-emerald-400 text-2xl hidden md:block">→</div>
            ) : (
              <div key={i} className={`${s.color} border rounded-xl p-4 text-left min-w-[130px]`}>
                {s.score && <div className="text-xs font-bold text-emerald-300 mb-1">{s.score}</div>}
                <div className="font-bold text-white text-sm">{s.label}</div>
                {s.sub && <div className="text-emerald-300 text-xs mt-1">{s.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section id="roi" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 text-center mb-14" style={{ fontFamily: "var(--font-display)" }}>
            L&apos;impact sur vos métriques
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { metric: "Taux de qualification manuel réduit de", value: "80%", detail: "votre équipe ne touche plus les leads froids" },
                { metric: "Cycle de vente raccourci de", value: "35%", detail: "les closers commencent au bon moment" },
                { metric: "Taux de closing amélioré de", value: "+28%", detail: "moins de deals perdus sur des mauvais profils" },
              ].map((r) => (
                <div key={r.metric} className="flex items-start gap-4 p-5 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="text-2xl font-bold text-emerald-500 w-16 flex-shrink-0" style={{ fontFamily: "var(--font-display)" }}>{r.value}</div>
                  <div>
                    <div className="font-semibold text-emerald-900 text-sm">{r.metric}</div>
                    <div className="text-emerald-600 text-sm">{r.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-emerald-950 rounded-2xl p-8 text-white">
              <blockquote className="text-lg font-medium leading-relaxed mb-6" style={{ fontFamily: "var(--font-display)" }}>
                &ldquo;Nos SDRs ont enfin un vrai outil. Le pipeline est propre, les scores sont fiables, et notre closer ferme 1 deal sur 3 au lieu de 1 sur 8 avant ScoreFlow.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold">CR</div>
                <div>
                  <div className="font-semibold text-sm">Camille R.</div>
                  <div className="text-emerald-400 text-xs">VP Sales, SaaS B2B</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20 bg-gradient-to-br from-emerald-500 to-teal-600">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Pipeline qualifié dès cette semaine
          </h2>
          <p className="text-emerald-100 text-xl mb-10">Intégration CRM en 2h. Premiers scores en temps réel.</p>
          <a href="mailto:hello@wikolabs.com?subject=ScoreFlow — Demande de démo" className="inline-block bg-white text-emerald-700 hover:bg-emerald-50 px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-xl">
            Qualifier mes leads →
          </a>
          <p className="text-emerald-200 text-sm mt-5">14 jours gratuits. Aucune configuration complexe.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-emerald-950 text-emerald-400 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>ScoreFlow</span>
          <p className="text-sm">© 2025 ScoreFlow — Un produit <a href="https://wikolabs.com" className="text-emerald-400 hover:text-emerald-200">Wikolabs</a></p>
          <div className="flex gap-6 text-sm">
            <a href="mailto:hello@wikolabs.com" className="hover:text-emerald-200 transition-colors">Contact</a>
            <a href="https://wikolabs.com" className="hover:text-emerald-200 transition-colors">Wikolabs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
