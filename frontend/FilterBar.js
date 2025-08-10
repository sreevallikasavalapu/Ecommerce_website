export default function FilterBar({ filters, setFilters }) {
  const clearFilters = () => setFilters({ search: "", category: "" });

  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        style={{
          padding: "0.5rem",
          width: "200px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      
      {/* Category Dropdown */}
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        style={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <option value="">All Categories</option>
        <option value="Fashion">Fashion</option>
        <option value="Electronics">Electronics</option>
        {/* Add more categories as needed */}
      </select>

      {/* Clear Filters Button */}
      <button 
        onClick={clearFilters}
        style={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Clear Filters
      </button>
    </div>
  );
}
