import { useQuery } from '@tanstack/react-query';
import { countryService } from '../services/countryService';

export const useCountries = (params = {}) => {
  return useQuery({
    queryKey: ['countries', params],
    queryFn: () => countryService.getAll(params),
  });
};