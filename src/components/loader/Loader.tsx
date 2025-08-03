import './Loader.css';
import { LoaderStyles } from './LoaderStyles';
export const Loader = () => {
  const { classPoint } = LoaderStyles();
  return (
    <div
      className="flex items-center justify-center h-screen"
      data-testid="loader"
      aria-label="Loading..."
    >
      <div className="flex space-x-1">
        <div className={`${classPoint} bounce`}></div>
        <div className={`${classPoint} bounce`}></div>
        <div className={`${classPoint} bounce`}></div>
      </div>
    </div>
  );
};
