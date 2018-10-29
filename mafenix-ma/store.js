import { createStore } from 'redux';

const reducer = (state,action) => {
    if(action.type === "ADD_TO_STORE"){
        return{
            ...state,
            id: action.id,
            username: action.username,
            email: action.email,
            avatar: action.avatar,
            aut: true
        }
    }
    return state;
};

export default createStore(reducer, {id: "sinnada",username: "sinnadas",email: "",avatar: "",career_id: "",aut: false});