using System.ComponentModel.DataAnnotations;

namespace ecommerceApi.Models
{
    public class UserDetails
    {
        [Key]
        public int User_Id { get; set; }
        public string? FullName { get; set; }
      
        public string? Email { get; set; }
        public  string? UserType { get; set; }

        public string? Password { get; set; }
    }
}
