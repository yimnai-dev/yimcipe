import * as uuid from 'uuid'

export const generateUUID = (): string => {
  const cid = uuid.v4()
  return cid
}
