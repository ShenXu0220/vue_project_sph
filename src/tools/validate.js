import Vue from 'vue'
import VeeValidate,{ Validator } from 'vee-validate';
// 引入中文包
import zh_CN from 'vee-validate/dist/locale/zh_CN';

// 使用插件
Vue.use(VeeValidate)
//应用语言包
Validator.localize('zh_CN', zh_CN);

//手机号规则
Validator.extend('phone_routes',{
  getMessage:field => field+'格式不合法!',
  validate:value => (/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/).test(value)
})

//验证码规则
Validator.extend('code_routes',{
  getMessage:field => field+'必须为6位数字',
  validate:value => (/^\d{6}$/).test(value)
})

//密码规则
Validator.extend('psw_routes',{
  getMessage:field => field+'必须为6-21位',
  validate:value => (/^\w{6,21}$/).test(value)
})

//协议规则
Validator.extend('xieyi_routes', {
  validate: value => value,
  getMessage: field => field + '必须同意'
})
