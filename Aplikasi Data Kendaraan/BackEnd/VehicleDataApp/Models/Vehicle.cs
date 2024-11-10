using System.ComponentModel.DataAnnotations;

namespace VehicleDataApp.Models
{
    public class Vehicle
    {
        [Key]
        public string RegNumber { get; set; } // Primary Key

        [Required]
        public string OwnerName { get; set; }

        public string Address { get; set; }
        public string Brand { get; set; }

        [Range(1900, 2100)]
        public int Year { get; set; }

        public int CylinderCapacity { get; set; }
        public string Color { get; set; }
        public string Fuel { get; set; }
    }
}
