export enum SocketEvents {
  BOARDS_JOIN = 'boards:join',
  BOARDS_LEAVE = 'boards:leave',

  BORADS_UPDATE = 'boards:update',
  BORADS_UPDATE_SUCCESS = 'boards:updateSuccess',
  BORADS_UPDATE_FAILURE = 'boards:updateFailure',

  BORADS_DELETE = 'boards:delete',
  BORADS_DELETE_SUCCESS = 'boards:deleteSuccess',
  BORADS_DELETE_FAILURE = 'boards:deleteFailure',

  COLUMNS_DELETE = 'columns:delete',
  COLUMNS_DELETE_SUCCESS = 'columns:deleteSuccess',
  COLUMNS_DELETE_FAILURE = 'columns:deleteFailure',

  COLUMNS_CREATE = 'columns:create',
  COLUMNS_CREATE_SUCCESS = 'columns:createSuccess',
  COLUMNS_CREATE_FAILURE = 'columns:createFailure',

  COLUMNS_UPDATE = 'columns:update',
  COLUMNS_UPDATE_SUCCESS = 'columns:updateSuccess',
  COLUMNS_UPDATE_FAILURE = 'columns:updateFailure',

  TASKS_CREATE = 'tasks:create',
  TASKS_CREATE_SUCCESS = 'tasks:createSuccess',
  TASKS_CREATE_FAILURE = 'tasks:createFailure',

  TASKS_UPDATE = 'tasks:update',
  TASKS_UPDATE_SUCCESS = 'tasks:updateSuccess',
  TASKS_UPDATE_FAILURE = 'tasks:updateFailure',

  TASKS_DELETE = 'tasks:delete',
  TASKS_DELETE_SUCCESS = 'tasks:deleteSuccess',
  TASKS_DELETE_FAILURE = 'tasks:deleteFailure',
}
