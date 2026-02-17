import { LightningElement } from 'lwc';

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
}
