import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <h2>⚠️ Error</h2>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
