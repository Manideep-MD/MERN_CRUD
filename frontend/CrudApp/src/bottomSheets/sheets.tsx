import {registerSheet} from 'react-native-actions-sheet';
import {Sheets} from '../constants/SheetConstants';
import DeleteSheet from './DeleteSheet/DeleteSheet';

registerSheet(Sheets.DeleteSheet, DeleteSheet);
