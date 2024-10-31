export function serializeError(error) {
  // Check if the error is a valid JSON string
  try {
    const errorObj = JSON.parse(error.message);

    // Recursive function to extract the error message
    const extractMessage = (obj) => {
      if (obj.kind) {
        // If the kind is an object, dive deeper
        return extractMessage(obj.kind);
      } else if (obj.ExecutionError) {
        // Return the ExecutionError message if found
        return obj.ExecutionError;
      } else if (obj.FunctionCallError) {
        // Return the FunctionCallError message if found
        return (
          obj.FunctionCallError.ExecutionError || "Unknown Function Call Error."
        );
      } else {
        return "Unknown error occurred.";
      }
    };

    // Start extracting from the top-level error object
    const message = extractMessage(errorObj);

    // Optionally include the index if you want
    const index =
      errorObj.index !== undefined ? `Error at index ${errorObj.index}: ` : "";

    return `${index}${message}`;
  } catch (e) {
    // If parsing fails, return a generic message
    return "An unknown error occurred.";
  }
}

// Example usage
// const error = new Error('{"index":0,"kind":{"index":0,"kind":{"FunctionCallError":{"ExecutionError":"Smart contract panicked: The contract has already been initialized"}}}}}');
// const serializedMessage = serializeNestedError(error);
// console.log(serializedMessage); // Output: "Error at index 0: Smart contract panicked: The contract has already been initialized"
