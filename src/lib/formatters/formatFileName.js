import moment from 'moment'

const formatFileName = (filename, dir) => {
  const date = moment().format('YYYYMMDD')
  const randomString = Math.random()
    .toString(36)
    .substring(2, 7)
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, '-')
  const newFilename = `${dir}/${date}-${randomString}-${cleanFileName}`
  return newFilename.substring(0, 60)
}

export default formatFileName
