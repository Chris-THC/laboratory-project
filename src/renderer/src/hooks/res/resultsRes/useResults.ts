import { ResultsInterface } from '@renderer/interfaces/results/results'
import apiConection from '../../../api/ConnectionAPI'
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { HttpStatusCode } from 'axios'

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

  //TODO: Delete costumer test
const deleteResultByIdTestAndIdCustomer = async (idTest: number, idCustomer:number): Promise<HttpStatusCode> => {
  const { data } = await apiConection.delete<HttpStatusCode>(`/result/test/delete/${idTest}/${idCustomer}`)
  return data
}

export const useDeleteResult = (): UseMutationResult<HttpStatusCode, Error, { idTest: number, idCustomer: number }, unknown> =>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ idTest, idCustomer }) => deleteResultByIdTestAndIdCustomer(idTest, idCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testByIdCustomer'] })
      console.log(`Se ha eliminado un resultado`);
    },
    onError: () => {
      console.log(`Ha ocurrido un error`);
    }
  })
}
