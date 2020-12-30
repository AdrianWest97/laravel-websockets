import Api from './Api';

export default {
    Create(data) {
        return Api().post("/comment/create", data);
    },
    delete(id) {
        return Api().delete(`/comment/delete/${id}`);
    }
}