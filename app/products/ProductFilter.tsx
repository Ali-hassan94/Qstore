/*
========================================
ProductFilter Component
========================================
- Filters products by category or price
- Optional reusable component
*/

export default function ProductFilter({
  category,
  setCategory,
  priceRange,
  setPriceRange,
}: any) {
  return (
    <div className="flex gap-4 mb-6">
      {/* Category Filter */}
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border p-2"
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="books">Books</option>
      </select>

      {/* Price Filter */}
      <select
        value={priceRange}
        onChange={e => setPriceRange(e.target.value)}
        className="border p-2"
      >
        <option value="">All Prices</option>
        <option value="0-50">0 - 50$</option>
        <option value="50-100">50 - 100$</option>
        <option value="100-500">100 - 500$</option>
      </select>
    </div>
  );
}
