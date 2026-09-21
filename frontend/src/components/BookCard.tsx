interface BookCardProps {
  title: string;
  description?: string;
  subtitle?: string;
  authors?: string[];
  thumbnail?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
}

export default function BookCard({
  title,
  description,
  subtitle,
  authors,
  thumbnail,
  publishedDate,
  pageCount,
  categories,
}: BookCardProps) {
  const year = publishedDate ? new Date(publishedDate).getFullYear() : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-stone-100">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-stone-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <span className="text-xs">No cover</span>
          </div>
        )}

        {year && (
          <span className="absolute right-3 top-3 rounded-full bg-stone-900/75 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            {year}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-stone-900">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-1 line-clamp-1 text-xs text-stone-500">{subtitle}</p>
        )}

        {authors && authors.length > 0 && (
          <p className="mt-3 line-clamp-1 text-sm font-medium text-amber-700">
            {authors.join(", ")}
          </p>
        )}

        {description && (
          <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-stone-500">
            {description}
          </p>
        )}

        <div className="mt-5 flex min-h-7 items-center justify-between border-t border-stone-100 pt-3">
          {pageCount ? (
            <span className="text-xs text-stone-400">{pageCount} pages</span>
          ) : (
            <span />
          )}

          {categories && categories.length > 0 && (
            <span className="max-w-[140px] truncate rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
              {categories[0]}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
