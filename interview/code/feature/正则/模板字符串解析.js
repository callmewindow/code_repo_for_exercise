/*
问题：实现通用模版字符串解析方法，从对象中取值替换对应标记;
*/

const data = { brand: 'Apple', model:'iPhone10,1', price: 1234 };

const tpl = '$model$, 应为$brand$手机，预估价格$price$ $ $$.';

function parse(tpl, data) {
  // 匹配$$中间的单词
  const regex = /\$(\w+)\$/g; // 加括号包裹一组匹配值，快速处理内部单词
  
  // replace匹配
  const res = tpl.replace(regex, (match, key) => {
    // 匹配成功后进行处理
    // console.log(match ,key);
    // key即匹配组内部的值
    // 尝试从data中获取键对应的值，没有为空
    return data.hasOwnProperty(key) ? data[key] : '';
  });

  return res; // iPhone10,1 应为Apple手机，预估价格1234 $ $$ .
}

console.log(parse(tpl, data));