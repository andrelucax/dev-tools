namespace DevTools.Server.Classes
{

    public enum ErrorCodes
    {
        ClipboardNotFound,
        InvalidClipboardRequest,
        ClipboardNoBlob,
    }

    public enum BlobStorageFolders
    {
        Uploads = 1,
        Clipboards,
    }
}
