/**
 * Spotify OAuth PKCE (tarayıcıda güvenli, sunucu gerektirmez).
 * .env dosyasına VITE_SPOTIFY_CLIENT_ID ekle (Spotify Developer Dashboard'dan).
 */

const SPOTIFY_AUTH = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN = "https://accounts.spotify.com/api/token";
const SPOTIFY_API = "https://api.spotify.com/v1";
const SCOPE = "playlist-read-private playlist-read-collaborative";

function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function generateCodeChallenge(): Promise<{ verifier: string; challenge: string }> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const verifier = base64UrlEncode(array.buffer);
  const encoder = new TextEncoder();
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(verifier));
  const challenge = base64UrlEncode(digest);
  return { verifier, challenge };
}

export function getRedirectUri(): string {
  return typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";
}

export function loginSpotify(clientId: string): void {
  generateCodeChallenge().then(({ verifier, challenge }) => {
    sessionStorage.setItem("spotify_code_verifier", verifier);
    const params = new URLSearchParams({
      client_id: clientId,
      response_type: "code",
      redirect_uri: getRedirectUri(),
      scope: SCOPE,
      code_challenge_method: "S256",
      code_challenge: challenge,
    });
    window.location.href = `${SPOTIFY_AUTH}?${params.toString()}`;
  });
}

export async function exchangeCodeForToken(
  clientId: string,
  code: string
): Promise<{ access_token: string; expires_in: number }> {
  const verifier = sessionStorage.getItem("spotify_code_verifier");
  if (!verifier) throw new Error("code_verifier yok");
  sessionStorage.removeItem("spotify_code_verifier");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: getRedirectUri(),
    client_id: clientId,
    code_verifier: verifier,
  });

  const res = await fetch(SPOTIFY_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Token alınamadı");
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };
  return data;
}

export async function fetchUserPlaylists(accessToken: string): Promise<SpotifyPlaylist[]> {
  const out: SpotifyPlaylist[] = [];
  let url: string | null = `${SPOTIFY_API}/me/playlists?limit=50`;
  while (url) {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error("Çalma listeleri alınamadı");
    const data = (await res.json()) as {
      items: Array<{
        id: string;
        name: string;
        external_urls: { spotify: string };
        uri: string;
      }>;
      next: string | null;
    };
    for (const p of data.items) {
      out.push({
        id: p.id,
        name: p.name,
        url: p.external_urls.spotify,
      });
    }
    url = data.next;
  }
  return out;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  url: string;
}

const TOKEN_KEY = "coffee-pomodoro-spotify-token";

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* ignore */
  }
}

export function clearStoredToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}
