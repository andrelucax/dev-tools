namespace DevTools.Server.Classes
{
    public class ApiException : Exception
    {

        public ApiException(
            ErrorCodes errorCode,
            string errorMessage,
            Exception? innerException = null
        ) : base(formatMessage(errorCode, errorMessage), innerException) {
        }

        private static string? formatMessage(ErrorCodes errorCode, string errorMessage)
        {
            return $"API error {errorCode}: {errorMessage}";
        }
    }
}
