import { useQuery } from '@tanstack/react-query';
import { courseService } from '../services/courseService';

export const useCourses = (params = {}) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => courseService.getAll(params),
  });
};