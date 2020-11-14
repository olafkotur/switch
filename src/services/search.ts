import { IServiceDetails } from '../typings/d';
import { suggestions } from '../imports/search';

export const SearchService = {
  getSearchSuggestions: (): IServiceDetails[] => {
    return suggestions;
  },
};
