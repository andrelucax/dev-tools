namespace DevTools.Server.Classes
{
    public class ApiException : Exception
    {

        public ErrorCodes ErrorCode { get; set; }

        public string ErrorMessage { get; set; }

        public ApiException(
            ErrorCodes errorCode,
            string errorMessage,
            Exception? innerException = null
        ) : base(formatMessage(errorCode, errorMessage), innerException) {
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
        }

        private static string? formatMessage(ErrorCodes errorCode, string errorMessage)
        {
            return $"API error {errorCode}: {errorMessage}";
        }
    }
}
