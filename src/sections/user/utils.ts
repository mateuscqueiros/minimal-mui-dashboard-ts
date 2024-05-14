export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(a: any[], b: any[], orderBy: string) {
  if (a[orderBy as any] === null) {
    return 1;
  }
  if (b[orderBy as any] === null) {
    return -1;
  }
  if (b[orderBy as any] < a[orderBy as any]) {
    return -1;
  }
  if (b[orderBy as any] > a[orderBy as any]) {
    return 1;
  }
  return 0;
}
export function getComparator(order: 'desc' | 'asc', orderBy: string) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

export function applyFilter({ inputData, comparator, filterName }: { inputData: any[]; comparator: (a: any, b: any) => void; filterName?: string }) {
  const stabilizedThis: any[] = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a: any, b: any) => {
    console.log(a, b)
    const order: any = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
