import moment from 'moment'

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'ДД.ММ.РРРР'

  const date = moment(dateString, moment.ISO_8601, true)

  if (date.isValid()) {
    return date.format('DD-MM-YYYY')
  }

  return 'ДД.ММ.РРРР'
}
