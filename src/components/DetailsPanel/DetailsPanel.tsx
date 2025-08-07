import { useParams } from 'react-router';
import type { PersonSWType } from '../../types/interfaces';
import { useEffect, useState } from 'react';
import { PersonService } from '../../shared/personService';
import { DetailsPanelStyles } from './DetailsPanelStyles';

interface CardDetailsState {
  cardData: PersonSWType | null;
  loading: boolean;
  error: string | null;
}

export function CardDetails() {
  const { id } = useParams();

  const [cardState, setCardState] = useState<CardDetailsState>({
    cardData: null,
    loading: true,
    error: null,
  });
  const { bgckClassname, paragraphStyle } = DetailsPanelStyles();

  useEffect(() => {
    const fetchCardData = async () => {
      const searchId = Number(id);
      const { dataFetched, errorMessage } =
        await PersonService.fetchCharacterData(searchId);

      if (errorMessage) {
        setCardState({ cardData: null, loading: false, error: errorMessage });
      } else {
        setCardState({ cardData: dataFetched, loading: false, error: null });
      }
    };
    fetchCardData();
  }, [id]);

  return (
    <div className={bgckClassname}>
      <div className="my-auto">
        {cardState.cardData?.name && (
          <h2 className="text-2xl font-bold mb-10 ">
            A South Park character with the name {cardState.cardData?.name}
          </h2>
        )}
        {cardState.cardData?.hair_color && (
          <p className={paragraphStyle}>
            It`&apos;`s hair color is {cardState.cardData?.hair_color}
          </p>
        )}
        {cardState.cardData?.sex && (
          <p className={paragraphStyle}>
            As we know it`&apos;`s gender is {cardState.cardData?.sex}
          </p>
        )}
        {cardState.cardData?.occupation && (
          <p className={paragraphStyle}>
            Currently it`&apos;`s occupation is {cardState.cardData?.occupation}
          </p>
        )}
      </div>
    </div>
  );
}
