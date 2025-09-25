import { useParams } from 'react-router';
import { DetailsPanelStyles } from './DetailsPanelStyles';
import { useGetPersonQuery } from '../../services/api';

export function CardDetails() {
  const { id } = useParams();
  const { data } = useGetPersonQuery(Number(id));
  const { bgckClassname, paragraphStyle } = DetailsPanelStyles();

  return (
    <div className={bgckClassname}>
      <div className="my-auto">
        {data?.data.name && (
          <h2 className="text-2xl font-bold mb-10 ">
            A South Park character with the name {data?.data.name}
          </h2>
        )}
        {data?.data.hair_color && (
          <p className={paragraphStyle}>
            It`&apos;`s hair color is {data?.data.hair_color}
          </p>
        )}
        {data?.data.sex && (
          <p className={paragraphStyle}>
            As we know it`&apos;`s gender is {data?.data.sex}
          </p>
        )}
        {data?.data.occupation && (
          <p className={paragraphStyle}>
            Currently it`&apos;`s occupation is {data?.data.occupation}
          </p>
        )}
      </div>
    </div>
  );
}
