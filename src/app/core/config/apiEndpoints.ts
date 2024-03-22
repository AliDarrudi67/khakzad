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
    edit: (id: string) => `app/${id}`,
    users: (id: string) => `app/${id}/user-list`,
    removeUser: (appId:string,userId: string) => `app/${appId}/user/${userId}/remove-user`
  },
  serverGroup: {
    list: (id: string) => `app/${id}/server/group/list`,
    add: (id: string) => `app/${id}/server/group/`,
    edit: (id: string,serverGroupId:string) => `app/${id}/server/group/${serverGroupId}`,
    block: (appId: string, serverGroupId: string) => `app/${appId}/server/group/${serverGroupId}/deactivate`,
    unblock: (appId: string, serverGroupId: string) => `app/${appId}/server/group/${serverGroupId}/activate`,
  },
  server: {
    list: (id: string) => `app/${id}/server/all`,
    add: (id: string) => `app/${id}/server`,
    edit: (appId: string,serverId:string) => `app/${appId}/server/${serverId}`,
    block: (appId: string, serverGroupId: string) => `app/${appId}/server/${serverGroupId}/deactivate`,
    unblock: (appId: string, serverGroupId: string) => `app/${appId}/server/${serverGroupId}/activate`,
  },
  config: {
    list: (appId: string) => `app/${appId}/config`,
    add: (id: string) => `app/${id}/config`,
    edit: (id: string) => `app/${id}/config`,
  },
  network: {
    list: (appId: string) => `app/${appId}/ad/network/list`,
    block: (appId: string, id: string) => `app/${appId}/ad/network/${id}/deactivate`,
    unblock: (appId: string, id: string) => `app/${appId}/ad/network/${id}/activate`,
    add: (id: string) => `app/${id}/ad/network`,
    edit: (appId: string, versionId: string) => `app/${appId}/ad/network/${versionId}`,
  },
  adPlacement: {
    list: (appId: string,networkId:string) => `app/${appId}/ad/network/${networkId}/ad-place/list`,
    block: (appId: string, id: string) => `app/${appId}/ad/network/${id}/ad-place/${id}/deactivate`,
    unblock: (appId: string, id: string) => `app/${appId}/ad/network/${id}/ad-place/${id}/activate`,
    add: (appId: string,networkId:string) => `app/${appId}/ad/network/${networkId}/ad-place`,
    edit: (appId: string,networkId:string,adPlaceId:string) => `app/${appId}/ad/network/${networkId}/ad-place/${adPlaceId}`,
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
