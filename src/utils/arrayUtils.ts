export function uniqueArray<T>(arr: Array<T>) {
  return Array.from(new Set(arr));
}

// 对比两个数组是否相同
export function compareArraysEqual<T>(arr1: Array<T>, arr2: Array<T>) {
  // 两边随便谁不存在，都代表不相同
  if (!arr1 || !arr2) {
    return false;
  }

  arr1 = uniqueArray(arr1);
  arr2 = uniqueArray(arr2);

  // 如果长度不同，那肯定就不同
  if (arr1.length !== arr2.length) {
    return false;
  }
  // 排序后进行比较，保证所有元素是在同一个位置
  arr1.sort();
  arr2.sort();

  return arr1.some((item, index) => {
    let a2 = arr2[index];
    return item === a2;
  });
}

export function sortByKey<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
	return array.sort((a, b) => {
		const compareResult = order === 'asc' ? 1 : -1;
		if (a[key] < b[key]) return -1 * compareResult;
		if (a[key] > b[key]) return 1 * compareResult;
		return 0;
	});
}