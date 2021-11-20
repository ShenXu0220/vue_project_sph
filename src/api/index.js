import ajax  from "./network";
import mAjax from "./mNetwork";

export const reqCategoryList = () => ajax.get('/product/getBaseCategoryList');
// 用模拟服务器实现的请求
export const reqRollPlayList = () => mAjax.get('/rollplay')
export const reqFloorList = () => mAjax.get('/floor')

