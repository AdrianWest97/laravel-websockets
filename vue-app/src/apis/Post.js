import Api from '../apis/Api';

export default {
    create(form, mode,id) {
        return Api().post(`post/create/${mode}/${id}`, form);
    },
    
    delete(id) {
        return Api().delete(`post/delete/${id}`);
    },
    ById(id) {
        return Api().get(`post/get/${id}`);
    },
}