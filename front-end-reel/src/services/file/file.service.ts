import { api } from 'services/api'
import { EnumFileEndpoints, IFileDto } from './file.service.interface'
import { IFile } from 'types/file.type'

const fileApi = api.injectEndpoints({
  endpoints: build => ({
    createFile: build.mutation<IFile[], IFileDto>({
      query: ({ folder, file }) => ({
        url: `${EnumFileEndpoints.FILE}`,
        method: 'POST',
        body: file,
        params: { folder: folder }
      }),
      invalidatesTags: [{ type: 'File', id: 'LIST' }]
    })
  })
})

export const { useCreateFileMutation } = fileApi
