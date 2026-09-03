export const ANALYTICS_CONSENT_STORAGE_KEY = "aducma_analytics_consent_v2";

const GOOGLE_ANALYTICS_ID = "G-3CDC6M6EZN";
const SITE_NAME = "ADUCMA";
const CLARITY_ID = "v8qe6xvo6i";
const GA_SCRIPT_ID = "aducma-google-analytics";
const CLARITY_SCRIPT_ID = "aducma-clarity";
const INITIALIZED_KEY = "__aducmaGoogleAnalyticsInitialized";
const LAST_PAGE_KEY = "__aducmaLastAnalyticsPage";
const GA_DISABLE_KEY = `ga-disable-${GOOGLE_ANALYTICS_ID}`;
let sessionConsentDecision = null;

const canUseBrowserApis = () => typeof window !== "undefined" && typeof document !== "undefined";

export function getAnalyticsConsent() {
  if (!canUseBrowserApis()) return null;
  try { return window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY); }
  catch { return sessionConsentDecision; }
}
export function setAnalyticsConsent(decision) {
  sessionConsentDecision = decision;
  try { window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, decision); }
  catch { /* La preferencia se conserva durante esta visita. */ }
}
export const hasAnalyticsConsent = () => getAnalyticsConsent() === "accepted";

export function setAnalyticsCollectionEnabled(enabled) {
  if (!canUseBrowserApis()) return;
  window[GA_DISABLE_KEY] = !enabled;
  if (!window.clarity) return;
  window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: enabled ? "granted" : "denied" });
  if (!enabled) window.clarity("consent", false);
}

export function loadClarity() {
  if (!hasAnalyticsConsent() || window.clarity) return false;
  window.clarity = function clarity() { (window.clarity.q = window.clarity.q || []).push(arguments); };
  setAnalyticsCollectionEnabled(true);
  const script = document.createElement("script");
  script.id = CLARITY_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);
  return true;
}

export function trackPageView(pagePath) {
  if (!hasAnalyticsConsent() || !window[INITIALIZED_KEY] || typeof window.gtag !== "function") return false;
  const path = (pagePath || window.location.pathname).split("?")[0];
  if (window[LAST_PAGE_KEY] === path) return false;
  window.gtag("event", "page_view", { page_location: `${window.location.origin}${path}`, page_path: path, page_title: `${SITE_NAME} | ${document.title}`, content_group: SITE_NAME });
  window[LAST_PAGE_KEY] = path;
  return true;
}

export function loadGoogleAnalytics() {
  if (!hasAnalyticsConsent()) return false;
  setAnalyticsCollectionEnabled(true);
  if (window[INITIALIZED_KEY]) return true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  if (!document.getElementById(GA_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
    document.head.appendChild(script);
  }
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ANALYTICS_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, content_group: SITE_NAME });
  window[INITIALIZED_KEY] = true;
  trackPageView();
  return true;
}

export function loadSiteAnalytics() {
  loadClarity();
  loadGoogleAnalytics();
}

export function trackAnalyticsEvent(eventName, parameters = {}) {
  if (!hasAnalyticsConsent() || typeof window.gtag !== "function") return false;
  window.gtag("event", eventName, { content_group: SITE_NAME, ...parameters });
  return true;
}
