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
    <div className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Cover Image */}
      <div className="relative bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center h-52 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-zinc-400 dark:text-zinc-600">
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
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <span className="text-xs">No Cover</span>
          </div>
        )}

        {/* Year badge */}
        {year && (
          <span className="absolute top-2 right-2 bg-black/60 text-white text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
            {year}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title + Subtitle */}
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base leading-snug line-clamp-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Authors */}
        {authors && authors.length > 0 && (
          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium line-clamp-1">
            {authors.join(", ")}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed flex-1">
            {description}
          </p>
        )}

        {/* Footer Meta */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 mt-auto">
          {pageCount ? (
            <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {pageCount} pages
            </span>
          ) : (
            <span />
          )}

          {/* Categories */}
          {categories && categories.length > 0 && (
            <span className="text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full font-medium truncate max-w-[120px]">
              {categories[0]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
