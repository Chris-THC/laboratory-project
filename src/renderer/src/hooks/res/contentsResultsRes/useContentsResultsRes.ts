import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiConection from '../../../api/ConnectionAPI'
import toast from 'react-hot-toast'

// TODO: toast Messages
const notifyCreatedSucces = (message: string): string => {
  return toast.success(message)
}

const notifyUpdatedSucces = (message: string): string => {
  return toast.success(message)
}

const notifyError = (message: string): string => {
  return toast.error(message)
}

//TODO: Here we get content_results by idResult
export const getContentsResultByIdResut = async (resultId: number | null | undefined): Promise<ContentsResultsInterface[] | null> => {
  try {
    const { data } = await apiConection.get<ContentsResultsInterface[]>(`/contentsresults/resultId/${resultId}`);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
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
      notifyCreatedSucces("Se ha agregado un dato a contents results");
    },
    onError: () => {
      notifyError("Hay un error al agregar un dato a contents results");
    }
  })
}

// * This section is to update contentsresults

const updateContentsResultsById = async (contentResultId:number, contentBody: ContentsResultsInterface): Promise<ContentsResultsInterface> => {
  const { data } = await apiConection.patch<ContentsResultsInterface>(`/contentsresults/${contentResultId}`, contentBody);
  return data;
};

export const useUpdateContentResults = (): UseMutationResult<ContentsResultsInterface, Error, { contentResultId: number, contentBody: ContentsResultsInterface }> => {
  const queryClient = useQueryClient();
  return useMutation<ContentsResultsInterface, Error, { contentResultId: number, contentBody: ContentsResultsInterface }>({
    mutationFn: ({ contentResultId, contentBody }) => updateContentsResultsById(contentResultId, contentBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentResults'] });
      notifyUpdatedSucces("Se ha actualizado..!");
    },
    onError: () => {
      notifyError("No se pudo actualizar el campo..!");
    }
  });
};