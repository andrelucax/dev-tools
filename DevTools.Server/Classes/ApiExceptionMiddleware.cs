namespace DevTools.Server.Classes
{
    public class ApiExceptionMiddleware
    {
        private readonly RequestDelegate next;

        public ApiExceptionMiddleware(
            RequestDelegate next
        )
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (ApiException ex)
            {
                context.Response.StatusCode = StatusCodes.Status422UnprocessableEntity;
                context.Response.ContentType = "application/json";

                var response = new
                {
                    error = ex.Message
                };

                await context.Response.WriteAsJsonAsync(response);
            }
        }
    }
}
