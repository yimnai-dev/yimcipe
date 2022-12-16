import * as bcrypt from 'bcrypt';

export const encryptPassword = (password: string): string => {
  const saltOrRounds = 10
  const hash = bcrypt.hashSync(password, saltOrRounds);
  return hash
}


export const isMatches = async (password: string, hash: string): Promise<boolean> => {
  const passwordMatches = bcrypt.compareSync(password, hash)
  return passwordMatches
}
