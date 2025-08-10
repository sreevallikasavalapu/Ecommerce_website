using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ecommerce_appln;

namespace ecommerce_appln.Data
{
    public class ecommerce_applnContext : DbContext
    {
        public ecommerce_applnContext (DbContextOptions<ecommerce_applnContext> options)
            : base(options)
        {
        }

        public DbSet<ecommerce_appln.Product> Product { get; set; } = default!;
    }
}
