/*
========================================
Pagination Component
========================================
Page numbers render karta hai.
Reusable component.
*/

export default function ProductPagination({ currentPage, setPage }: any) {
  return (
    <div className="flex justify-center gap-3 mt-10">
      <button
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        className="px-4 py-2 border"
      >
        Prev
      </button>

      <span>Page {currentPage}</span>

      <button
        onClick={() => setPage(prev => prev + 1)}
        className="px-4 py-2 border"
      >
        Next
      </button>
    </div>
  );
}
