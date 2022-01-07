import {InternshipProps} from "../components/internships/InternshipProps";
import React, {useCallback, useContext, useEffect, useReducer} from "react";
import PropTypes from 'prop-types';
import {AccountContext} from "./AccountProvider";
import {createInternship, getInternships, updateInternship} from "./internshipsApi";


type SaveInternshipFn = (internship: InternshipProps) => Promise<any>;

export interface InternshipsState{
    internships?: InternshipProps[],
    fetching: boolean,
    fetchingError?: Error | null,
    saving: boolean,
    savingError?: Error | null,
    saveInternship?: SaveInternshipFn
}
interface ActionProps {
    type: string,
    payload?: any,
}

const initialState: InternshipsState = {
    fetching: false,
    saving: false
}

const FETCH_INTERNSHIPS_STARTED = 'FETCH_INTERNSHIPS_STARTED';
const FETCH_INTERNSHIPS_SUCCEEDED = 'FETCH_INTERNSHIPS_SUCCEEDED';
const FETCH_INTERNSHIPS_FAILED = 'FETCH_INTERNSHIPS_FAILED';
const SAVE_INTERNSHIP_STARTED = 'SAVE_INTERNSHIP_STARTED';
const SAVE_INTERNSHIP_SUCCEEDED = 'SAVE_INTERNSHIP_SUCCEEDED';
const SAVE_INTERNSHIP_FAILED = 'SAVE_INTERNSHIP_FAILED';

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
                const index = internships.findIndex(it => it._id === internship._id);
                if (index === -1) {
                    internships.splice(0, 0, internship);
                } else {
                    internships[index] = internship;
                }
                return { ...state, internships, saving: false };
            case SAVE_INTERNSHIP_FAILED:
                return { ...state, savingError: payload.error, saving: false };
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
    const { internships, fetching, fetchingError, saving, savingError } = state;

    const saveInternship = useCallback<SaveInternshipFn>(saveInternshipCallback, []);
    
    const value = { internships, fetching, fetchingError, saving, savingError, saveInternship };

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
                const internships = await getInternships();
                console.log('fetchInternships succeeded');
                if (!canceled) {
                    dispatch({ type: FETCH_INTERNSHIPS_SUCCEEDED, payload: { internships } });
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
            const savedInternship = await (internship._id ? updateInternship(internship) : createInternship(internship));
            console.log('saveInternship succeeded');
            dispatch({ type: SAVE_INTERNSHIP_SUCCEEDED, payload: { internship: savedInternship } });
        } catch (error) {
            console.log('saveInternship failed');
            dispatch({ type: SAVE_INTERNSHIP_FAILED, payload: { error } });
        }
    }
    
    return (
        <InternshipContext.Provider value={value}>
            {children}
        </InternshipContext.Provider>
    );
    
}
