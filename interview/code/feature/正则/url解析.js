const urlStr = 'https://pages.tmall.com/wow/hdwk/act/2020nhj-single?wh_biz=tm&disableNav=YES&disableProgress=YES&hd_from=alipay_mayifarm&hd_from_id=100085&sceneId=972&deliveryId=8945&task_type=callapp&sceneCode=FUGUO&implId=other_0_158001_8945_0&query=spm&prismFrom=alipay_mayifarm&slk_gid=gid_er_er%7Cgid_er_evoke_ui_2%7Cgid_er_af_pop%7Cgid_er_sidebar_1&_afc_link=1&utparamcnt=%7B%22_afc_link%22%3A%221%22%7D#state';

function parseUrl(str) {
  const url = new URL(urlStr);

  const protocol = url.protocol;
  const hostname = url.hostname;
  const port = url.port ? url.port : 80;
  const pathname = url.pathname;
  const search = url.search;
  const hash = url.hash;

  const query = {};
  url.searchParams.forEach((val,key) => {
    query[key] = val;
  })
  
  return {
    protocol,
    hostname,
    port,
    pathname,
    search,
    hash,
    query
  }
}

// console.log(parseUrl(urlStr))

function parseUrlModify(str) {
  const res = {};
  // 协议
  // const protocolPos = [0,str.indexOf('://')];
  const protocolEndI = str.indexOf('://');
  res.protocol = protocolEndI !== -1 ? str.slice(0, protocolEndI) : '';
  // 为了让后续处理更佳快速，对str进行拆分，确保开头都是0
  str = str.slice(protocolEndI + 3); // 注意跳过://
  
  // 域名 和 端口
  const domainEndI = str.indexOf('/'); // 先处理域名，所以是第一个匹配的
  // 如果有域名，域名和端口会在一起
  if(domainEndI !== -1) {
    const domainStr = str.slice(0, domainEndI);
    const domainCon = domainStr.split(':');
    // 尝试拆分域名和端口
    res.hostname = domainCon[0]; // 如果没有会自动空字符串
    res.port = domainCon[1] ? domainCon[1] : '80'; // 此处需要判断，默认80
    str = str.slice(domainEndI);
  }else{
    // 没有/说明没有后续内容，直接拆分即可
    const domainCon = str.split(':');
    res.hostname = domainCon[0];
    res.port = domainCon[1] ? domainCon[1] : '';
    str = '';
  }

  // 路径名，基于查询和标记进行寻找
  let queryStartI = str.indexOf('?');
  let hashStartI = str.indexOf('#');
  if(queryStartI !== -1){
    res.pathname = str.slice(0, queryStartI);
    str = str.slice(queryStartI);
  }else{
    // 没有查询尝试找哈希
    if(hashStartI !== -1){
      res.pathname = str.slice(0, hashStartI);
      str = str.slice(hashStartI);
    }else{
      // 否则全部都是路径
      res.pathname = str;
      str = '';
    }
  }

  // 查询
  // 直接基于query和hash的start处理
  // 但注意由于str缩短，此处需要更新
  queryStartI = str.indexOf('?');
  hashStartI = str.indexOf('#');
  if(queryStartI !== -1 && hashStartI !== -1) {
    res.query = str.slice(queryStartI + 1, hashStartI);
    str = str.slice(hashStartI);
  }else{
    // 可能没有标记
    if(queryStartI !== -1){
      res.query = str.slice(queryStartI + 1);
      str = '';
    }else{
      // 没有查询
      res.query = '';
    }
  }

  // 标记
  hashStartI = str.indexOf('#');
  res.hash = hashStartI !== -1 ? str.slice(hashStartI + 1) : '';

  return res;
}

console.log(parseUrlModify(urlStr));