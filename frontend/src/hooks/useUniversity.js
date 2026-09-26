import { useQuery } from '@tanstack/react-query';
import { universityService } from '../services/universityService';

export const useUniversity = (slug) => {
  return useQuery({
    queryKey: ['university', slug],
    queryFn: () => universityService.getBySlug(slug),
    enabled: !!slug,
  });
};