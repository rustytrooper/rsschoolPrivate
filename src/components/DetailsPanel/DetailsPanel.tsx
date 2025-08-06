import { useParams } from 'react-router';
// import type { PersonSWType } from '../../types/interfaces';
// import { useEffect, useState } from 'react';
// import { PersonService } from '../../shared/personService';
import { DetailsPanelStyles } from './DetailsPanelStyles';
import { useGetPersonsByQuery } from '../../features/hooks';

// interface CardDetailsState {
//   cardData: PersonSWType | null;
//   loading: boolean;
//   error: string | null;
// }

export function CardDetails() {
  const { id } = useParams();

  // const [cardState, setCardState] = useState<CardDetailsState>({
  //   cardData: null,
  //   loading: true,
  //   error: null,
  // });

  const { data } = useGetPersonsByQuery('');
  const { bgckClassname, paragraphStyle } = DetailsPanelStyles();

  const personDetail = data.find((person) => person.id === Number(id));
  let name, hair_color, sex, occupation;

  if (personDetail) {
    name = personDetail.name;
    hair_color = personDetail.hair_color;
    sex = personDetail.sex;
    occupation = personDetail.occupation;
  }
  // const { name, hair_color, eye_color } = personDetail;

  // useEffect(() => {
  //   const fetchCardData = async () => {
  //     const searchId = Number(id);
  //     const { dataFetched, errorMessage } =
  //       await PersonService.fetchCharacterData(searchId);

  //     if (errorMessage) {
  //       setCardState({ cardData: null, loading: false, error: errorMessage });
  //     } else {
  //       setCardState({ cardData: dataFetched, loading: false, error: null });
  //     }
  //   };
  //   fetchCardData();
  // }, [id]);

  return (
    <div className={bgckClassname}>
      <div className="my-auto">
        {name && (
          <h2 className="text-2xl font-bold mb-10 ">
            A South Park character with the name {name}
          </h2>
        )}
        {hair_color && (
          <p className={paragraphStyle}>
            It`&apos;`s hair color is {hair_color}
          </p>
        )}
        {sex && (
          <p className={paragraphStyle}>
            As we know it`&apos;`s gender is {sex}
          </p>
        )}
        {occupation && (
          <p className={paragraphStyle}>
            Currently it`&apos;`s occupation is {occupation}
          </p>
        )}
      </div>
    </div>
  );
}
