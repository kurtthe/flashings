import {createAction} from '@reduxjs/toolkit';

export const actionsSetup = {
  versionApp: createAction<{newVersion: string}>('config/versionApp'),
};
