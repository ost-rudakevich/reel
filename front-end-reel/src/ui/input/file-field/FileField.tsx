import { ChangeEvent, FC } from 'react'
import styles from './FileField.module.scss'
import { IFileFieldProps } from './file-field.interface'
import { useCreateFileMutation } from 'services/file/file.service'
import { hasErrorField } from 'utils/has-error-field'
import Loading from 'ui/loading/Loading'
import useCustomToast from 'hooks/useCustomToast'
import VideoPlayer from 'components/pages/movies/movie-details/video-player/VideoPlayer'

const FileField: FC<IFileFieldProps> = ({
  placeholder,
  folder,
  value,
  error,
  onChange,
  isNoImage = false,
  style
}) => {
  const [uploadImage, { isLoading }] = useCreateFileMutation()
  const showToast = useCustomToast()

  const uploadImageHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files
    if (file) {
      const formData = new FormData()
      formData.append('image', file[0])
      try {
        const response = await uploadImage({ folder, file: formData }).unwrap()
        onChange(response[0].url)
      } catch (e) {
        const error = hasErrorField(e) ? e.data.message : 'Server not Found'
        showToast({
          title: 'Не вдалось загрузити фотогрфію.',
          description: `Помилка: ${error}`,
          status: 'error'
        })
      }
    }
  }

  if (isLoading) {
    return (
      <div
        style={{ width: '100%', marginBottom: '20px' }}
        className={styles['file-field']}
      >
        <Loading />
      </div>
    )
  }

  return (
    <div className={styles['file-field']} style={style}>
      <div className={styles.wrapper}>
        <label>
          <span>{placeholder}</span>
          <input
            type='file'
            accept={isNoImage ? '.mp4' : '.webp, .jpg'}
            onChange={event => uploadImageHandler(event)}
          />
          {error && <div className={styles.error}>{error?.message}</div>}
        </label>

        {!isNoImage ? (
          <div className={styles.uploaded_image_container}>
            <img src={value} alt='' />
          </div>
        ) : (
          <VideoPlayer videoSource={value} />
        )}
      </div>
    </div>
  )
}

export default FileField
