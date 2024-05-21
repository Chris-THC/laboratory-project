import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import { UseMutationResult, useMutation } from '@tanstack/react-query'
import apiConection from '../../../api/ConnectionAPI'

// TODO: Create a new client
const postNewContentResult = async (contentBody: ContentsResultsInterface): Promise<ContentsResultsInterface> => {
  const { data } = await apiConection.post<ContentsResultsInterface>('/contentsresults', contentBody)
  return data
}

export const useNewContentResult = (): UseMutationResult<ContentsResultsInterface, Error, ContentsResultsInterface,unknown> => {
//   const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postNewContentResult,
    onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['clientInfoAPI'] })
      // notifyCreatedSucces()
      console.log("Se ha agregado un dato a contents results");
      
    },
    onError: () => {
      // toast.error('No se pudo crear al usuario')
      console.error("Hay un error al agregar un dato a contents results");

    }
  })
}
