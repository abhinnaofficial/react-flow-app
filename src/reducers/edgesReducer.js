const initialState = {
    edges: [],
};

const edgesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_EDGE':
            return {
                ...state,
                edges: [...state.edges, action.payload],
            };
        case 'DELETE_EDGE':
            return {
                ...state,
                edges: state.edges.filter(edge => edge.id !== action.payload),
            };
        default:
            return state;
    }
};

export default edgesReducer;
