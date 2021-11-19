import ajax  from "./network";

export const reqCategoryList = () => ajax.get('/product/getBaseCategoryList')