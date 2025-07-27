import image from '../../public/i.png';

export const ImageLink = () => {
  return (
    <div className="flex justify-center absolute left-0 bottom-0">
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={image}
          alt="logo"
          style={{ width: '150px', height: 'auto' }}
        />
      </a>
    </div>
  );
};

export default ImageLink;
