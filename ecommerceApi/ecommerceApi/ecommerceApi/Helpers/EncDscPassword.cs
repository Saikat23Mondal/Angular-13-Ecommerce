using System.Text;

namespace ecommerceApi.Helpers
{
    public static class EncDscPassword
    {
        public static string secretKey = "@123secretKeydontshare";
        public static string EncryptPassword( string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                return "";
            }
            else
            {
                password = password + secretKey;
                var passwordinBytes = Encoding.UTF8.GetBytes(password);
                return Convert.ToBase64String(passwordinBytes);
            }
        }

        public static string DecryptPassword(string encrypetedPassword)
        {
            if (string.IsNullOrEmpty(encrypetedPassword))
            {
                return "";
            }
            else
            {
                var encodedBytes = Convert.FromBase64String (encrypetedPassword);
                var actualPassword = Encoding.UTF8.GetString(encodedBytes);
                actualPassword = actualPassword.Substring(0, actualPassword.Length - secretKey.Length);
                return actualPassword;
            }
        }
    }
}
