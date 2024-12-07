interface ValidationMessageProps {
  successMessage?: string;
  errorMessage?: string;
}

function ValidationMessage({
  successMessage,
  errorMessage,
}: ValidationMessageProps) {
  if (errorMessage) {
    return <p className="mt-1 text-sm text-red-500">{errorMessage}</p>;
  }
  if (successMessage) {
    return <p className="mt-1 text-sm text-blue-500">{successMessage}</p>;
  }
  return null;
}

export default ValidationMessage;
