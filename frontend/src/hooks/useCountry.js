import { useQuery } from '@tanstack/react-query';
import { countryService } from '../services/countryService';

export const useCountry = (slug) => {
  return useQuery({
    queryKey: ['country', slug],
    queryFn: () => countryService.getBySlug(slug),
    enabled: !!slug, // only run when slug exists
  });
};