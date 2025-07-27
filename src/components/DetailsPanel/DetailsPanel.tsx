import { useParams } from 'react-router';
import type { PersonSWType } from '../../types/interfaces';
import { useEffect, useState } from 'react';
import { personService } from '../../shared/personService';

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
  const paragraphStyle = 'text-lg leading-7 mb-10';

  useEffect(() => {
    const fetchCardData = async () => {
      const service = new personService();
      const searchId = Number(id);
      const { dataFetched, errorMessage } =
        await service.fetchCharacterData(searchId);

      if (errorMessage) {
        setCardState({ cardData: null, loading: false, error: errorMessage });
      } else {
        setCardState({ cardData: dataFetched, loading: false, error: null });
      }
    };
    fetchCardData();
  }, [id]);

  return (
    <div className="w-150 h-150 mx-auto my-auto border border-cyan-500 rounded-3xl bg-slate-300 p-4 relative flex items-center justify-center">
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
