export const ApiEndpoints ={
  user:{
    getUserById:(id:string)=>`user/${id}`,
    userLogin:'user/login',
    list:'admin/user/list',
    add:'admin/user/create',
    remove:(id:string)=>`admin/user/${id}`,
    edit:(id:string)=>`admin/user/${id}`,
  },
  application:{
    list:'admin/user/app/list',
    add:'admin/app',
    edit:(id:string)=>`admin/app/${id}`,
  }
}
