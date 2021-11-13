/**
 * 根据字符串获取对应对象
 * @param str 
 * @param name 
 */
function getAttrObj(str = '', name = 'allowedAttributes') {
  // match allowedAttributes obj
  let res = str.replace(/[\r\n\t\s]/g, '').match(new RegExp(`${name}\\s*=\\s*\(\\{\\s*\[^;\]*\\\})`))[1] || '';
  // hanlde ''
  res = res.replace(/''/g, '""').replace(/'/g, '');
  // handle keys quotation mark
  res = res.replace(/([^:{},]+):/g, '"$1":');
  // handle values quotation mark
  res = res.replace(/:([^:;"]+),/g, ':"$1",').replace(/,}/g, '}');
  return JSON.parse(res);
}

/**
 * 通过 class 字符串获取 属性的 md 表格
 * 获取 API 表格
 * @param str 
 */
function classStrToMdTable(str) {
  const allowedAttrs = getAttrObj(str);
  const defaultAttrs = getAttrObj(str, 'defaultAttributes');
  let res = '| Attributes | Descript | Value | Default |\n| ---- | ---- | ---- | ---- |\n';
  for (const key in allowedAttrs) {
    res += `| ${key} |  | ${allowedAttrs[key]} | ${defaultAttrs[key]} |\n`;
  }

  return res;
}

console.log(classStrToMdTable(str));

/**
 * 通过 class 字符串获取 属性的 md 表格
 * 获取 API 表格
 * 带有填充，保证表格宽度一致
 * @param str 
 */
function classStrToMdTableWidthFormat(str) {
  const allowedAttrs = getAttrObj(str);
  const defaultAttrs = getAttrObj(str, 'defaultAttributes');

  // handle head
  const heads = {
    Attributes: 10,
    Descript: 8,
    Value: 5,
    Default: 7,
  };

  // get table max width
  for (const key in allowedAttrs) {
    if (key.length > heads['Attributes']) {
      heads['Attributes'] = key.length;
    }
    if (allowedAttrs[key].length > heads['Value']) {
      heads['Value'] = allowedAttrs[key].length;
    }
  }
  for (const key in defaultAttrs) {
    if (defaultAttrs[key].length > heads['Default']) {
      heads['Default'] = defaultAttrs[key].length;
    }
  }

  let res = '';
  // handle head
  for (let key in heads) {
    res += `| ${fillWhiteByNum(key, heads[key])} `;
  }
  res += '|\n'

  // handle split line of head & body
  for (let key in heads) {
    res += `| ${fillWhiteByNum('', heads[key], '-')} `;
  }
  res += '|\n'

  // handle body
  for (const key in allowedAttrs) {
    const defaultVal = defaultAttrs[key] || '';
    const val = {
      Attributes: key,
      Descript: '',
      Value: allowedAttrs[key],
      Default: defaultAttrs[key] === undefined ? '' : defaultAttrs[key],
    }
    for (const k in heads) {
      const it = val[k];
      res += `| ${fillWhiteByNum(it, heads[k])} `;
    }
    res += '|\n';
  }

  return res;
}

function fillWhiteByNum(str = '', max = 0, fillUnit = ' ') {
  let res = '';
  for (let i = 0; i < (max - str.length); i++) {
    res += fillUnit;
  }
  return str + res;
}

console.log(classStrToMdTableWidthFormat(str));