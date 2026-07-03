type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-6 mt-10">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="glass px-5 py-2 rounded-xl disabled:opacity-40"
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="glass px-5 py-2 rounded-xl disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}