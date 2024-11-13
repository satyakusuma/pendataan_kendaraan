using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleDataApp.Models
{
    public class Vehicle
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string RegNumber { get; set; } 
        [Required]
        public string OwnerName { get; set; }

        public string Address { get; set; }
        public string Brand { get; set; }

        [Range(1900, 2024)]
        public int Year { get; set; }

        public int CylinderCapacity { get; set; }
        public string Color { get; set; }
        public string Fuel { get; set; }
    }
}
