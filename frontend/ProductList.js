import { useEffect, useState } from "react";
import { getAllProducts, searchProducts } from "../services/api";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ search: "", category: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const isFiltering = filters.search || filters.category;
        const data = isFiltering
          ? await searchProducts(filters)
          : await getAllProducts();

        setProducts(data);
      } catch (err) {
        console.error("API call failed:", err);
      }
    };

    fetchProducts();
  }, [filters]);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem 1rem",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      <div
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "24px",
        }}
      >
        {products.length > 0 ? (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
