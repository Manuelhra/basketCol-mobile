import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
