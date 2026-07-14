"use client";

import {useEffect} from "react";
import {usePathname} from "next/navigation";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  const pathname = usePathname();
  const isIndonesian = pathname?.startsWith("/id");

  useEffect(() => {
    console.error("GKN page error", error);
  }, [error]);

  return (
    <main className="error-recovery" role="alert">
      <span>{isIndonesian ? "Terjadi kendala" : "Something went wrong"}</span>
      <h1>
        {isIndonesian
          ? "Halaman belum dapat ditampilkan"
          : "The page could not be displayed"}
      </h1>
      <p>
        {isIndonesian
          ? "Coba muat ulang bagian ini. Jika kendala berlanjut, kembali ke beranda."
          : "Try loading this section again. If the issue continues, return home."}
      </p>
      {error.digest && <small>Reference: {error.digest}</small>}
      <div className="actions">
        <button className="button" type="button" onClick={reset}>
          {isIndonesian ? "Coba Lagi" : "Try Again"}
        </button>
        <a className="button outline" href={isIndonesian ? "/id" : "/en"}>
          {isIndonesian ? "Kembali ke Beranda" : "Back to Home"}
        </a>
      </div>
    </main>
  );
}
