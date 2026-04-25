using System.Security.Cryptography;

namespace DevTools.Server.Classes
{
    public class RandomCodeGenerator
    {
        private const string Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        public static string Generate(int length = 6)
        {
            var result = new char[length];

            for (var i = 0; i < length; i++)
            {
                var index = RandomNumberGenerator.GetInt32(Chars.Length);
                result[i] = Chars[index];
            }

            return new string(result);
        }
    }
}
