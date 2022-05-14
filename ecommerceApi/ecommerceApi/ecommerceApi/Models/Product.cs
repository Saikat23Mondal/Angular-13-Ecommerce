using System.ComponentModel.DataAnnotations;

namespace ecommerceApi.Models
{
    public class Product
    {
      
            [Key]
            public int id { get; set; }
            public string? title { get; set; }

            public int? price { get; set; }

            public string? description { get; set; }

            public string? category { get; set; }

            public string? image { get; set; }
        }


}
