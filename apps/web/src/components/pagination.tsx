import { calculatePageNumbers } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
  className?: string;
};
const Pagination = ({
  totalPages,
  currentPage,
  pageNeighbors = 2,
  className,
}: Props) => {
  //  ... 3 4 5 6 7 ...
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    currentPage,
    totalPages,
  });

  return (
    <div className={cn("flex items-center justify-center gap-1.5", className)}>
      {/* pervious page button */}
      {currentPage !== 1 && (
        <button className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200">
          <Link href={`?page=${currentPage - 1}`}>
            <ChevronLeftIcon className="w-4" />
          </Link>
        </button>
      )}

      {pageNumbers.map((page, index) => (
        <button
          key={index}
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
          {page === "..." ? "..." : <Link href={`?page=${page}`}>{page}</Link>}
        </button>
      ))}
      {/* next page button */}
      {currentPage !== totalPages && (
        <button className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200">
          <Link href={`?page=${currentPage + 1}`}>
            <ChevronRightIcon className="w-4" />
          </Link>
        </button>
      )}
    </div>
  );
};

export default Pagination;
