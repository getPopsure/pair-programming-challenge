import './message.css';

export const Message = ({
  error,
  message,
}: {
  error: boolean;
  message: string;
}) => {
  return (
    <div className="message">
      <p className={`${error ? 'text-red-500' : ''}`}>{message}</p>
    </div>
  );
};
