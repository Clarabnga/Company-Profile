"use client";

import {useEffect} from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    console.error("GKN global error", error);
  }, [error]);

  return (
    <html lang="id">
      <body style={{margin: 0, background: "#f7f4ec", color: "#102a43"}}>
        <main
          role="alert"
          style={{
            minHeight: "100vh",
            display: "grid",
            placeContent: "center",
            gap: 16,
            padding: 24,
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <p style={{margin: 0, color: "#4f765f", fontWeight: 700}}>
            Garda Karya Nusantara
          </p>
          <h1 style={{margin: 0, fontSize: "clamp(2rem, 6vw, 4rem)"}}>
            Halaman mengalami kendala
          </h1>
          <p style={{margin: 0, color: "#586674"}}>
            Page rendering encountered an issue. Please try again.
          </p>
          {error.digest && <small>Reference: {error.digest}</small>}
          <button
            type="button"
            onClick={reset}
            style={{
              justifySelf: "center",
              minHeight: 48,
              padding: "12px 22px",
              border: 0,
              borderRadius: 8,
              background: "#4f765f",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Coba lagi / Try again
          </button>
        </main>
      </body>
    </html>
  );
}
