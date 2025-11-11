using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Collections.Generic;

namespace TvShop.Models
{
    public class Product
    {
        public int ID { get; set; }

        [Required]
        public string NameProduct { get; set; } = string.Empty;

        [Required]
        public string DescriptionProduct { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; }

        [Required]
        public string ImgUrl { get; set; } = string.Empty;

        public string Specifications { get; set; } = string.Empty;

        public List<string> SpecificationsList
        {
            get
            {
                if (string.IsNullOrEmpty(Specifications))
                    return new List<string>();

                try
                {
                    return JsonSerializer.Deserialize<List<string>>(Specifications) ?? new List<string>();
                }
                catch
                {
                    return new List<string>();
                }
            }
        }
    }
}
