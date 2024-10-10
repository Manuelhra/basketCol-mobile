import {
  IAnySystemUserTypePrimitives,
  IDomainErrorPrimitives,
} from '@basketcol/domain';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  logoutUserUseCase,
  validateAndRefreshAuthenticationTokenUseCase,
} from '../../../../../basketCol/authentication/infrastructure/dependency-injection';

export interface IAuthenticationInitialState {
  authenticatedUser: IAnySystemUserTypePrimitives | null;
  isAuthenticated: boolean;
  loading: boolean;
  errors: IDomainErrorPrimitives[];
}

const initialState: IAuthenticationInitialState = {
  authenticatedUser: null,
  isAuthenticated: false,
  loading: false,
  errors: [],
};

export const checkAuthenticationToken = createAsyncThunk(
  'authentication/checkAuthenticationToken',
  async (_, { rejectWithValue }) => {
    const result = await validateAndRefreshAuthenticationTokenUseCase.execute();

    if (result.isLeft) {
      const domainError = result.left();
      const errorList = domainError.type === 'single'
        ? [domainError.error.toPrimitives]
        : domainError.errors.map((error) => error.toPrimitives);
      return rejectWithValue(errorList);
    }

    return result.right();
  },
);

export const logoutUser = createAsyncThunk(
  'authentication/logoutUser',
  async (_, { rejectWithValue }) => {
    const result = await logoutUserUseCase.execute();

    if (result.isLeft) {
      const domainError = result.left();
      const errorList = domainError.type === 'single'
        ? [domainError.error.toPrimitives]
        : domainError.errors.map((error) => error.toPrimitives);
      return rejectWithValue(errorList);
    }

    return result.right();
  },
);

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action: PayloadAction<IAnySystemUserTypePrimitives>) => {
      state.authenticatedUser = action.payload;
      state.errors = [];
    },
    setErrors: (state, action: PayloadAction<IDomainErrorPrimitives[]>) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = [];
    },
    logout: (state) => {
      state.authenticatedUser = null;
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthenticationToken.pending, (state) => {
        state.loading = true;
        state.errors = [];
      })
      .addCase(checkAuthenticationToken.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.errors = [];
      })
      .addCase(checkAuthenticationToken.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as IDomainErrorPrimitives[];
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.errors = [];
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.authenticatedUser = null;
        state.errors = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as IDomainErrorPrimitives[];
      });
  },
});

export const authenticationActions = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
