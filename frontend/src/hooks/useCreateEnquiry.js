import { useMutation } from '@tanstack/react-query';
import { enquiryService } from '../services/enquiryService';

export const useCreateEnquiry = () => {
  return useMutation({
    mutationFn: (payload) => enquiryService.create(payload),
  });
};