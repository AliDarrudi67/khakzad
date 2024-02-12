export const ApiEndpoints = {
  user: {
    getUserById: (id: string) => `user/${id}`,
    userLogin: 'user/login',
    list: 'admin/user/list',
    add: 'admin/user/create',
    remove: (id: string) => `admin/user/${id}`,
    edit: (id: string) => `admin/user/${id}`,
    changePassword:'user/change-password',
    currentUser:'user',
    editProfile:'user',
  },
  application: {
    list: 'admin/user/app/list',
    add: 'admin/app',
    edit: (id: string) => `admin/app/${id}`,
  },
  serverGroup: {
    list: (id: string) => `app/${id}/server/group/`,
    add: (id: string) => `app/${id}/server/group/`,
    edit: (id: string) => `app/${id}/server/group/`,
  },
  server: {
    list: (id: string) => `user/app/${id}/server/list/`,
    add: (id: string) => `app/${id}/server`,
  },

}
