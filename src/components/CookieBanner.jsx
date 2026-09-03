import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getAnalyticsConsent,
  loadSiteAnalytics,
  setAnalyticsCollectionEnabled,
  setAnalyticsConsent,
  trackPageView,
} from '../utils/analytics';

function useDialogFocusTrap(active) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!active || !dialogRef.current) return undefined;
    const dialog = dialogRef.current;
    const getFocusable = () => Array.from(dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return;
      const focusable = getFocusable(); if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const onFocusIn = (event) => { if (!dialog.contains(event.target)) getFocusable()[0]?.focus(); };
    document.addEventListener('keydown', onKeyDown); document.addEventListener('focusin', onFocusIn);
    return () => { document.removeEventListener('keydown', onKeyDown); document.removeEventListener('focusin', onFocusIn); };
  }, [active]);
  return dialogRef;
}

export default function CookieBanner() {
  const { pathname, search } = useLocation();
  const isPrivateArea = pathname === '/admin' || pathname.startsWith('/dashboard');
  const [visible, setVisible] = useState(() => {
    const saved = getAnalyticsConsent();
    return saved !== 'accepted' && saved !== 'rejected';
  });
  const dialogRef = useDialogFocusTrap(visible && !isPrivateArea);

  useEffect(() => {
    const enabled = !isPrivateArea && getAnalyticsConsent() === 'accepted';
    setAnalyticsCollectionEnabled(enabled);
    if (enabled) loadSiteAnalytics();
  }, [isPrivateArea]);

  useEffect(() => {
    if (!isPrivateArea) trackPageView(`${pathname}${search}`);
  }, [isPrivateArea, pathname, search]);

  useEffect(() => {
    if (!visible || isPrivateArea) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [visible, isPrivateArea]);

  const handleAccept = () => {
    setAnalyticsConsent('accepted');
    loadSiteAnalytics();
    setVisible(false);
  };

  const handleReject = () => {
    setAnalyticsConsent('rejected');
    setAnalyticsCollectionEnabled(false);
    setVisible(false);
  };

  if (!visible || isPrivateArea) return null;

  return (
    <div className="fixed inset-0 z-[2147483647] min-h-screen min-h-[100dvh] bg-slate-950/80 backdrop-blur-md px-4 flex items-center justify-center">
      <section ref={dialogRef} style={{ width: 'min(100%, 36rem)', boxSizing: 'border-box', maxHeight: 'calc(100dvh - 2rem)', overflowY: 'auto' }} role="dialog" aria-modal="true" aria-labelledby="analytics-consent-title" aria-describedby="analytics-consent-description" className="bg-verde-dark text-white rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl">
        <div aria-hidden="true" className="w-12 h-12 rounded-full bg-white/10 grid place-items-center text-2xl mb-4">🍪</div>
        <h2 id="analytics-consent-title" className="text-2xl font-bold mb-3">Elegí cómo querés navegar</h2>
        <p id="analytics-consent-description" className="text-sm sm:text-base text-white/80 leading-relaxed">
          Las cookies esenciales permiten que ADUCMA funcione. Si aceptás estadísticas, Google Analytics y Microsoft Clarity nos ayudan a conocer las visitas y mejorar el sitio. No reciben los datos que escribís en formularios.
        </p>
        <p className="text-xs sm:text-sm text-white/60 mt-3">
          Podés entrar aunque no aceptes estadísticas. Sin elegir una opción no se puede continuar.{' '}
          <a className="underline text-white" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacidad de Google</a>
        </p>
        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
          <button
            autoFocus
            onClick={handleReject}
            className="flex-1 px-4 py-3 text-sm border border-white/50 rounded-xl hover:bg-white/10 transition-colors"
          >
            Continuar solo con esenciales
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-3 text-sm bg-white text-verde-dark font-semibold rounded-xl hover:bg-crema transition-colors"
          >
            Aceptar estadísticas
          </button>
        </div>
      </section>
    </div>
  );
}
