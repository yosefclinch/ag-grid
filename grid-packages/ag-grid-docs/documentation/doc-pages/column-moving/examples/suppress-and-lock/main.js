const columnDefs = [
    {field: 'athlete', suppressMovable: true, width: 150, cellClass: 'suppress-movable-col'},
    {field: 'age', lockPosition: true, cellClass: 'locked-col'},
    {field: 'country', width: 150},
    {field: 'year'},
    {field: 'date'},
    {field: 'sport'},
    {field: 'gold'},
    {field: 'silver'},
    {field: 'bronze'},
    {field: 'total'}
];

const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
        width: 150
    },
    suppressDragLeaveHidesColumns: true,
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then(response => response.json())
        .then(data => gridOptions.api.setRowData(data));
});
