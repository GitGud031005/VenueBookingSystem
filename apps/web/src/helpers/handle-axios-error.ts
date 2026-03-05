import { AxiosError } from 'axios';

import { logger } from '@/utils/logger';

const defaultMessage = 'Something went wrong. Please try again.';

const handleAxiosError = (
  error: unknown,
  cb: (message: string, error?: unknown) => void,
) => {
  if (error instanceof AxiosError) {
    try {
      // Handle network errors (no response from server)
      if (!error.response) {
        const networkMessage =
          error.message === 'Network Error'
            ? 'Cannot connect to server. Please check if the backend is running.'
            : error.message;
        cb(networkMessage, error);
        return;
      }

      const data = error.response.data as {
        message: Array<string> | string;
        error: string;
        statusCode: number;
      };

      if (!data || !data.message) {
        cb(defaultMessage, error);
        return;
      }

      if (typeof data.message === 'string') {
        cb(data.message, error);
      } else {
        data.message.forEach((piece) => {
          cb(piece, error);
        });
      }
    } catch (axioserror) {
      logger.error(axioserror);
      cb(defaultMessage, error);
    }
  } else {
    logger.error(error);
    cb(defaultMessage, error);
  }
};

export default handleAxiosError;
