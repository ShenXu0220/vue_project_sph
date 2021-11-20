import ajax  from "./network";

export const reqCategoryList = () => ajax.get('/product/getBaseCategoryList');
export const reqSearchList = (data) => ajax.post('/list', data);