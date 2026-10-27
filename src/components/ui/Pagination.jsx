import { ChevronLeft, ChevronRight } from "lucide-react";

const getVisiblePages = (currentPage, totalPages) => {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, index) => index);
    }

    const start = Math.max(0, Math.min(currentPage - 2, totalPages - 5));

    return Array.from({ length: 5 }, (_, index) => start + index);
};

export default function Pagination({
    currentPage = 0,
    totalPages = 0,
    onPageChange,
    className = ""
}) {
    if (totalPages <= 1) return null;

    const pages = getVisiblePages(currentPage, totalPages);

    return (
        <nav className={`ui-pagination ${className}`.trim()} aria-label="Pagination">
            <button
                type="button"
                className="ui-pagination-button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 0}
                aria-label="Previous page"
            >
                <ChevronLeft size={16} />
            </button>
            {pages[0] > 0 && (
                <>
                    <button type="button" className="ui-pagination-button" onClick={() => onPageChange(0)}>
                        1
                    </button>
                    {pages[0] > 1 && <span className="ui-pagination-ellipsis">…</span>}
                </>
            )}
            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    className={`ui-pagination-button ${page === currentPage ? "is-active" : ""}`}
                    onClick={() => onPageChange(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                >
                    {page + 1}
                </button>
            ))}
            {pages[pages.length - 1] < totalPages - 1 && (
                <>
                    {pages[pages.length - 1] < totalPages - 2 && (
                        <span className="ui-pagination-ellipsis">…</span>
                    )}
                    <button
                        type="button"
                        className="ui-pagination-button"
                        onClick={() => onPageChange(totalPages - 1)}
                    >
                        {totalPages}
                    </button>
                </>
            )}
            <button
                type="button"
                className="ui-pagination-button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                aria-label="Next page"
            >
                <ChevronRight size={16} />
            </button>
        </nav>
    );
}
