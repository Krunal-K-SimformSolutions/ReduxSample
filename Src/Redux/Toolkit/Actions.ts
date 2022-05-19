import { createAction } from '@reduxjs/toolkit';

export const cleanAction = createAction<void, 'cleanAction'>('cleanAction');
