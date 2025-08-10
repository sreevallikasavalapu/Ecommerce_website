export default function ProductCard({ product }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "1rem",
      margin: "0.5rem",
      width: "200px",
      transition: "transform 0.2s",
      cursor: "pointer",
    }} 
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        style={{ width: "100%", borderRadius: "4px", objectFit: "cover", height: "150px" }} 
      />
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
    </div>
  );
}
