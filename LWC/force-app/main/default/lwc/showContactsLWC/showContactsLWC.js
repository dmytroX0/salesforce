import {LightningElement, wire, track} from 'lwc';
import getContacts from '@salesforce/apex/ProjectsController.getContacts';

const columns = [
    {
        label: 'FirstName',
        fieldName: 'FirstName',
        sortable: "true"
    }, {
        label: 'LastName',
        fieldName: 'LastName',
        sortable: "true"
    }, {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        sortable: "true"
    }, {
        label: 'Email',
        fieldName: 'Email',
        type: 'email'
    },
];

export default class DataTableWithSortingInLWC extends LightningElement { 
    @track data;
    @track columns = columns;
    @track sortBy;
    @track sortDirection;

    @wire(getContacts)
    contacts(result) {
        if (result.data) {
            this.data = result.data;
            this.error = undefined;

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    handleSortdata(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(event.detail.fieldName, event.detail.sortDirection);
    }

    sortData(fieldname, direction) {
        
        let parseData = JSON.parse(JSON.stringify(this.data));
        let keyValue = (a) => {
            return a[fieldname];
        };
        let isReverse = direction === 'asc' ? 1: -1;

        
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';

            return isReverse * ((x > y) - (y > x));
        });

       
        this.data = parseData;

    }

}