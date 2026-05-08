import React, { useState, useEffect } from 'react';
import { Dumbbell, MapPin, Activity, CheckCircle, ArrowRight, Home, CreditCard, ShieldCheck, Users, User, Clock } from 'lucide-react';

// ─── Logo ────────────────────────────────────────────────────────────────────
const Logo = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 250" className={className}>
    <defs>
      <linearGradient id="gold" x1="0" y1="0" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>
      <linearGradient id="silver" x1="0" y1="0" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E0E0E0" />
        <stop offset="100%" stopColor="#7a7a7a" />
      </linearGradient>
    </defs>
    <g transform="translate(40, 50) scale(1.25)">
      <path d="M10,0 L40,0 L30,90 L0,90 Z" fill="url(#gold)" />
      <path d="M60,0 L90,0 L80,90 L50,90 Z" fill="url(#silver)" />
      <path d="M22,40 L78,40 L73,55 L18,55 Z" fill="#ffffff" />
    </g>
    <g transform="translate(190, 65)">
      <text x="0" y="35" fontFamily="Impact, Arial Black, sans-serif" fontStyle="italic" fontSize="60" fill="#ffffff" letterSpacing="10">HYBRID</text>
      <text x="2" y="68" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontStyle="italic" fontSize="22" fill="#dddddd" letterSpacing="4">PREPARATION</text>
      <text x="2" y="92" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="14" fill="#999999" letterSpacing="5.3">BE A PART OF IT</text>
    </g>
  </svg>
);

// ─── Konstanten ───────────────────────────────────────────────────────────────
const fitnessDescriptions = {
  1: "Leicht sportlich - Gelegentliche Bewegung.",
  2: "Anfänger - 1x pro Woche leichtes Training.",
  3: "Freizeit-Aktiv - 1-2x pro Woche moderates Training.",
  4: "Regelmäßig Aktiv - 2-3x pro Woche Sport.",
  5: "Durchschnittlich - 3x pro Woche solides Training.",
  6: "Fortgeschritten - 3-4x pro Woche intensiver Sport.",
  7: "Ambitioniert - 4-5x pro Woche Training nach Plan.",
  8: "Sehr sportlich - 5-6x pro Woche hartes Training.",
  9: "Leistungsbereich - Tägliches, stark strukturiertes Training.",
  10: "Extrem sportlich - Profistatus oder vergleichbares Pensum."
};

const PRICE_CAMP_PER_ATHLETE = 169;
const PRICE_ROOM_SINGLE = 80;
const PRICE_ROOM_DOUBLE = 160;
const DEPOSIT_PER_ATHLETE = 99;

// ─── Rechtliche Seiten ────────────────────────────────────────────────────────
const Impressum = () => (
  <div className="max-w-3xl mx-auto py-32 px-4 sm:px-6 lg:px-8 text-zinc-300 break-words" lang="de">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase mb-8">Impressum</h1>
    <div className="space-y-6 text-sm sm:text-base font-light leading-relaxed">
      <section>
        <h2 className="text-lg sm:text-xl font-bold text-amber-400 mb-2">Angaben gemäß § 5 TMG</h2>
        <p>[INPUT: VORNAME NACHNAME]<br />[INPUT: STRASSE HAUSNUMMER]<br />[INPUT: PLZ ORT]</p>
      </section>
      <section>
        <h2 className="text-lg sm:text-xl font-bold text-amber-400 mb-2">Kontakt</h2>
        <p>Telefon: [INPUT: TELEFONNUMMER]<br />E-Mail: [INPUT: E-MAIL]</p>
      </section>
    </div>
  </div>
);

const Datenschutz = () => (
  <div className="max-w-3xl mx-auto py-32 px-4 sm:px-6 lg:px-8 text-zinc-300 break-words" lang="de">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase mb-8">Datenschutzerklärung</h1>
    <div className="space-y-6 text-sm sm:text-base font-light leading-relaxed">
      <p>[INPUT: DATENSCHUTZTEXT EINFÜGEN]</p>
    </div>
  </div>
);

const AGB = () => (
  <div className="max-w-3xl mx-auto py-32 px-4 sm:px-6 lg:px-8 text-zinc-300 break-words" lang="de">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase mb-8">AGB</h1>
    <div className="space-y-6 text-sm sm:text-base font-light leading-relaxed">
      <p>[INPUT: AGB TEXT EINFÜGEN]</p>
    </div>
  </div>
);

// ─── Haupt-App ────────────────────────────────────────────────────────────────
export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    athleteCount: 'single',
    accommodation: 'single_room',
    geschlecht: '', vorname: '', nachname: '', geburtstag: '', email: '', fitnessLevel: 5,
    partnerGeschlecht: '', partnerVorname: '', partnerNachname: '', partnerGeburtstag: '', partnerFitnessLevel: 5,
    paymentOption: 'full',
    honeypot: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [agbAccepted, setAgbAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showStickyMobile, setShowStickyMobile] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const formElement = document.getElementById('buchung');
      if (formElement) {
        setShowStickyMobile(formElement.getBoundingClientRect().top > window.innerHeight - 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Preisberechnung ────────────────────────────────────────────────────────
  const athletes = formData.athleteCount === 'double' ? 2 : 1;
  let roomPrice = 0;
  if (formData.accommodation === 'single_room') roomPrice = PRICE_ROOM_SINGLE;
  if (formData.accommodation === 'double_room') roomPrice = PRICE_ROOM_DOUBLE;
  const currentFullPrice = (athletes * PRICE_CAMP_PER_ATHLETE) + roomPrice;
  const currentDepositPrice = athletes * DEPOSIT_PER_ATHLETE;

  // ─── Handler ────────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleAthleteCountChange = (count) => {
    setFormData(prev => {
      let nextAcc = prev.accommodation;
      if (count === 'double' && nextAcc === 'single_room') nextAcc = 'double_room';
      return { ...prev, athleteCount: count, accommodation: nextAcc };
    });
  };

  const handleAccommodationChange = (acc) => {
    setFormData(prev => ({ ...prev, accommodation: acc }));
  };

  const validateStep2 = () => {
    const errors = {};
    if (!formData.geschlecht) errors.geschlecht = true;
    if (!formData.vorname) errors.vorname = true;
    if (!formData.nachname) errors.nachname = true;
    if (!formData.geburtstag) errors.geburtstag = true;
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = true;
    if (formData.athleteCount === 'double') {
      if (!formData.partnerGeschlecht) errors.partnerGeschlecht = true;
      if (!formData.partnerVorname) errors.partnerVorname = true;
      if (!formData.partnerNachname) errors.partnerNachname = true;
      if (!formData.partnerGeburtstag) errors.partnerGeburtstag = true;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (formStep === 2 && !validateStep2()) return;
    setFormStep(prev => Math.min(prev + 1, 3));
    const formEl = document.getElementById('buchung');
    if (formEl) window.scrollTo({ top: formEl.offsetTop - 100, behavior: 'smooth' });
  };

  const handlePrevStep = () => setFormStep(prev => Math.max(prev - 1, 1));

  // ─── SUBMIT (gesichert) ─────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bot-Check: Honeypot-Feld ausgefüllt → still abbrechen
    if (formData.honeypot) {
      setIsSubmitted(true);
      return;
    }

    // AGB Pflicht
    if (!agbAccepted) {
      setSubmitError('Bitte akzeptiere die AGB und Datenschutzerklärung.');
      return;
    }

    // Frontend Rate-Limiting (verhindert Doppelklick)
    const lastSubmit = sessionStorage.getItem('lastSubmit');
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < 5000) {
      setSubmitError('Bitte warte einen Moment.');
      return;
    }

    setIsProcessing(true);
    setSubmitError(null);

    try {
      const payload = {
        token: process.env.REACT_APP_SECRET_TOKEN, // aus .env / GitHub Secret
        ...formData,
        totalPrice: currentFullPrice,
        depositPrice: currentDepositPrice,
      };

      const response = await fetch(process.env.REACT_APP_GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' }, // text/plain vermeidet CORS-Preflight bei GAS
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(responseData.error || 'Unbekannter Fehler');
      }

      sessionStorage.setItem('lastSubmit', Date.now().toString());
      setIsSubmitted(true);
      setFormStep(1);
    } catch (error) {
      let msg = 'Buchung konnte nicht gesendet werden. Bitte überprüfe deine Verbindung.';
      if (error.name === 'TimeoutError') msg = 'Zeitüberschreitung. Bitte erneut versuchen.';
      if (!navigator.onLine) msg = 'Kein Internet. Bitte Verbindung prüfen.';
      setSubmitError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const navigateTo = (view, e) => {
    if (e) e.preventDefault();
    setCurrentView(view);
    scrollToTop();
  };

  // ─── Hilfs-Styles ───────────────────────────────────────────────────────────
  const inputClass = (field) =>
    `w-full bg-zinc-800 border ${formErrors[field] ? 'border-red-500' : 'border-zinc-700'} text-white px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors`;
  const selectClass = (field) =>
    `w-full bg-zinc-800 border ${formErrors[field] ? 'border-red-500' : 'border-zinc-700'} text-white px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors appearance-none`;

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-amber-500 selection:text-zinc-950 pb-20 md:pb-0">

      {/* CSS Animationen */}
      <style>{`
        @keyframes heavyDrop {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes powerSlam {
          0% { opacity: 0; transform: scale(1.5); filter: blur(5px); }
          60% { opacity: 1; transform: scale(0.95); filter: blur(0); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        .anim-word-1 { animation: heavyDrop 0.5s cubic-bezier(0.2,0.8,0.2,1) forwards; opacity:0; }
        .anim-word-2 { animation: heavyDrop 0.5s cubic-bezier(0.2,0.8,0.2,1) 0.15s forwards; opacity:0; }
        .anim-word-3 { animation: powerSlam 0.6s cubic-bezier(0.175,0.885,0.32,1.275) 0.4s forwards; opacity:0; }
      `}</style>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 shadow-lg' : 'bg-gradient-to-b from-zinc-950/80 to-transparent border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center relative transition-all duration-500 ease-in-out ${isScrolled ? 'h-16 md:h-20' : 'h-28 md:h-36'}`}>
            <div className={`absolute top-1/2 -translate-y-1/2 flex items-center transition-all duration-500 ease-in-out ${isScrolled ? 'left-1/2 -translate-x-1/2' : 'left-0 translate-x-0'}`}>
              <button onClick={(e) => navigateTo('home', e)} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer rounded-sm" aria-label="Zur Startseite">
                <Logo className={`w-auto transition-all duration-500 ease-in-out ${isScrolled ? 'h-8 md:h-12' : 'h-16 md:h-24 drop-shadow-2xl'}`} />
              </button>
            </div>
            <div className="w-10" />
            <div className="hidden md:flex space-x-8 text-sm font-medium text-zinc-300 z-10">
              <a href="#camp-details" onClick={(e) => { if (currentView !== 'home') navigateTo('home', e); }} className="hover:text-amber-400 transition-colors">Details</a>
              <a href="#buchung" onClick={(e) => { if (currentView !== 'home') navigateTo('home', e); }} className="text-amber-400 hover:text-amber-300 font-bold transition-colors">Jetzt Buchen</a>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Views ──────────────────────────────────────────────────────────── */}
      {currentView === 'impressum' && <Impressum />}
      {currentView === 'datenschutz' && <Datenschutz />}
      {currentView === 'agb' && <AGB />}

      {currentView === 'home' && (
        <>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" alt="Training" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-2 bg-amber-500 text-zinc-950 font-bold px-4 py-1.5 uppercase tracking-widest text-sm mb-6 animate-pulse">
                <Activity className="h-4 w-4" /> Nur noch 4 von 20 Plätzen
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase mb-6 mt-12 md:mt-0 flex flex-wrap justify-center gap-x-4 gap-y-2">
                <span className="anim-word-1 inline-block">Intensive</span>
                <span className="anim-word-2 inline-block">Camp</span>
                <span className="anim-word-3 inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">Gössenheim</span>
              </h1>
              <p className="mt-4 text-xl text-zinc-400 max-w-3xl mx-auto font-light">
                07. – 08. August 2027. Zwei Tage harter Fokus, professionelles Coaching und Übernachtung in der Pension Heuler.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <a href="#buchung" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-4 px-8 uppercase tracking-wider transition-all flex items-center gap-2 hover:scale-105">
                  Platz sichern <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* ── USPs ─────────────────────────────────────────────────────── */}
          <div id="camp-details" className="py-16 bg-zinc-900 border-y border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-6">
                  <MapPin className="h-10 w-10 text-amber-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Location & Datum</h3>
                  <p className="text-zinc-400">07. – 08. August 2027<br />Gössenheim, Bayern.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 border-y md:border-y-0 md:border-x border-zinc-800">
                  <Home className="h-10 w-10 text-amber-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Unterkunft</h3>
                  <p className="text-zinc-400">Pension Heuler.<br />Inkl. sportgerechtem Frühstück.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6">
                  <Dumbbell className="h-10 w-10 text-amber-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Performance</h3>
                  <p className="text-zinc-400">Outdoor Sessions &<br />Professionelles Coaching.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Galerie ──────────────────────────────────────────────────── */}
          <div className="py-2 bg-zinc-950">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
              ].map((src, i) => (
                <img key={i} src={src} alt={`Camp Impression ${i + 1}`} className="w-full h-48 md:h-64 object-cover opacity-60 hover:opacity-100 transition-opacity" />
              ))}
            </div>
          </div>

          {/* ── Agenda & Coaches ─────────────────────────────────────────── */}
          <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Agenda */}
              <div>
                <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                  <Clock className="h-8 w-8 text-amber-500" /> Der Ablauf
                </h2>
                <div className="space-y-8">
                  {[
                    {
                      tag: 'Tag 1: The Grind',
                      punkte: [
                        ['08:00 – 09:00', 'Check-In & Briefing'],
                        ['09:30 – 12:00', '[INPUT: SESSION 1]'],
                        ['12:30 – 14:00', 'Mittagspause (High Protein)'],
                        ['14:30 – 17:00', '[INPUT: SESSION 2]'],
                        ['18:00', 'Gemeinsames Dinner & Regeneration'],
                      ]
                    },
                    {
                      tag: 'Tag 2: Push Limits',
                      punkte: [
                        ['07:30 – 08:30', 'Morning Mobility & Breakfast'],
                        ['09:00 – 12:00', '[INPUT: SESSION 3]'],
                        ['12:30 – 13:30', 'Debriefing & Abreise'],
                      ]
                    }
                  ].map(({ tag, punkte }) => (
                    <div key={tag} className="relative border-l-2 border-zinc-800 pl-6 pb-2">
                      <div className="absolute w-3 h-3 bg-amber-500 rounded-full -left-[7px] top-2" />
                      <h4 className="text-xl font-bold text-amber-400 mb-4">{tag}</h4>
                      <ul className="space-y-3 text-zinc-400">
                        {punkte.map(([zeit, inhalt]) => (
                          <li key={zeit}><strong className="text-white">{zeit}:</strong> {inhalt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coaches */}
              <div>
                <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                  <Activity className="h-8 w-8 text-amber-500" /> Deine Coaches
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop',
                      name: '[INPUT: NAME COACH 1]',
                      rolle: '[INPUT: z.B. Head Coach]',
                      bio: '[INPUT: Kurzbeschreibung zur Erfahrung von Coach 1]',
                    },
                    {
                      img: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?q=80&w=400&auto=format&fit=crop',
                      name: '[INPUT: NAME COACH 2]',
                      rolle: '[INPUT: z.B. Strength Coach]',
                      bio: '[INPUT: Kurzbeschreibung zur Erfahrung von Coach 2]',
                    },
                  ].map((coach) => (
                    <div key={coach.name} className="bg-zinc-900 border border-zinc-800 p-4 text-center">
                      <img src={coach.img} alt={coach.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover grayscale" />
                      <h4 className="font-bold text-lg text-white mb-1">{coach.name}</h4>
                      <p className="text-sm text-amber-500 font-bold mb-3">{coach.rolle}</p>
                      <p className="text-xs text-zinc-400">{coach.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Leistungen / Inbegriffen ─────────────────────────────────── */}
          <div className="py-16 bg-zinc-900 border-y border-zinc-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-black uppercase mb-10">Das ist inbegriffen</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {[
                  '2 intensive Trainingstage mit professionellem Coaching',
                  'Übernachtung in der Pension Heuler',
                  'Sportgerechtes Frühstück & Mittagessen',
                  'Individuelles Feedback zu Technik & Training',
                  'Zugang zu allen Outdoor-Stationen',
                  'Camp-Community & Netzwerk',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-zinc-800/50 border border-zinc-700 p-4">
                    <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Buchungsformular ─────────────────────────────────────────── */}
          <div id="buchung" className="py-24 bg-zinc-950">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Jetzt Platz sichern</h2>
                <p className="text-zinc-400">Nur noch wenige Plätze verfügbar. Fülle das Formular aus und sichere dir deinen Startplatz.</p>
              </div>

              {/* Erfolg */}
              {isSubmitted ? (
                <div className="bg-zinc-900 border border-amber-500/30 p-10 text-center">
                  <CheckCircle className="h-16 w-16 text-amber-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-black uppercase mb-3">Buchung eingegangen!</h3>
                  <p className="text-zinc-400">Wir haben deine Anmeldung erhalten und melden uns in Kürze per E-Mail mit allen Details.</p>
                </div>
              ) : (
                <div className="bg-zinc-900 border border-zinc-800">

                  {/* Schritt-Anzeige */}
                  <div className="flex border-b border-zinc-800">
                    {[
                      { n: 1, label: 'Paket' },
                      { n: 2, label: 'Daten' },
                      { n: 3, label: 'Zahlung' },
                    ].map(({ n, label }) => (
                      <div key={n} className={`flex-1 py-4 text-center text-sm font-bold uppercase tracking-wider transition-colors ${formStep === n ? 'bg-amber-500 text-zinc-950' : formStep > n ? 'bg-zinc-800 text-amber-400' : 'text-zinc-500'}`}>
                        {formStep > n ? <CheckCircle className="h-4 w-4 inline mr-1" /> : null}
                        {label}
                      </div>
                    ))}
                  </div>

                  <div className="p-6 md:p-10">

                    {/* ── SCHRITT 1: Paket ────────────────────────────────── */}
                    {formStep === 1 && (
                      <div className="space-y-8">
                        {/* Athletenanzahl */}
                        <div>
                          <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                            <Users className="h-5 w-5 text-amber-500" /> Teilnehmer
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { val: 'single', icon: <User className="h-6 w-6" />, label: '1 Athlet', sub: `${PRICE_CAMP_PER_ATHLETE} € Camp-Gebühr` },
                              { val: 'double', icon: <Users className="h-6 w-6" />, label: '2 Athleten', sub: `${PRICE_CAMP_PER_ATHLETE * 2} € Camp-Gebühr` },
                            ].map(({ val, icon, label, sub }) => (
                              <button
                                key={val}
                                onClick={() => handleAthleteCountChange(val)}
                                className={`p-6 border-2 text-center transition-all ${formData.athleteCount === val ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}
                              >
                                <div className={`flex justify-center mb-2 ${formData.athleteCount === val ? 'text-amber-400' : 'text-zinc-400'}`}>{icon}</div>
                                <div className="font-bold text-white">{label}</div>
                                <div className="text-xs text-zinc-400 mt-1">{sub}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Unterkunft */}
                        <div>
                          <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                            <Home className="h-5 w-5 text-amber-500" /> Unterkunft
                          </h3>
                          <div className="space-y-3">
                            {[
                              { val: 'single_room', label: 'Einzelzimmer', price: `+ ${PRICE_ROOM_SINGLE} €`, disabled: false },
                              { val: 'double_room', label: 'Doppelzimmer', price: `+ ${PRICE_ROOM_DOUBLE} €`, disabled: false },
                              { val: 'no_room', label: 'Keine Unterkunft', price: 'Inklusive', disabled: false },
                            ].filter(o => !(formData.athleteCount === 'double' && o.val === 'single_room'))
                              .map(({ val, label, price }) => (
                                <button
                                  key={val}
                                  onClick={() => handleAccommodationChange(val)}
                                  className={`w-full flex justify-between items-center p-4 border-2 transition-all ${formData.accommodation === val ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}
                                >
                                  <span className="font-medium text-white">{label}</span>
                                  <span className={`font-bold text-sm ${formData.accommodation === val ? 'text-amber-400' : 'text-zinc-400'}`}>{price}</span>
                                </button>
                              ))}
                          </div>
                        </div>

                        {/* Preisübersicht */}
                        <div className="bg-zinc-800 border border-zinc-700 p-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-zinc-400">Camp-Gebühr ({athletes}x {PRICE_CAMP_PER_ATHLETE} €)</span>
                            <span className="text-white font-bold">{athletes * PRICE_CAMP_PER_ATHLETE} €</span>
                          </div>
                          {roomPrice > 0 && (
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-zinc-400">Unterkunft</span>
                              <span className="text-white font-bold">{roomPrice} €</span>
                            </div>
                          )}
                          <div className="border-t border-zinc-700 mt-4 pt-4 flex justify-between items-center">
                            <span className="font-bold uppercase text-white">Gesamt</span>
                            <span className="text-2xl font-black text-amber-400">{currentFullPrice} €</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── SCHRITT 2: Persönliche Daten ────────────────────── */}
                    {formStep === 2 && (
                      <div className="space-y-8">
                        {/* Athlet 1 */}
                        <div>
                          <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-amber-500" /> {athletes === 2 ? 'Athlet 1' : 'Deine Daten'}
                          </h3>
                          <div className="space-y-4">
                            <select name="geschlecht" value={formData.geschlecht} onChange={handleChange} className={selectClass('geschlecht')}>
                              <option value="">Anrede *</option>
                              <option value="Herr">Herr</option>
                              <option value="Frau">Frau</option>
                              <option value="Divers">Divers</option>
                            </select>
                            {formErrors.geschlecht && <p className="text-red-400 text-xs mt-1">Bitte wähle eine Anrede.</p>}

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <input name="vorname" value={formData.vorname} onChange={handleChange} placeholder="Vorname *" className={inputClass('vorname')} />
                                {formErrors.vorname && <p className="text-red-400 text-xs mt-1">Pflichtfeld</p>}
                              </div>
                              <div>
                                <input name="nachname" value={formData.nachname} onChange={handleChange} placeholder="Nachname *" className={inputClass('nachname')} />
                                {formErrors.nachname && <p className="text-red-400 text-xs mt-1">Pflichtfeld</p>}
                              </div>
                            </div>

                            <div>
                              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="E-Mail-Adresse *" className={inputClass('email')} />
                              {formErrors.email && <p className="text-red-400 text-xs mt-1">Bitte gültige E-Mail eingeben.</p>}
                            </div>

                            <div>
                              <label className="block text-xs text-zinc-400 mb-1">Geburtsdatum *</label>
                              <input name="geburtstag" type="date" value={formData.geburtstag} onChange={handleChange} className={inputClass('geburtstag')} />
                              {formErrors.geburtstag && <p className="text-red-400 text-xs mt-1">Pflichtfeld</p>}
                            </div>

                            <div>
                              <label className="block text-sm text-zinc-300 mb-2">Fitness-Level: <span className="text-amber-400 font-bold">{formData.fitnessLevel}/10</span></label>
                              <input name="fitnessLevel" type="range" min="1" max="10" value={formData.fitnessLevel} onChange={handleChange} className="w-full accent-amber-500" />
                              <p className="text-xs text-zinc-400 mt-1">{fitnessDescriptions[formData.fitnessLevel]}</p>
                            </div>
                          </div>
                        </div>

                        {/* Athlet 2 */}
                        {formData.athleteCount === 'double' && (
                          <div>
                            <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                              <User className="h-5 w-5 text-amber-500" /> Athlet 2
                            </h3>
                            <div className="space-y-4">
                              <select name="partnerGeschlecht" value={formData.partnerGeschlecht} onChange={handleChange} className={selectClass('partnerGeschlecht')}>
                                <option value="">Anrede *</option>
                                <option value="Herr">Herr</option>
                                <option value="Frau">Frau</option>
                                <option value="Divers">Divers</option>
                              </select>
                              {formErrors.partnerGeschlecht && <p className="text-red-400 text-xs mt-1">Pflichtfeld</p>}

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <input name="partnerVorname" value={formData.partnerVorname} onChange={handleChange} placeholder="Vorname *" className={inputClass('partnerVorname')} />
                                  {formErrors.partnerVorname && <p className="text-red-400 text-xs mt-1">Pflichtfeld</p>}
                                </div>
                                <div>
                                  <input name="partnerNachname" value={formData.partnerNachname} onChange={handleChange} placeholder="Nachname *" className={inputClass('partnerNachname')} />
                                  {formErrors.partnerNachname && <p className="text-red-400 text-xs mt-1">Pflichtfeld</p>}
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs text-zinc-400 mb-1">Geburtsdatum *</label>
                                <input name="partnerGeburtstag" type="date" value={formData.partnerGeburtstag} onChange={handleChange} className={inputClass('partnerGeburtstag')} />
                                {formErrors.partnerGeburtstag && <p className="text-red-400 text-xs mt-1">Pflichtfeld</p>}
                              </div>

                              <div>
                                <label className="block text-sm text-zinc-300 mb-2">Fitness-Level Partner: <span className="text-amber-400 font-bold">{formData.partnerFitnessLevel}/10</span></label>
                                <input name="partnerFitnessLevel" type="range" min="1" max="10" value={formData.partnerFitnessLevel} onChange={handleChange} className="w-full accent-amber-500" />
                                <p className="text-xs text-zinc-400 mt-1">{fitnessDescriptions[formData.partnerFitnessLevel]}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── SCHRITT 3: Zahlung & Bestätigung ────────────────── */}
                    {formStep === 3 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-amber-500" /> Zahlungsoption
                          </h3>
                          <div className="space-y-3">
                            <button
                              onClick={() => setFormData(p => ({ ...p, paymentOption: 'full' }))}
                              className={`w-full flex justify-between items-center p-4 border-2 transition-all ${formData.paymentOption === 'full' ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}
                            >
                              <div className="text-left">
                                <div className="font-bold text-white">Vollzahlung</div>
                                <div className="text-xs text-zinc-400">Einmalige Zahlung – kein weiterer Aufwand</div>
                              </div>
                              <div className="text-xl font-black text-amber-400">{currentFullPrice} €</div>
                            </button>
                            <button
                              onClick={() => setFormData(p => ({ ...p, paymentOption: 'deposit' }))}
                              className={`w-full flex justify-between items-center p-4 border-2 transition-all ${formData.paymentOption === 'deposit' ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}
                            >
                              <div className="text-left">
                                <div className="font-bold text-white">Anzahlung</div>
                                <div className="text-xs text-zinc-400">Rest ({currentFullPrice - currentDepositPrice} €) wird separat fällig</div>
                              </div>
                              <div className="text-xl font-black text-amber-400">{currentDepositPrice} €</div>
                            </button>
                          </div>
                        </div>

                        {/* Zusammenfassung */}
                        <div className="bg-zinc-800 border border-zinc-700 p-6 space-y-2 text-sm">
                          <h4 className="font-bold uppercase text-white mb-3">Zusammenfassung</h4>
                          <div className="flex justify-between text-zinc-400"><span>Athlet(en)</span><span className="text-white">{athletes === 2 ? `${formData.vorname} & ${formData.partnerVorname}` : formData.vorname} {formData.nachname}</span></div>
                          <div className="flex justify-between text-zinc-400"><span>Unterkunft</span><span className="text-white">{formData.accommodation === 'single_room' ? 'Einzelzimmer' : formData.accommodation === 'double_room' ? 'Doppelzimmer' : 'Keine'}</span></div>
                          <div className="flex justify-between text-zinc-400"><span>Zahlung</span><span className="text-white">{formData.paymentOption === 'full' ? `${currentFullPrice} € (Vollzahlung)` : `${currentDepositPrice} € (Anzahlung)`}</span></div>
                        </div>

                        {/* AGB Checkbox */}
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="agb"
                            checked={agbAccepted}
                            onChange={(e) => setAgbAccepted(e.target.checked)}
                            className="mt-1 accent-amber-500 w-4 h-4 flex-shrink-0"
                          />
                          <label htmlFor="agb" className="text-sm text-zinc-400">
                            Ich akzeptiere die{' '}
                            <button onClick={(e) => navigateTo('agb', e)} className="text-amber-400 hover:underline">AGB</button>
                            {' '}und die{' '}
                            <button onClick={(e) => navigateTo('datenschutz', e)} className="text-amber-400 hover:underline">Datenschutzerklärung</button>.
                          </label>
                        </div>

                        {/* Honeypot (Anti-Bot, unsichtbar) */}
                        <div style={{ display: 'none' }} aria-hidden="true">
                          <input
                            type="text"
                            name="honeypot"
                            value={formData.honeypot}
                            onChange={handleChange}
                            tabIndex="-1"
                            autoComplete="off"
                          />
                        </div>

                        {/* Sicherheitshinweis */}
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <ShieldCheck className="h-4 w-4 text-zinc-600" />
                          Deine Daten werden verschlüsselt übertragen und nicht an Dritte weitergegeben.
                        </div>

                        {submitError && (
                          <div className="bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-3 text-sm">
                            {submitError}
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── Navigation Buttons ───────────────────────────────── */}
                    <div className={`flex mt-8 gap-4 ${formStep > 1 ? 'justify-between' : 'justify-end'}`}>
                      {formStep > 1 && (
                        <button onClick={handlePrevStep} className="border border-zinc-600 text-zinc-300 hover:border-zinc-400 px-6 py-3 font-bold uppercase text-sm transition-colors">
                          ← Zurück
                        </button>
                      )}
                      {formStep < 3 ? (
                        <button onClick={handleNextStep} className="bg-amber-500 hover:bg-amber-400 text-zinc-950 px-8 py-3 font-bold uppercase text-sm transition-colors flex items-center gap-2">
                          Weiter <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          disabled={isProcessing || !agbAccepted}
                          className="bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-zinc-950 px-8 py-3 font-bold uppercase text-sm transition-colors flex items-center gap-2"
                        >
                          {isProcessing ? (
                            <><span className="animate-spin inline-block w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full" /> Wird gesendet…</>
                          ) : (
                            <><CheckCircle className="h-4 w-4" /> Buchung abschicken</>
                          )}
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo className="h-8 w-auto opacity-60" />
            <div className="flex gap-6 text-sm text-zinc-500">
              <button onClick={(e) => navigateTo('impressum', e)} className="hover:text-amber-400 transition-colors">Impressum</button>
              <button onClick={(e) => navigateTo('datenschutz', e)} className="hover:text-amber-400 transition-colors">Datenschutz</button>
              <button onClick={(e) => navigateTo('agb', e)} className="hover:text-amber-400 transition-colors">AGB</button>
            </div>
            <p className="text-xs text-zinc-600">© {new Date().getFullYear()} Hybrid Preparation Camp</p>
          </div>
        </div>
      </footer>

      {/* ── Sticky Mobile CTA ───────────────────────────────────────────────── */}
      {showStickyMobile && currentView === 'home' && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 p-4">
          <a href="#buchung" className="block w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black py-4 text-center uppercase tracking-wider transition-colors">
            Jetzt Platz sichern – ab {PRICE_CAMP_PER_ATHLETE + PRICE_ROOM_SINGLE} €
          </a>
        </div>
      )}

    </div>
  );
}