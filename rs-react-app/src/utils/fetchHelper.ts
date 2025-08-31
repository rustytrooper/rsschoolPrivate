import type { TransformedCountry, countriesData } from '../types/tableTypes';

interface FetchOptions extends RequestInit {
  url: string;
}

export const fetchHelper = async <T>({
  url,
  ...options
}: FetchOptions): Promise<T> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const countryTransform = (
  countryData: Record<string, countriesData>
): TransformedCountry[] => {
  return Object.entries(countryData).map(([country, data]) => {
    return {
      name: country,
      iso_code: data.iso_code,
      data: data.data,
    };
  });
};
