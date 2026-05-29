import { calculatePageNumbers } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type Props = {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
  setCurrentPage: (page: number) => void;
  className?: string;
};
const CommentPagination = ({
  pageNeighbors = 2,
  currentPage,
  totalPages,
  setCurrentPage,
  className,
}: Props) => {
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    currentPage,
    totalPages,
  });

  const handleClick = (page: number | string) => {
    if (typeof page === "number" && page > 0 && page <= totalPages)
      setCurrentPage(page);
  };

  return (
    <div className={cn(className, "flex items-center justify-center gap-1.5")}>
      {/* pervious page button */}
      {currentPage !== 1 && (
        <button
          onClick={() => handleClick(currentPage - 1)}
          className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
        >
          <ChevronLeftIcon className="w-4" />
        </button>
      )}

      {pageNumbers.map((page, index) => (
        <button
          onClick={() => handleClick(page)}
          key={index}
          disabled={page === "..."}
          className={cn(
            "flex size-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
            {
              "bg-gray-100 text-gray-600 hover:bg-gray-200":
                currentPage !== page && page !== "...",
              "bg-gray-900 text-white": currentPage === page,
              "cursor-not-allowed text-gray-400": page === "...",
            },
          )}
        >
          {page === "..." ? "..." : <span>{page}</span>}
        </button>
      ))}
      {/* next page button */}
      {currentPage !== totalPages && (
        <button
          onClick={() => handleClick(currentPage + 1)}
          className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
        >
          <ChevronRightIcon className="w-4" />
        </button>
      )}
    </div>
  );
};

export default CommentPagination;
