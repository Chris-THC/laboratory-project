import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiConection from '../../../api/ConnectionAPI'

//TODO: Here we get content_results by idResult
const getContentsResultByIdResut = async (resultId:number|null|undefined): Promise<ContentsResultsInterface[]> => {
  const { data } = await apiConection.get<ContentsResultsInterface[]>(`/contentsresults/resultId/${resultId}`)
  return data
}

export const useListContentsResultsByIdResults = (idResult:number|null|undefined): UseQueryResult<ContentsResultsInterface[]> => {
  return useQuery({
    queryKey: ['contentResults'],
    queryFn: ()=> getContentsResultByIdResut(idResult)
  })
}

// TODO: Create a new client
const postNewContentResult = async (contentBody: ContentsResultsInterface): Promise<ContentsResultsInterface> => {
  const { data } = await apiConection.post<ContentsResultsInterface>('/contentsresults', contentBody)
  return data
}

export const useNewContentResult = (): UseMutationResult<ContentsResultsInterface, Error, ContentsResultsInterface,unknown> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postNewContentResult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentResults'] })
      // notifyCreatedSucces()
      console.log("Se ha agregado un dato a contents results");
      
    },
    onError: () => {
      // toast.error('No se pudo crear al usuario')
      console.error("Hay un error al agregar un dato a contents results");

    }
  })
}

// * This section is to update contentsresults

const updateContentsResultsById = async (contentResultId:number, contentBody: ContentsResultsInterface): Promise<ContentsResultsInterface> => {
  const { data } = await apiConection.patch<ContentsResultsInterface>(`/contentsresults/${contentResultId}`, contentBody);
  return data;
};

export const useUpdate = (): UseMutationResult<ContentsResultsInterface, Error, { contentResultId: number, contentBody: ContentsResultsInterface }> => {
  
  const queryClient = useQueryClient();

  return useMutation<ContentsResultsInterface, Error, { contentResultId: number, contentBody: ContentsResultsInterface }>({
    mutationFn: ({ contentResultId, contentBody }) => updateContentsResultsById(contentResultId, contentBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentResults'] });
    },
    onError: () => {
      console.log("Hay un error al actualizar");
    }
  });
};