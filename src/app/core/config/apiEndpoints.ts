export const ApiEndpoints = {
  user: {
    getUserById: (id: string) => `user/${id}`,
    userLogin: 'user/login',
    list: 'admin/user/list',
    add: 'admin/user/create',
    remove: (id: string) => `admin/user/${id}`,
    edit: (id: string) => `admin/user/${id}`,
    block: (id: string) => `admin/user/${id}/block`,
    unblock: (id: string) => `admin/user/${id}/unblock`,
    changePassword: 'user/change-password',
    currentUser: 'user',
    editProfile: 'user',
    application: {
      list: 'user/app/list'
    }
  },
  application: {
    list: 'admin/user/app/list',
    userApplications: (userId: string) => `admin/user/${userId}/app/list`,
    add: 'app',
    block: (id: string) => `app/${id}/deactivate`,
    unblock: (id: string) => `app/${id}/activate`,
    edit: (id: string) => `admin/app/${id}`,
    users: (id: string) => `app/${id}/user-list`
  },
  serverGroup: {
    list: (id: string) => `app/${id}/server/group/list`,
    add: (id: string) => `app/${id}/server/group/`,
    edit: (id: string) => `app/${id}/server/group/`,
    block: (appId: string, serverGroupId: string) => `app/${appId}/server/group/${serverGroupId}/deactivate`,
    unblock: (appId: string, serverGroupId: string) => `app/${appId}/server/group/${serverGroupId}/activate`,
  },
  server: {
    list: (id: string) => `app/${id}/server/list`,
    add: (id: string) => `app/${id}/server`,
  },
  config: {
    list: (appId: string) => `app/${appId}/config`,
    add: (id: string) => `app/${id}/config`,
    edit: (id: string) => `app/${id}/config`,
  },
  network: {
    list: (appId: string) => `app/${appId}/ad/network`,
    block: (appId: string, id: string) => `app/${appId}/ad/network/${id}/deactivate`,
    unblock: (appId: string, id: string) => `app/${appId}/ad/network/${id}/activate`,
    add: (id: string) => `app/${id}/ad/network`,
    edit: (appId: string, versionId: string) => `app/${appId}/ad/network/${versionId}`,
  },
  version: {
    list: (appId: string) => `app/${appId}/version/list`,
    block: (appId: string, id: string) => `app/${appId}/version/${id}/deactivate`,
    unblock: (appId: string, id: string) => `app/${appId}/version/${id}/activate`,
    add: (id: string) => `app/${id}/version`,
    edit: (appId: string, versionId: string) => `app/${appId}/version/${versionId}`,
  },
  admin: {
    application: {
      addUserToApp: (userId: string) => `app/${userId}/user/add-user`,
      // list:(id:string)=>`user/${id}/app/list`
      list: 'admin/user/current/app/list'
    }
  }
}
