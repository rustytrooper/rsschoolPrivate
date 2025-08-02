import CsvDownloader from 'react-csv-downloader';
import { useSelector } from 'react-redux';
import type { PersonSWType } from '../../types/interfaces';
import { BaseButton } from '../BaseButton/BaseButton';

export function FlyOut({ numberOfSelected }: { numberOfSelected: number }) {
  const card = useSelector(
    (state: { card: { card: PersonSWType[] } }) => state.card.card
  );
  return (
    <div className="flex flex-col absolute bottom-0 right-0 m-18 gap-5">
      <p>{`${numberOfSelected} items are selected`}</p>
      <div className="flex gap-5">
        <BaseButton>Unselect all</BaseButton>

        <CsvDownloader
          filename={`${numberOfSelected}_items`}
          extension=".csv"
          separator=";"
          wrapColumnChar="'"
          datas={card}
        >
          <BaseButton>Download</BaseButton>
        </CsvDownloader>
      </div>
    </div>
  );
}
