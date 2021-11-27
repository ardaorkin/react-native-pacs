export default function convertUUID(uuidStr) {
  const uuidArr = [];
  const splitted = uuidStr.split('');
  for (let index = 0; index < uuidStr.length; index++) {
    if (index % 2 === 1) {
      const strWillPush = splitted[index - 1] + splitted[index];
      uuidArr.push(strWillPush);
    }
  }
  return parseInt(uuidArr.reverse().join(''), 16).toString();
}
