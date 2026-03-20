import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('aducma_cookie_consent');
    if (!consent) {
      setVisible(true);
    } else if (consent === 'accepted') {
      loadClarity();
    }
  }, []);

  const loadClarity = () => {
    if (window.clarity) return;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'v8qe6xvo6i');
  };

  const handleAccept = () => {
    localStorage.setItem('aducma_cookie_consent', 'accepted');
    loadClarity();
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('aducma_cookie_consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-verde-dark text-white px-4 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm flex-1">
          Usamos cookies para mejorar tu experiencia en el sitio. Las cookies analíticas nos ayudan a entender cómo navegás. Podés aceptarlas o rechazarlas.{' '}
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm border border-white/50 rounded hover:bg-white/10 transition-colors"
          >
            Solo esenciales
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-white text-verde-dark font-semibold rounded hover:bg-crema transition-colors"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
