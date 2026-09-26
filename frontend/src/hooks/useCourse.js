import { useQuery } from '@tanstack/react-query';
import { courseService } from '../services/courseService';

export const useCourse = (slug) => {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: () => courseService.getBySlug(slug),
    enabled: !!slug,
  });
};