'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
type WirdType = 'lazim' | 'wazifa' | 'hadra';
type Lang = 'fr' | 'ar';

interface WirdStep {
  titleFr: string;
  titleAr: string;
  arabic: string;
  phonetic: string;
  translationFr: string;
  count: number;
  requiresWudu?: boolean;
}

interface SavedState {
  type: WirdType;
  step: number;
  count: number;
}

interface WakeLockLike {
  release(): Promise<void>;
}

// ─── Translations ─────────────────────────────────────────────────────────────
const i18n = {
  fr: {
    appTitle: 'Tariqa Tidjaniya',
    appSub: 'Outil de Pratique',
    resumeBtn: 'Continuer la session',
    wirdNames: { lazim: 'Le Lâzim', wazifa: 'La Wazifa', hadra: "Hadratul-Jum'a" } as Record<WirdType, string>,
    wirdSubs: {
      lazim: 'Matin & Soir · Individuel',
      wazifa: '1x par jour · Communautaire',
      hadra: 'Vendredi après-midi (Asr)',
    } as Record<WirdType, string>,
    wuduAlert: 'Ablution requise',
    doneTitle: 'Zikr Terminé',
    doneAccept: "Qu'Allah accepte nos œuvres.",
    stepOf: (s: number, t: number) => `Étape ${s} / ${t}`,
    remaining: (n: number) => `${n} restants`,
    backToMenu: 'Retour au menu',
    langToggle: 'عربي',
  },
  ar: {
    appTitle: 'الطريقة التجانية',
    appSub: 'أداة الممارسة',
    resumeBtn: 'استئناف الجلسة',
    wirdNames: { lazim: 'اللازم', wazifa: 'الوظيفة', hadra: 'حضرة الجمعة' } as Record<WirdType, string>,
    wirdSubs: {
      lazim: 'صباحاً ومساءً · فردي',
      wazifa: 'مرة يومياً · جماعي',
      hadra: 'الجمعة بعد العصر',
    } as Record<WirdType, string>,
    wuduAlert: 'الوضوء واجب',
    doneTitle: 'اكتمل الذكر',
    doneAccept: 'تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ',
    stepOf: (s: number, t: number) => `خطوة ${s} / ${t}`,
    remaining: (n: number) => `${n} متبقية`,
    backToMenu: 'العودة إلى القائمة',
    langToggle: 'Français',
  },
} as const;

// ─── Shared steps ─────────────────────────────────────────────────────────────

const SUBHANA: WirdStep = {
  titleFr: 'Tasbîh (Verset de clôture)',
  titleAr: 'التسبيح',
  arabic:
    'سُبْحَانَ رَبِّكَ رَبِّ الْعِزَّةِ عَمَّا يَصِفُونَ وَسَلَامٌ عَلَى الْمُرْسَلِينَ وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
  phonetic:
    "Subhâna rabbika rabbil-ʻizzati ʻammâ yaçifûna, wa salâmun ʻalal-mursalîna, wal-hamdu lillâhi rabbil-ʻâlamîn.",
  translationFr:
    "Gloire à ton Seigneur, le Seigneur de la majesté, au-delà de ce qu'ils décrivent. Paix sur les Envoyés. Louange à Allah, Seigneur des Mondes.",
  count: 1,
};

const SAYYIDUNA: WirdStep = {
  titleFr: 'Salâm sur le Prophète',
  titleAr: 'الصلاة والسلام',
  arabic: 'سَيِّدُنَا مُحَمَّدٌ رَسُولُ اللَّهِ عَلَيْهِ سَلَامُ اللَّهِ',
  phonetic: 'Sayyidunâ Muhammadun Rasûlullâh, ʻalayhi salâmullâh.',
  translationFr:
    "Notre Seigneur Muhammad est le Messager d'Allah, sur lui soit la paix d'Allah.",
  count: 1,
};

// ─── Awrad data ───────────────────────────────────────────────────────────────
const awradData: Record<WirdType, WirdStep[]> = {
  lazim: [
    {
      titleFr: "1. Isti'âdha (Protection)",
      titleAr: '١. الاستعاذة',
      arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
      phonetic: "A'ûzu bil-lâhi minach-chaytânir-rajîm.",
      translationFr: 'Je me réfugie auprès d\'Allah contre Satan le maudit.',
      count: 1,
    },
    {
      titleFr: '2. Al-Fâtiha (Ouverture)',
      titleAr: '٢. الفاتحة',
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ...',
      phonetic: 'Bismil-lâhir-rahmânir-rahîm. Al-hamdu lillâhi rabbil-ʻâlamîn...',
      translationFr:
        'Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux. Louange à Allah, Seigneur des Mondes...',
      count: 1,
    },
    {
      titleFr: '3. Istighfâr (Pardon)',
      titleAr: '٣. الاستغفار',
      arabic: 'أَسْتَغْفِرُ اللَّهَ',
      phonetic: 'Astaghfirul-lâh.',
      translationFr: 'Je demande pardon à Allah.',
      count: 100,
    },
    {
      titleFr: '4. Salâtul Fâtihi',
      titleAr: '٤. صلاة الفاتح',
      arabic:
        'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ الْفَاتِحِ لِمَا أُغْلِقَ وَالْخَاتِمِ لِمَا سَبَقَ نَاصِرِ الْحَقِّ بِالْحَقِّ وَالْهَادِي إِلَى صِرَاطِكَ الْمُسْتَقِيمِ وَعَلَى آلِهِ حَقَّ قَدْرِهِ وَمِقْدَارِهِ الْعَظِيمِ',
      phonetic:
        "Allâhumma çalli ʻalâ sayyidinâ Muhammadinil-fâtihi limâ ughliq, wal-khâtimi limâ sabaq, nâçiril-haqqi bil-haqqi, wal-hâdî ilâ çirâtikal-mustaqîm, wa ʻalâ âlihî haqqaqdarihi wa miqdârihil-ʻazîm.",
      translationFr:
        "Ô Allah ! Prie sur notre Seigneur Muhammad, l'Ouvreur de ce qui était fermé, le Sceau de ce qui a précédé, le Défenseur du vrai par le vrai, le Guide vers Ta voie droite. Et sur sa famille, à la hauteur de sa valeur et de son immense rang.",
      count: 100,
    },
    { ...SUBHANA, titleFr: '5. ' + SUBHANA.titleFr, titleAr: '٥. ' + SUBHANA.titleAr },
    {
      titleFr: "6. At-Tawhîd (Unitude)",
      titleAr: '٦. التوحيد',
      arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
      phonetic: 'Lâ ilâha illal-lâh.',
      translationFr: "Il n'y a pas de divinité sauf Allah.",
      count: 100,
    },
    { ...SAYYIDUNA, titleFr: '7. ' + SAYYIDUNA.titleFr, titleAr: '٧. ' + SAYYIDUNA.titleAr },
    {
      titleFr: '8. Clôture (S. 33 V. 56)',
      titleAr: '٨. الخاتمة',
      arabic:
        'إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا',
      phonetic:
        "Innal-lâha wa malâ-ikatahû yuçallûna ʻalan-nabî. Yâ ayyuhal-lazîna âmanû çallû ʻalayhi wa sallimû taslîmâ.",
      translationFr:
        "Certes Allah et Ses Anges prient sur le Prophète. Ô vous qui avez cru, priez sur lui et adressez-lui la paix.",
      count: 1,
    },
  ],

  wazifa: [
    {
      titleFr: '1. Introduction',
      titleAr: '١. المقدمة',
      arabic:
        'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ ۝ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ...',
      phonetic: "Isti'âdha (Ta'awwuz) puis Al-Fâtiha.",
      translationFr: 'Protection contre Satan, puis récitation de la Fatiha.',
      count: 1,
    },
    {
      titleFr: '2. Istighfâr (Grand Pardon)',
      titleAr: '٢. الاستغفار الكبير',
      arabic:
        'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
      phonetic:
        "Astaghfirullâhal-ʻazîmal-lazî lâ ilâha illâ huwal-hayyul-qayyûm, wa atûbu ilayh.",
      translationFr:
        "Je demande pardon à Dieu l'Immense, Il n'y a de divinité que Lui, le Vivant, l'Immuable. Et je me repens vers Lui.",
      count: 30,
    },
    {
      titleFr: '3. Salâtul Fâtihi',
      titleAr: '٣. صلاة الفاتح',
      arabic:
        'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ الْفَاتِحِ لِمَا أُغْلِقَ وَالْخَاتِمِ لِمَا سَبَقَ...',
      phonetic:
        'Allâhumma çalli ʻalâ sayyidinâ Muhammadinil-fâtihi limâ ughliq...',
      translationFr:
        "Ô Allah ! Prie sur notre Seigneur Muhammad, l'Ouvreur de ce qui était fermé...",
      count: 50,
    },
    { ...SUBHANA, titleFr: '4. ' + SUBHANA.titleFr, titleAr: '٤. ' + SUBHANA.titleAr },
    {
      titleFr: '5. At-Tawhîd (Unitude)',
      titleAr: '٥. التوحيد',
      arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
      phonetic: 'Lâ ilâha illal-lâh.',
      translationFr: "Il n'y a pas de divinité sauf Allah.",
      count: 100,
    },
    {
      titleFr: '6. Djawharatul Kamâl',
      titleAr: '٦. جوهرة الكمال',
      arabic:
        'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى عَيْنِ الرَّحْمَةِ الرَّبَّانِيَّةِ وَالْيَاقُوتَةِ الْمُتَحَقِّقَةِ الْحَائِطَةِ بِمَرْكَزِ الْفُهُومِ وَالْمَعَانِي...',
      phonetic:
        "Allâhumma çalli wa sallim ʻalâ ʻaynir-rahmatar-rabbâniyya, wal-yâqûtatil-mutahaqqiqatil-hâitati bi-markazi...",
      translationFr:
        "Ô Allah ! Prie et accorde la paix sur l'Essence de la miséricorde divine...",
      count: 12,
      requiresWudu: true,
    },
    {
      titleFr: '7. Clôture (S. 33 V. 56)',
      titleAr: '٧. الخاتمة',
      arabic:
        'إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ...',
      phonetic: "Innal-lâha wa malâ-ikatahû yuçallûna ʻalan-nabî...",
      translationFr: "Certes Allah et Ses Anges prient sur le Prophète...",
      count: 1,
    },
  ],

  hadra: [
    {
      titleFr: '1. Ouverture',
      titleAr: '١. الافتتاح',
      arabic:
        'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ ۝ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ...',
      phonetic: "Isti'âdha puis Al-Fâtiha.",
      translationFr: 'Protection contre Satan, puis récitation de la Fatiha.',
      count: 1,
    },
    {
      titleFr: '2. Istighfâr (3x)',
      titleAr: '٢. الاستغفار',
      arabic:
        'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
      phonetic:
        "Astaghfirullâhal-ʻazîmal-lazî lâ ilâha illâ huwal-hayyul-qayyûm, wa atûbu ilayh.",
      translationFr:
        "Je demande pardon à Dieu l'Immense, le Vivant, l'Immuable. Et je me repens vers Lui.",
      count: 3,
    },
    {
      titleFr: '3. Salâtul Fâtihi (3x)',
      titleAr: '٣. صلاة الفاتح',
      arabic:
        'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ الْفَاتِحِ لِمَا أُغْلِقَ...',
      phonetic:
        'Allâhumma çalli ʻalâ sayyidinâ Muhammadinil-fâtihi limâ ughliq...',
      translationFr: "Ô Allah ! Prie sur notre Seigneur Muhammad, l'Ouvreur...",
      count: 3,
    },
    {
      titleFr: '4. Verset de prière (S. 33 V. 56)',
      titleAr: '٤. آية الصلاة على النبي',
      arabic:
        'إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا',
      phonetic:
        "Innal-lâha wa malâ-ikatahû yuçallûna ʻalan-nabî...",
      translationFr:
        'Certes Allah et Ses Anges prient sur le Prophète. Ô croyants, priez sur lui et saluez-le.',
      count: 1,
    },
    {
      titleFr: '5. Grand Zikr (Tawhîd)',
      titleAr: '٥. الذكر الكبير',
      arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
      phonetic: 'Lâ ilâha illal-lâh.',
      translationFr: "Il n'y a pas de divinité sauf Allah.",
      count: 1000,
    },
    {
      titleFr: '6. Finalisation',
      titleAr: '٦. الختام',
      arabic: 'الدُّعَاءُ، ثُمَّ الْفَاتِحَةُ، ثُمَّ صَلَاةُ الْفَاتِحِ',
      phonetic: "Du'â, puis Al-Fâtiha, puis Salâtul Fâtihi (3x).",
      translationFr: "Invocations, puis Fatiha, puis Salâtul Fâtihi (3 fois).",
      count: 3,
    },
    {
      titleFr: '7. Clôture',
      titleAr: '٧. الخاتمة',
      arabic:
        'سُبْحَانَ رَبِّكَ رَبِّ الْعِزَّةِ عَمَّا يَصِفُونَ وَسَلَامٌ عَلَى الْمُرْسَلِينَ وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      phonetic:
        "Subhâna rabbika rabbil-ʻizzati ʻammâ yaçifûna, wa salâmun ʻalal-mursalîna, wal-hamdu lillâhi rabbil-ʻâlamîn.",
      translationFr:
        'Gloire à ton Seigneur, le Seigneur de la majesté. Paix sur les Envoyés. Louange à Allah, Seigneur des Mondes.',
      count: 1,
    },
  ],
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function WirdPage() {
  const [screen, setScreen] = useState<'menu' | 'zikr'>('menu');
  const [lang, setLang] = useState<Lang>('fr');
  const [wirdType, setWirdType] = useState<WirdType | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [target, setTarget] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [savedState, setSavedState] = useState<SavedState | null>(null);
  const [tapFlash, setTapFlash] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const wakeLockRef = useRef<WakeLockLike | null>(null);

  const tr = i18n[lang];

  // Load persisted preferences on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('wird_lang') as Lang | null;
      if (savedLang === 'fr' || savedLang === 'ar') setLang(savedLang);
      const saved = localStorage.getItem('wird_state');
      if (saved) setSavedState(JSON.parse(saved) as SavedState);
    } catch {}

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  const persistState = useCallback((type: WirdType, step: number, count: number) => {
    try {
      localStorage.setItem('wird_state', JSON.stringify({ type, step, count }));
    } catch {}
  }, []);

  const clearState = useCallback(() => {
    try {
      localStorage.removeItem('wird_state');
    } catch {}
    setSavedState(null);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next: Lang = prev === 'fr' ? 'ar' : 'fr';
      try {
        localStorage.setItem('wird_lang', next);
      } catch {}
      return next;
    });
  }, []);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new Ctx();
    }
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
  }, []);

  const playSound = useCallback((type: 'step' | 'milestone' | 'end') => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    const now = ctx.currentTime;
    if (type === 'step') {
      osc.frequency.setValueAtTime(523.25, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
      osc.start(now);
      osc.stop(now + 1);
    } else if (type === 'milestone') {
      osc.frequency.setValueAtTime(783.99, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else {
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.3);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.1, now + 0.25);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      osc.start(now);
      osc.stop(now + 1.5);
    }
  }, []);

  const vibrate = useCallback((pattern: number | number[]) => {
    if ('vibrate' in navigator) navigator.vibrate(pattern);
  }, []);

  const requestWakeLock = useCallback(async () => {
    try {
      if ('wakeLock' in navigator) {
        const nav = navigator as Navigator & {
          wakeLock: { request(t: string): Promise<WakeLockLike> };
        };
        wakeLockRef.current = await nav.wakeLock.request('screen');
      }
    } catch {}
  }, []);

  const releaseWakeLock = useCallback(() => {
    wakeLockRef.current?.release();
    wakeLockRef.current = null;
  }, []);

  const startWird = useCallback(
    (type: WirdType, step = 0, count: number | null = null) => {
      initAudio();
      const s = awradData[type][step];
      setWirdType(type);
      setStepIndex(step);
      setTarget(s.count);
      setRemaining(count ?? s.count);
      setIsCompleted(false);
      setScreen('zikr');
      persistState(type, step, count ?? s.count);
      requestWakeLock();
    },
    [initAudio, persistState, requestWakeLock],
  );

  const resumeWird = useCallback(() => {
    if (savedState) startWird(savedState.type, savedState.step, savedState.count);
  }, [savedState, startWird]);

  const returnToMenu = useCallback(() => {
    if (wirdType && remaining > 0 && !isCompleted) {
      persistState(wirdType, stepIndex, remaining);
      setSavedState({ type: wirdType, step: stepIndex, count: remaining });
    }
    setScreen('menu');
    releaseWakeLock();
  }, [wirdType, remaining, isCompleted, stepIndex, persistState, releaseWakeLock]);

  const handleTap = useCallback(() => {
    if (isCompleted) return;
    initAudio();
    setTapFlash(true);
    setTimeout(() => setTapFlash(false), 200);

    if (remaining > 1) {
      const next = remaining - 1;
      setRemaining(next);
      if (target >= 100 && next % 100 === 0 && next > 0) {
        playSound('milestone');
        vibrate([30, 50, 30]);
      } else {
        vibrate(15);
      }
      if (wirdType) persistState(wirdType, stepIndex, next);
    } else {
      const steps = awradData[wirdType!];
      if (stepIndex < steps.length - 1) {
        const nextIdx = stepIndex + 1;
        const nextStep = steps[nextIdx];
        setStepIndex(nextIdx);
        setTarget(nextStep.count);
        setRemaining(nextStep.count);
        vibrate([100, 50, 100]);
        playSound('step');
        if (wirdType) persistState(wirdType, nextIdx, nextStep.count);
      } else {
        setIsCompleted(true);
        setRemaining(0);
        vibrate([200, 100, 200, 100, 400]);
        playSound('end');
        clearState();
        releaseWakeLock();
      }
    }
  }, [
    isCompleted,
    remaining,
    target,
    wirdType,
    stepIndex,
    initAudio,
    playSound,
    vibrate,
    persistState,
    clearState,
    releaseWakeLock,
  ]);

  const handleUndo = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isCompleted || remaining >= target) return;
      initAudio();
      const next = remaining + 1;
      setRemaining(next);
      vibrate(20);
      if (wirdType) persistState(wirdType, stepIndex, next);
    },
    [isCompleted, remaining, target, wirdType, stepIndex, initAudio, vibrate, persistState],
  );

  // Derived state
  const currentStep = wirdType ? awradData[wirdType][stepIndex] : null;
  const steps = wirdType ? awradData[wirdType] : [];
  const progressPercent = isCompleted ? 100 : target > 0 ? ((target - remaining) / target) * 100 : 0;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const doneStep: WirdStep = {
    titleFr: tr.doneTitle,
    titleAr: tr.doneTitle,
    arabic: 'تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ',
    phonetic: 'Taqabbal Allâhu minnâ wa minkum',
    translationFr: tr.doneAccept,
    count: 0,
  };

  const displayStep = isCompleted ? doneStep : currentStep;
  const stepTitle = displayStep
    ? lang === 'ar'
      ? displayStep.titleAr
      : displayStep.titleFr
    : '';

  const wirdColors: Record<WirdType, string> = {
    lazim: 'text-white',
    wazifa: 'text-emerald-500',
    hadra: 'text-amber-500',
  };

  return (
    <div
      className="fixed inset-0 bg-black text-gray-200 flex flex-col overflow-hidden"
      style={{ touchAction: 'manipulation', WebkitUserSelect: 'none', userSelect: 'none' }}
    >
      {/* ── MENU SCREEN ─────────────────────────────────────────────── */}
      {screen === 'menu' && (
        <div className="flex flex-col h-full p-8 bg-black" dir={dir}>
          <div className="mt-16 mb-10 text-center relative">
            <button
              onClick={toggleLang}
              className="absolute top-0 right-0 text-xs font-semibold text-zinc-400 border border-zinc-700 rounded-full px-3 py-1.5 transition-colors active:bg-zinc-800 active:text-emerald-400"
            >
              {tr.langToggle}
            </button>
            <h1 className="text-4xl font-extrabold text-emerald-500 tracking-tight">{tr.appTitle}</h1>
            <p className="text-zinc-500 mt-3 text-sm uppercase tracking-widest font-semibold">{tr.appSub}</p>
          </div>

          <div className="flex flex-col gap-5 flex-1 justify-start items-stretch w-full max-w-md mx-auto">
            {savedState && (
              <button
                onClick={resumeWird}
                className="bg-emerald-900/30 border border-emerald-500/50 active:bg-emerald-900/50 p-6 rounded-3xl shadow-xl transition-all mb-2 text-center"
              >
                <span className="text-xl font-bold text-emerald-400 mb-1 block">{tr.resumeBtn}</span>
                <span className="text-sm text-emerald-200/70 block">
                  {tr.wirdNames[savedState.type]} —{' '}
                  {tr.stepOf(savedState.step + 1, awradData[savedState.type].length)} —{' '}
                  {tr.remaining(savedState.count)}
                </span>
              </button>
            )}

            {(['lazim', 'wazifa', 'hadra'] as WirdType[]).map(type => (
              <button
                key={type}
                onClick={() => startWird(type)}
                className="bg-zinc-900 active:bg-zinc-800 p-7 rounded-3xl shadow-xl transition-all border border-zinc-800 active:border-emerald-500/30 text-left flex flex-col"
              >
                <span className={`text-3xl font-bold mb-2 ${wirdColors[type]}`}>
                  {tr.wirdNames[type]}
                </span>
                <span className="text-sm text-zinc-400">{tr.wirdSubs[type]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── ZIKR SCREEN ─────────────────────────────────────────────── */}
      {screen === 'zikr' && displayStep && (
        <div className="flex flex-col h-full bg-black relative">
          {/* Header card */}
          <div className="relative flex-shrink-0 bg-zinc-900 p-6 pb-8 rounded-b-3xl shadow-2xl z-10 border-b border-zinc-800">
            <button
              onClick={returnToMenu}
              className="absolute top-6 left-6 p-2 text-zinc-400 bg-zinc-800 active:bg-zinc-700 rounded-full transition-colors"
              aria-label="Retour au menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>

            {/* Step progress dots */}
            {!isCompleted && wirdType && (
              <div className="absolute top-7 right-6 flex gap-1.5 items-center">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i === stepIndex
                        ? 'w-5 h-2 bg-emerald-500'
                        : i < stepIndex
                        ? 'w-2 h-2 bg-emerald-700'
                        : 'w-2 h-2 bg-zinc-700'
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="mt-12 text-center px-4">
              <h2 className="text-base font-bold text-emerald-500 uppercase tracking-widest mb-4">
                {stepTitle}
              </h2>

              {displayStep.requiresWudu && (
                <div className="inline-flex items-center bg-red-900/30 border border-red-500/50 text-red-400 text-xs uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 font-bold animate-pulse">
                  {tr.wuduAlert}
                </div>
              )}

              <p
                className="text-4xl leading-relaxed mb-4 text-gray-100"
                dir="rtl"
                style={{
                  fontFamily: "'Amiri', 'Noto Naskh Arabic', 'Arabic UI Text', Georgia, serif",
                }}
              >
                {displayStep.arabic}
              </p>
              <p className="text-sm text-zinc-400 italic mb-2 leading-relaxed">{displayStep.phonetic}</p>
              <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-wide">
                {displayStep.translationFr}
              </p>
            </div>
          </div>

          {/* Tap zone */}
          <button
            onClick={handleTap}
            disabled={isCompleted}
            className={`flex-1 w-full flex flex-col justify-center items-center outline-none focus:outline-none relative overflow-hidden transition-colors duration-200 ${
              tapFlash ? 'bg-emerald-500/15' : 'bg-black'
            } ${isCompleted ? 'cursor-default' : ''}`}
          >
            <div
              className={`font-black tracking-tighter transition-all duration-100 ${
                isCompleted ? 'text-emerald-400 text-8xl' : 'text-white'
              }`}
              style={{
                fontSize: isCompleted ? undefined : 'clamp(6rem, 28vw, 11rem)',
                lineHeight: 1,
              }}
            >
              {isCompleted ? '✓' : remaining}
            </div>

            {isCompleted && (
              <button
                onClick={returnToMenu}
                className="mt-8 text-sm text-zinc-400 border border-zinc-700 rounded-full px-6 py-2.5 active:border-emerald-600 active:text-emerald-400 transition-colors"
              >
                {tr.backToMenu}
              </button>
            )}

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-900">
              <div
                className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </button>

          {/* Undo button */}
          {!isCompleted && (
            <button
              onClick={handleUndo}
              className="absolute bottom-10 right-6 w-14 h-14 bg-zinc-800/80 backdrop-blur-md border border-zinc-700 text-zinc-300 rounded-full flex items-center justify-center text-xl font-bold shadow-lg active:bg-zinc-700 active:scale-90 transition-all z-20"
            >
              -1
            </button>
          )}
        </div>
      )}
    </div>
  );
}
