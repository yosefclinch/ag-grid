    var columnDefs = [
        {headerName: "Person", field: 'name', width: 400,
            cellClass: 'person-section'
        },
        {
            headerName: 'Weekly Editable Values',
            children: [
                {headerName: "Monday",  field: "mon", newValueHandler: numberNewValueHandler, editable: true},
                {headerName: "Tuesday", field: "tue", newValueHandler: numberNewValueHandler, editable: true},
                {headerName: "Wednesday", field: "wed", newValueHandler: numberNewValueHandler, editable: true},
                {headerName: "Thursday", field: "thur", newValueHandler: numberNewValueHandler, editable: true},
                {headerName: "Friday", field: "fri", newValueHandler: numberNewValueHandler, editable: true}
            ]
        },
        {
            headerName: 'Volatile Summary',
            children: [
                {headerName: "Total",
                    valueGetter: "data.mon + data.tue + data.wed + data.thur + data.fri",
                    volatile: true,
                    cellClass: 'volatile-section'
                },
                {headerName: "Avg",
                    valueGetter: "(data.mon + data.tue + data.wed + data.thur + data.fri) / 5",
                    volatile: true,
                    cellClass: 'volatile-section'
                }
            ]
        },
        {
            headerName: 'Hard Summary',
            children: [
                {headerName: "Total",
                    valueGetter: "data.mon + data.tue + data.wed + data.thur + data.fri",
                    cellClass: 'hard-section'
                },
                {headerName: "Avg",
                    valueGetter: "(data.mon + data.tue + data.wed + data.thur + data.fri) / 5",
                    cellClass: 'hard-section'
                }
            ]
        }
    ];

    var data = [
        {name: 'Saoirse Ronan', nationality: 'Irish', mon: 1, tue: 1, wed: 1, thur: 1, fri: 1},
        {name: 'Colin Farrell', nationality: 'Irish',mon: 5, tue: 5, wed: 5, thur: 5, fri: 5},
        {name: 'Cillian Murphy', nationality: 'Irish',mon: 1, tue: 2, wed: 3, thur: 4, fri: 5},
        {name: 'Pierce Brosnan', nationality: 'Irish',mon: 1, tue: 1, wed: 1, thur: 1, fri: 1},
        {name: 'Liam Neeson', nationality: 'Irish',mon: 5, tue: 5, wed: 5, thur: 5, fri: 5},
        {name: 'Gabriel Byrne', nationality: 'Irish',mon: 1, tue: 2, wed: 3, thur: 4, fri: 5},
        {name: 'Stephen Rea', nationality: 'Irish',mon: 1, tue: 1, wed: 1, thur: 1, fri: 1},
        {name: 'Michael Fassbender', nationality: 'Irish',mon: 5, tue: 5, wed: 5, thur: 5, fri: 5},
        {name: 'Richard Harris', nationality: 'Irish',mon: 1, tue: 2, wed: 3, thur: 4, fri: 5},
        {name: 'Brendan Gleeson', nationality: 'Irish',mon: 1, tue: 1, wed: 1, thur: 1, fri: 1},
        {name: 'Colm Meaney', nationality: 'Irish',mon: 5, tue: 5, wed: 5, thur: 5, fri: 5},
        {name: 'Niall Crosby', nationality: 'Irish',mon: 1, tue: 2, wed: 3, thur: 4, fri: 5},
        {name: 'Brad Pitt', nationality: 'American',mon: 1, tue: 2, wed: 3, thur: 4, fri: 5},
        {name: 'Edward Norton', nationality: 'American',mon: 1, tue: 2, wed: 3, thur: 4, fri: 5},
        {name: 'Laurence Fishburne', nationality: 'American',mon: 1, tue: 2, wed: 3, thur: 4, fri: 5},
        {name: 'Bruce Willis', nationality: 'American' ,mon: 1, tue: 2, wed: 3, thur: 4, fri: 5}
    ];

    function numberNewValueHandler(params) {
        var valueAsNumber = parseInt(params.newValue);
        if (isNaN(valueAsNumber)) {
            window.alert("Invalid value " + params.newValue + ", must be a number");
        } else {
            params.data[params.colDef.field] = valueAsNumber;
        }
    }

    var gridOptions = {
        columnDefs: columnDefs,
        rowData: data,
        onCellValueChanged: function( ){
            gridOptions.api.refreshCells({volatile: true, flash: true});
        },
        onGridReady: function(event) {
            event.api.sizeColumnsToFit();
        }
    };

    function onRefreshAllCells() {
        gridOptions.api.refreshCells({flash: true});
    }

    // setup the grid after the page has finished loading
    document.addEventListener('DOMContentLoaded', function() {
        var gridDiv = document.querySelector('#myGrid');
        new agGrid.Grid(gridDiv, gridOptions);
    });