export const ApiEndpoints ={
  user:{
    getUserById:(id:string)=>`user/${id}`,
    userLogin:'user/login',
    list:'admin/user/list',
    add:'admin/user/create'
  }
}
