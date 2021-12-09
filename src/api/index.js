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
// 添加到购物车的接口 以及修改商品数量
export const reqAddOrUpdateCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${ skuId }/${ skuNum }`);
// 获取购物车列表接口
export const reqShopCartList = () => ajax.get('/cart/cartList');
// 切换点击选中商品状态
export const reqCheckSkuInCart = (skuId, isChecked) => ajax.get(`/cart/checkCart/${ skuId }/${ isChecked} `);
// 批量选中商品的接口
export const reqCheckAllSkuInCart = (isChecked,skuIdList) => ajax.post(`/cart/batchCheckCart/${ isChecked }`,skuIdList);
// 单个商品的删除接口
export const reqDeleteSkuInCart = (skuId) => ajax.delete(`/cart/deleteCart/${ skuId }`);
// 批量删除选中的商品接口
export const reqDeleteAllSkuInCart = (skuIdList) => ajax.delete('/cart/batchDeleteCart',{data:skuIdList});
// 用于发送验证码
export const reqVerifyCode = (phone) => ajax.get(`/user/passport/sendCode/${phone}`);
// 用于注册的接口
export const reqRegister = (params) => ajax.post('/user/passport/register', params);
// 用于登录接口
export const reqLogin = (loginParams) => ajax.post('/user/passport/login', loginParams);
// 通过token来获取用户信息
export const reqUserInfo = () => ajax.get('/user/passport/auth/getUserInfo');
// 退出登录的接口
export const reqUserExit = () => ajax.get('/user/passport/logout');
// 获取交易页面信息
export const reqUserTrade = () => ajax.get('/order/auth/trade');
// 获取用户地址信息
export const reqUserAddressList = () => ajax.get('/user/userAddress/auth/findUserAddressList');
// 提交订单的接口
export const reqSubmitOrder = (tradeNo, params) => ajax.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,params);
// 请求某订单的具体支付信息
export const reqPaymentInfo = (orderId) => ajax.get(`/payment/weixin/createNative/${orderId}`);
// 支付订单状态
export const reqPaymentState = (orderId) => ajax.get(`/payment/weixin/queryPayStatus/${orderId}`);
// 获取订单列表的信息
export const reqUserOrderInfo = (page, limit) => ajax.get(`/order/auth/${page}/${limit}`);