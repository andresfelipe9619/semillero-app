import { useAlertDispatch } from '../context/Alert';

const DEFAULT_ERROR_MESSAGE =
  'Ups, algo salió mal. Por favor vuelve a intenetar más tarde.';

export default function useErrorHandler() {
  const { openAlert } = useAlertDispatch();

  function errorHandler(error) {
    console.error('Error Handler ==>', error);
    openAlert({
      message: error || DEFAULT_ERROR_MESSAGE,
      variant: 'error',
    });
  }
  return errorHandler;
}
