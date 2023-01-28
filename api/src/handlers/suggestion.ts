import { Request, Response } from 'express';
import { ResponseService } from '../services';
import { SuggestionService } from '../services/suggestion';

export const SuggestionHandler = {
  /**
   * Fetch list of suggestions.
   * @param req - request object
   * @param res - response object
   */
  fetch: async (_req: Request, res: Response): Promise<void> => {
    const data = await SuggestionService.fetch();
    return ResponseService.data(data, res);
  },
};
