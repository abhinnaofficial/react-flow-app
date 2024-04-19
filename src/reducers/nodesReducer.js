const initialState = {
    nodes: [
        {
            id: '1',
            position: { x: 0, y: 0 },
        },
        {
            id: '2',
            position: { x: 30, y: 30 },
        },
    ],
};

const nodesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NODE':
            return {
                ...state,
                nodes: [...state.nodes, action.payload],
            };
        case 'DELETE_NODE':
            return {
                ...state,
                nodes: state.nodes.filter(node => node.id !== action.payload),
            };
        default:
            return state;
    }
};

export default nodesReducer;
