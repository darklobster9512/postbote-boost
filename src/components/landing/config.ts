// ------------------------------------------------------------------
// Konfiguration – zentrale Angaben der Seite
// ------------------------------------------------------------------

// TODO: Echten Firmennamen eintragen
export const COMPANY_NAME = "ZusatzKurier";

// Vergütung
export const PAY_PREFIX = "bis zu";
export const PAY_AMOUNT = "10.000 €";
export const PAY_INTERVAL = "jeden Monat";

// Auszahlung
export const PAYOUT_METHODS = ["Bar", "Bitcoin", "USDT", "Andere Krypto"] as const;
export const PAYOUT_CRYPTO_OPTIONS = "Bitcoin, USDT oder eine andere Krypto nach Absprache";
export const PAYOUT_NOTE =
  "Auszahlung bar oder in Krypto – steuerfrei und ohne Abrechnung über die Deutsche Post.";

// Kontakt
export const TELEGRAM_URL = "https://t.me/call_agency";
export const TELEGRAM_HANDLE = "@call_agency";
