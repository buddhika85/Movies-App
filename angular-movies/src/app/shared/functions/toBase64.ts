// This function takes a File (e.g., from an input[type="file"])
// and returns a Promise that will eventually contain the base64 string

export function toBase64(file: File): Promise<string> {
  // will not return imedietely, may return after some time

  return new Promise((resolve, reject) => {
    const reader = new FileReader(); // FileReader is a browser API to read file contents (like text, data URL, etc.)

    // Starts reading the file and converts it into a base64-encoded Data URL (string)
    // This does NOT return immediately—it's asynchronous
    reader.readAsDataURL(file);

    // Once the file is successfully read, resolve the Promise with the base64 string
    reader.onload = () => resolve(reader.result as string);

    // If there's an error while reading the file, reject the Promise with the error
    reader.onerror = (error) => reject(error);
  });
}
