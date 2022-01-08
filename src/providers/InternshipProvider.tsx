import {InternshipProps} from "../components/internships/InternshipProps";
import React, {useCallback, useContext, useEffect, useReducer} from "react";
import PropTypes from 'prop-types';
import {AccountContext} from "./AccountProvider";
import {createInternship, deleteInternship, getInternships, updateInternship} from "./internshipsApi";


type SaveInternshipFn = (internship: InternshipProps) => Promise<any>;
type DeleteInternshipFn = (internship: InternshipProps) => Promise<any>;

export interface InternshipsState{
    internships?: InternshipProps[],
    fetching: boolean,
    fetchingError?: Error | null,
    saving: boolean,
    savingError?: Error | null,
    save_Internship?: SaveInternshipFn,
    deleting: boolean,
    deletingError?: Error | null,
    delete_Internship?: DeleteInternshipFn,
}
interface ActionProps {
    type: string,
    payload?: any,
}

const initialState: InternshipsState = {
    fetching: false,
    saving: false,
    deleting: false
}

const FETCH_INTERNSHIPS_STARTED = 'FETCH_INTERNSHIPS_STARTED';
const FETCH_INTERNSHIPS_SUCCEEDED = 'FETCH_INTERNSHIPS_SUCCEEDED';
const FETCH_INTERNSHIPS_FAILED = 'FETCH_INTERNSHIPS_FAILED';
const SAVE_INTERNSHIP_STARTED = 'SAVE_INTERNSHIP_STARTED';
const SAVE_INTERNSHIP_SUCCEEDED = 'SAVE_INTERNSHIP_SUCCEEDED';
const SAVE_INTERNSHIP_FAILED = 'SAVE_INTERNSHIP_FAILED';
const DELETE_INTERNSHIP_STARTED = 'DELETE_INTERNSHIP_STARTED';
const DELETE_INTERNSHIP_SUCCEEDED = 'DELETE_INTERNSHIP_SUCCEEDED';
const DELETE_INTERNSHIP_FAILED = 'DELETE_INTERNSHIP_FAILED';

const reducer: (state: InternshipsState, action: ActionProps) => InternshipsState =
    (state, {type, payload}) => {
        switch (type) {
            case FETCH_INTERNSHIPS_STARTED:
                return { ...state, fetching: true, fetchingError: null };
            case FETCH_INTERNSHIPS_SUCCEEDED:
                return { ...state, internships: payload.internships, fetching: false };
            case FETCH_INTERNSHIPS_FAILED:
                return { ...state, fetchingError: payload.error, fetching: false };
            case SAVE_INTERNSHIP_STARTED:
                return { ...state, savingError: null, saving: true };
            case SAVE_INTERNSHIP_SUCCEEDED:
                const internships = [...(state.internships || [])];
                const internship = payload.internship;
                const index = internships.findIndex(it => it.id === internship.id);
                if (index === -1) {
                    internships.splice(0, 0, internship);
                } else {
                    internships[index] = internship;
                }
                return { ...state, internships, saving: false };
            case SAVE_INTERNSHIP_FAILED:
                return { ...state, savingError: payload.error, saving: false };
            case DELETE_INTERNSHIP_STARTED:
                return { ...state, deletingError: null, deleting: true };
            case DELETE_INTERNSHIP_SUCCEEDED:
                const initial_internships = [...(state.internships || [])];
                const deleted_internship = payload.internship;
                const deleted_index = initial_internships.findIndex(it => it.id === deleted_internship.id);
                if (deleted_index !== -1) {
                    initial_internships.splice(deleted_index, 1);
                }
                console.log(initial_internships);
                return { ...state, internships: initial_internships, deleting: false };
            case DELETE_INTERNSHIP_FAILED:
                return { ...state, deletingError: payload.error, deleting: false };
            default:
                return state;
        }
    }

export const InternshipContext = React.createContext<InternshipsState>(initialState);

interface InternshipProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const InternshipProvider: React.FC<InternshipProviderProps> = ({ children }) => {
    const {userId, getUser} = useContext(AccountContext)
    const [state, dispatch] = useReducer(reducer, initialState);
    const { internships, fetching, fetchingError, saving, savingError, deleting, deletingError } = state;

    const save_Internship = useCallback<SaveInternshipFn>(saveInternshipCallback, []);
    const delete_Internship = useCallback<DeleteInternshipFn>(deleteInternshipCallback, []);

    const value = { internships, fetching, fetchingError, saving, savingError, save_Internship, deleting, deletingError, delete_Internship };

    useEffect(() => {
        getUser?.();
    }, [])
    useEffect(getInternshipsEffect, [userId]);

    function getInternshipsEffect() {
        let canceled = false;
        fetchInternships();
        return () => {
            canceled = true;
        }

        async function fetchInternships() {
            if (!userId) {
                return;
            }
            try {
                console.log('fetchInternships started');
                dispatch({ type: FETCH_INTERNSHIPS_STARTED });
                const response = await getInternships();
                console.log('fetchInternships succeeded');
                if (!canceled) {
                    dispatch({ type: FETCH_INTERNSHIPS_SUCCEEDED, payload: {internships :response.data }});
                }
            } catch (error) {
                console.log('fetchInternships failed');
                dispatch({ type: FETCH_INTERNSHIPS_FAILED, payload: { error } });
            }
        }
    }

    async function saveInternshipCallback(internship: InternshipProps) {
        try {
            console.log('saveInternship started');
            dispatch({ type: SAVE_INTERNSHIP_STARTED });
            const response = await (internship.id ? updateInternship(internship) : createInternship(internship));
            console.log('saveInternship succeeded');
            dispatch({ type: SAVE_INTERNSHIP_SUCCEEDED, payload: { internship: response.data } });
        } catch (error) {
            console.log('saveInternship failed');
            dispatch({ type: SAVE_INTERNSHIP_FAILED, payload: { error } });
        }
    }

    async function deleteInternshipCallback(internship: InternshipProps) {
        try {
            console.log('deleteInternship started');
            dispatch({ type: DELETE_INTERNSHIP_STARTED });
            const deleted_internship = await deleteInternship(internship);
            console.log('deleteInternship succeeded');
            dispatch({ type: DELETE_INTERNSHIP_SUCCEEDED, payload: { internship: internship } });
        } catch (error) {
            console.log('deleteInternship failed');
            dispatch({ type: DELETE_INTERNSHIP_FAILED, payload: { error } });
        }
    }
    
    return (
        <InternshipContext.Provider value={value}>
            {children}
        </InternshipContext.Provider>
    );
    
}
