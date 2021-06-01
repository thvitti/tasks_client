// let APIRoot = "http://localhost:3001";
let APIRoot = "https://rails-react-todo-api.herokuapp.com";

const APIEndpoints = {

    TASKS_DESTROY_ALL: APIRoot + `/tasks/destroy_all`,
    TASKS: APIRoot + "/tasks",

}
export default APIEndpoints;
