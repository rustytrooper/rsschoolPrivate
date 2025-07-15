import './loader.module.css';
export const Loader = () => {
  const classPoint = 'w-3 h-3 bg-cyan-500 rounded-full';
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex space-x-1">
        <div className={`${classPoint} bounce`}></div>
        <div className={`${classPoint} bounce`}></div>
        <div className={`${classPoint} bounce`}></div>
      </div>
    </div>
  );
};
