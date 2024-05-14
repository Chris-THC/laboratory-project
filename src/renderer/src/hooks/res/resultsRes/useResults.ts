import { ResultsInterface } from '@renderer/interfaces/results/results'
import apiConection from '../../../api/ConnectionAPI'
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'

const addResultByCustomer = async (resultsBody: ResultsInterface): Promise<ResultsInterface> => {
  const { data } = await apiConection.post<ResultsInterface>('/result', resultsBody)
  return data
}

export const useAddResults = (): UseMutationResult<ResultsInterface, Error, ResultsInterface, unknown> => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: addResultByCustomer,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['testByIdCustomer'] })
        // notifyCreatedSucces()
        console.log("Se agrego un test");
        
      },
      onError: (err:Error) => {
        // toast.error('No se pudo crear al usuario')
        console.log(`Hay un error: ${err}`);
        
      }
    })
  }