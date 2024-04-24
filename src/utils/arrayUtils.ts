export function sortByKey<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
	return array.sort((a, b) => {
		const compareResult = order === 'asc' ? 1 : -1;
		if (a[key] < b[key]) return -1 * compareResult;
		if (a[key] > b[key]) return 1 * compareResult;
		return 0;
	});
}