import { useEffect, useState } from "react";
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
        `https://api.freeapi.app/api/v1/public/books?page=${pageNum}`,
      );
      const book = await res.json();
      setBooks(book.data.data);
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
    <section className="bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-6">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              Explore
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900">
              Browse the bookshelf
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Page {page}{totalPages ? ` of ${totalPages}` : ""}
            </p>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="rounded-lg bg-stone-900 px-3 py-2 text-sm font-semibold text-white">
              {page}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={(totalPages !== null && page >= totalPages) || loading}
              className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[430px] animate-pulse rounded-xl border border-stone-200 bg-stone-100"
              />
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
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
        ) : (
          <div className="rounded-xl border border-stone-200 bg-white p-10 text-center text-sm text-stone-500">
            No books available right now.
          </div>
        )}

        {!loading && books.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-3 sm:hidden">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="rounded-lg bg-stone-900 px-3 py-2 text-sm font-semibold text-white">
              {page}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={totalPages !== null && page >= totalPages}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
