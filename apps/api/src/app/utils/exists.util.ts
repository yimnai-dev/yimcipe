
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userExists = async (info: {model: any, username?: string, email?: string, password?: string}) => {
  let query!: {username?: string, email?: string, password?: string}
  if(info.username){
    query.username = info.username
  }
  console.log('Query: ', info)
  if(info.email){
    query.email = info.email
  }
  if(info.password){
    query.password = info.password
  }
  const exists = await info.model.findOne({where: query})
  return exists
}
