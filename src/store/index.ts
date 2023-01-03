import ICourse from '../types/course';

export interface IInputData {
    idForEdit: string;
    nameInput: string;
    descInput: string;
    urlInput: string;
    courses: ICourse[];
}

export const initialState: IInputData = {
    idForEdit: '',
    nameInput: '',
    descInput: '',
    urlInput: '',
    courses: [],
};

type ACTION_TYPE =
    | { type: 'set_id_for_edit'; payload: string }
    | { type: 'set_name_input'; payload: string }
    | { type: 'set_desc_input'; payload: string }
    | { type: 'set_url_input'; payload: string };

const reducer = (state: typeof initialState, action: ACTION_TYPE) => {
    switch (action.type) {
        case 'set_id_for_edit':
            return {
                ...state,
                idForEdit: action.payload,
            };
        case 'set_name_input':
            return {
                ...state,
                nameInput: action.payload,
            };
        case 'set_desc_input':
            return {
                ...state,
                descInput: action.payload,
            };
        case 'set_url_input':
            return {
                ...state,
                urlInput: action.payload,
            };
        default:
            throw new Error('Invalid Action!');
    }
};

export default reducer;
