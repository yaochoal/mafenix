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

export default createStore(reducer, {id: "Id por defecto",username: "Nombre por Defecto",email: "correo@pordefecto.com",avatar: "https://robohash.org/quasiquianihil.png?size=300x300&set=set1",career_id: "",aut: false});