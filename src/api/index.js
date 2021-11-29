import ajax  from "./network";
import mAjax from "./mNetwork";

export const reqCategoryList = () => ajax.get('/product/getBaseCategoryList');
// 用模拟服务器实现的请求
export const reqRollPlayList = () => mAjax.get('/rollplay')
export const reqFloorList = () => mAjax.get('/floor')
// 搜索页面的数据请求
export const reqSearchInfo = (searchParams) => ajax.post('/list', searchParams);
// 商品详情接口
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`);



