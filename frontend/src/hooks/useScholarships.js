import { useQuery } from '@tanstack/react-query';
import { scholarshipService } from '../services/scholarshipService';

export const useScholarships = (params = {}) => {
  return useQuery({
    queryKey: ['scholarships', params],
    queryFn: () => scholarshipService.getAll(params),
  });
};