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
        console.log('xxx Event2',event.detail);
        this.formMode = event.detail.value;

    }

    handleAccountChange(event) {
        this.initialAccValue = event.detail.recordId;

        console.log('xxx initialvalue: '+this.initialAccValue);
        console.log('xxx log: '+JSON.stringify(event.detail));
        if(!this.initialAccValue)//if falsy
        {
            // clear form value
        }
    }
}