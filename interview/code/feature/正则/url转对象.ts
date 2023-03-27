const protocol = '(?<protocol>https?:)';
const host = '(?<host>(?<hostname>[^/#?:]+)(?::(?<port>\\d+))?)';
const path = '(?<pathname>(?:\\/[^/#?]+)*\\/?)';
const search = '(?<search>(?:\\?[^#]*)?)';
const hash = '(?<hash>(?:#.*)?)';
const reg = new RegExp(`^${protocol}\/\/${host}${path}${search}${hash}$`);
// 拆分整个url
function execUrl(url: string) {
  const result = reg.exec(url);
  if (result && result.groups) {
    result.groups.port = result.groups.port || '';
    return result.groups;
  }
  return {
    protocol: '', host: '', hostname: '', port: '',
    pathname: '', search: '', hash: '',
  };
}

console.log(execUrl('https://localhost:8080/?a=b#xxxx'));
// protocol: "https:"
// host: "localhost:8080"
// hostname: "localhost"
// port: "8080"
// pathname: "/"
// search: "?a=b"
// hash: "#xxxx"

// 处理查询和哈希
function execUrlParams(paramStr: string) {
  paramStr = paramStr.replace(/^[#?&]/, '');
  const result = {};
  if (!paramStr) { //如果正则可能配到空字符串，极有可能造成死循环，判断很重要
    return result;
  }
  const reg = /(?:^|&)([^&=]*)=?([^&]*?)(?=&|$)/y
  let exec = reg.exec(paramStr);
  while (exec) {
    // 一次匹配一个参数
    result[exec[1]] = exec[2];
    exec = reg.exec(paramStr);
  }
  return result;
}
console.log(execUrlParams('#'));// {}
console.log(execUrlParams('##'));//{'#':''}
console.log(execUrlParams('?q=3606&src=srp')); //{q: "3606", src: "srp"}
console.log(execUrlParams('test=a=b=c&&==&a='));//{test: "a=b=c", "": "=", a: ""}
