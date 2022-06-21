import { useAlertDispatch } from '../context/Alert';

export default function useErrorHandler() {
  const { openAlert } = useAlertDispatch();

  function errorHandler(error) {
    console.log('Error Handler ==>', error);
    openAlert({
      message: String(error),
      variant: 'error',
    });
  }
  return errorHandler;
}
