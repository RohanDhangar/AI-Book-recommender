import { useState, useEffect } from "react";
import BookCard from "./BookCard";

export default function ListBooks() {
  const [books, setBooks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const fetchBooks = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.freeapi.app/api/v1/public/books?page=${pageNum}`
      );
      const book = await res.json();
      setBooks(book.data.data);
      // If the API returns total pages info, capture it
      if (book.data.totalPages) setTotalPages(book.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              📚 Book Explorer
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Page {page}{totalPages ? ` of ${totalPages}` : ""}
            </p>
          </div>

          {/* Pagination controls — also in header for quick access */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 w-6 text-center">
              {page}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={(totalPages !== null && page >= totalPages) || loading}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Book Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          /* Skeleton loader */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse h-80" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {books.map((book: any, index: number) => {
              const {
                title,
                description,
                subtitle,
                authors,
                imageLinks,
                publishedDate,
                pageCount,
                categories,
              } = book.volumeInfo;

              return (
                <BookCard
                  key={book.id ?? index}
                  title={title}
                  description={description}
                  subtitle={subtitle}
                  authors={authors}
                  thumbnail={imageLinks?.thumbnail}
                  publishedDate={publishedDate}
                  pageCount={pageCount}
                  categories={categories}
                />
              );
            })}
          </div>
        )}

        {/* Bottom Pagination */}
        {!loading && books.length > 0 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <span className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-sm">
              {page}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={totalPages !== null && page >= totalPages}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}