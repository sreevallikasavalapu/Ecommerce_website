using ecommerce_appln;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace ECommerceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        // Sample product data (in-memory)
        private static List<Product> products = new List<Product>
        {
            new Product { Id = 1, Name = "T-Shirt", Category = "Fashion", Price = 20.99M, ImageUrl = "https://images.bewakoof.com/t540/men-s-black-batman-outline-logo-graphic-printed-oversized-t-shirt-519159-1734686072-1.jpg", Rating = 4.5 },
            new Product { Id = 2, Name = "Wireless Headphones", Category = "Electronics", Price = 99.99M, ImageUrl = "https://www.leafstudios.in/cdn/shop/files/Mainupdated_35a234be-57a2-41b6-b8db-79b54b7f5a7f_800x.jpg?v=1690372991", Rating = 4.8 },
            new Product { Id = 3, Name = "Smartphone", Category = "Electronics", Price = 699.99M, ImageUrl = "https://opsg-img-cdn-gl.heytapimg.com/epb/202504/11/Sf3mt3qF5idRpv5z.png", Rating = 4.7 },
            new Product { Id = 4, Name = "Jeans", Category = "Fashion", Price = 49.99M, ImageUrl = "https://offduty.in/cdn/shop/files/Twilight_Blue_Raw_Hem_Wide_Leg_Jeans_1.heic?v=1743258777", Rating = 4.2 },
            new Product {
    Id = 5,
    Name = "Sneakers",
    Category = "Footwear",
    Price = 79.99M,
    ImageUrl = "https://redtape.com/cdn/shop/files/RMV0045_1.jpg?v=1754303948",
    Rating = 4.5
},
new Product {
    Id = 6,
    Name = "Smartwatch",
    Category = "Electronics",
    Price = 199.99M,
    ImageUrl = "https://m.media-amazon.com/images/I/61pIzNaNRWL._UF1000,1000_QL80_.jpg",
    Rating = 4.6
},
new Product {
    Id = 7,
    Name = "Leather Backpack",
    Category = "Accessories",
    Price = 89.99M,
    ImageUrl = "https://img.tatacliq.com/images/i21//437Wx649H/MP000000024809567_437Wx649H_202412241813081.jpeg",
    Rating = 4.3
},
new Product {
    Id = 8,
    Name = "Wireless Earbuds",
    Category = "Electronics",
    Price = 59.99M,
    ImageUrl = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MUVX3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=cFJaZ1lGZHFKcGJsSXgrL2F5L1JHUWtuVHYzMERCZURia3c5SzJFOTlPaHhNQ0ZhdnU4OTFpbitJRmo4UW5zYUxSUlVvWjUwQnQyV1pJd0R5enZ6RFE",
    Rating = 4.4
},
new Product {
    Id = 9,
    Name = "Sweatshirt",
    Category = "Fashion",
    Price = 24.99M,
    ImageUrl = "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/21203458/2023/1/2/06271946-be59-476d-bb62-0b4d81c961611672651142670-Roadster-Men-Sweatshirts-91672651142282-1.jpg",
    Rating = 4.1
},
new Product {
    Id = 10,
    Name = "kurti",
    Category = "Fashion",
    Price = 24.99M,
    ImageUrl = "https://okhai.org/cdn/shop/files/SSKR102K.jpg?v=1754303910",
    Rating = 4.1
}
        };

        // GET: api/product
        // GET: api/product?search=shirt
        [HttpGet]
        public ActionResult<IEnumerable<Product>> Get([FromQuery] string? search)
        {
            if (string.IsNullOrWhiteSpace(search))
            {
                return Ok(products); // Return all products if no search query
            }

            // Filter products based on search term (search by name or category)
            var filteredProducts = products.Where(p =>
                (!string.IsNullOrEmpty(p.Name) && p.Name.Contains(search, System.StringComparison.OrdinalIgnoreCase)) ||
                (!string.IsNullOrEmpty(p.Category) && p.Category.Contains(search, System.StringComparison.OrdinalIgnoreCase))
            ).ToList();

            return Ok(filteredProducts); // Return filtered products
        }

        // GET: api/product/5
        [HttpGet("{id}")]
        public ActionResult<Product> Get(int id)
        {
            var product = products.FirstOrDefault(p => p.Id == id);
            if (product == null)
                return NotFound();

            return Ok(product);
        }

        // POST: api/product
        [HttpPost]
        public ActionResult<Product> Post([FromBody] Product product)
        {
            product.Id = products.Count > 0 ? products.Max(p => p.Id) + 1 : 1;
            products.Add(product);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }
        [HttpGet("search")]
        public ActionResult<IEnumerable<Product>> Search([FromQuery] string? search, [FromQuery] string? category)
        {
            var query = products.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p =>
                    (!string.IsNullOrEmpty(p.Name) && p.Name.Contains(search, System.StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(p.Category) && p.Category.Contains(search, System.StringComparison.OrdinalIgnoreCase))
                );
            }

            if (!string.IsNullOrWhiteSpace(category))
            {
                query = query.Where(p =>
                    !string.IsNullOrEmpty(p.Category) &&
                    p.Category.Equals(category, System.StringComparison.OrdinalIgnoreCase)
                );
            }

            return Ok(query.ToList());
        }

        // PUT: api/product/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Product updatedProduct)
        {
            var product = products.FirstOrDefault(p => p.Id == id);
            if (product == null)
                return NotFound();

            product.Name = updatedProduct.Name;
            product.Category = updatedProduct.Category;
            product.Price = updatedProduct.Price;
            product.ImageUrl = updatedProduct.ImageUrl;
            product.Rating = updatedProduct.Rating;

            return NoContent();
        }

        // DELETE: api/product/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = products.FirstOrDefault(p => p.Id == id);
            if (product == null)
                return NotFound();

            products.Remove(product);
            return NoContent();
        }
    }

    // Product model
   
}
