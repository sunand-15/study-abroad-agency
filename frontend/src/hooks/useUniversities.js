import { useQuery } from '@tanstack/react-query';
import { universityService } from '../services/universityService';

export const useUniversities = (params = {}) => {
  return useQuery({
    queryKey: ['universities', params],
    queryFn: () => universityService.getAll(params),
  });
};