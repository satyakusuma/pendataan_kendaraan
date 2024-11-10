using Microsoft.EntityFrameworkCore;
using VehicleDataApp.Models;

namespace VehicleDataApp
{
    public class VehicleContext : DbContext
    {
        public VehicleContext(DbContextOptions<VehicleContext> options) : base(options) { }

        public DbSet<Vehicle> Vehicles { get; set; }
    }
}
