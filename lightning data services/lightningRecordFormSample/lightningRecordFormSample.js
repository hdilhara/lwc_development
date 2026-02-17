import { LightningElement } from 'lwc';

/* retrive date time for the Account Name update*/ 
const currentDate = new Date();
// Get Time components
const hours = currentDate.getHours();         // 0-23
const minutes = currentDate.getMinutes();       // 0-59
// const seconds = currentDate.getSeconds();       // 0-59
// Get Date components
const year = currentDate.getFullYear();       // e.g., 2026
const month = currentDate.getMonth() + 1;     // 0-11 (January is 0), so add 1
const dayOfMonth = currentDate.getDate();      // 1-31


export default class LightningRecordFormSample extends LightningElement {
    
    initialAccValue;

    //Form fields defined for the Record Form
    accFormFields = ['Name', 'Phone', 'Rating' ,'BillingAddress'];
    //Form Mode | edit | view | readonly
    formMode = 'readonly'; 
    formModeOptions = [
        { label: 'Edit', value: 'edit' },
        { label: 'View', value: 'view' },
        { label: 'Read Only', value: 'readonly' },
    ];

    handleFormModeChange(event){
        this.formMode = event.detail.value;
    }

    handleAccountChange(event) {
        this.initialAccValue = event.detail.recordId;
    }

    handleSubmit(event){
        console.log('Handeling submission!');
        event.preventDefault(); // stop default submissions

        //modify the name field upon updates
        const fields = event.detail.fields; // get the form field values
        fields.Name = fields.Name.split('[')[0].trim();
        fields.Name = fields.Name+`[updated: ${hours}:${minutes} | ${month}/${year}]`; // modify a field

        this.template.querySelector('[data-id=recordForm]').submit(fields); // re-submit with changes
    }

    handleLoad(event) { //Fires when the form and record data has finished loading on the page.
        const record = event.detail.records; // loaded record data
        console.log('Form loaded', record);
    }

    handleSuccess(event) { //Fires when the record is successfully saved/created.
        const record = event.detail; // contains the saved record data
        console.log('On success:', event.detail.id);
    }

    handleError(event) { //Fires when the form fails to save due to validation or server errors.
    const error = event.detail; // contains error details
        console.log('Error message:', event.detail.message);
        console.log('Error detail:', event.detail.detail);
    }
}
