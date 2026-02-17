import { LightningElement } from 'lwc';

/* retrive date time for the Account Name update*/ 
const currentDate = new Date();
// Get Time components
const hours = currentDate.getHours();         // 0-23
const minutes = currentDate.getMinutes();       // 0-59
const seconds = currentDate.getSeconds();       // 0-59
// Get Date components
const year = currentDate.getFullYear();       // e.g., 2026
const month = currentDate.getMonth() + 1;     // 0-11 (January is 0), so add 1
const dayOfMonth = currentDate.getDate();      // 1-31
/* end -----------------------------------------*/ 

export default class LightningRecordEditForm extends LightningElement {

    initialAccValue;
    phoneValue;
    ratingValue;
    ratingPicklistValues = [{ label: 'Hot', value: 'Hot' },
                            { label: 'Warm', value: 'Warm' },
                            { label: 'Cold', value: 'Cold' }];

    handleAccountChange(event) {
        this.initialAccValue = event.detail.recordId;
    }

    handleChangeField(event){
        const field = event.target.dataset.field; // identifies which field changed
        const value = event.target.value;
        console.log('#### event| field:'+field+' value: '+value);
        if(field === 'Phone'){
            this.phoneValue = value;
        } else if(field === 'Rating'){
            this.ratingValue = value;
        }
        //this.phoneValue = this.template.querySelector('[data-field="Phone"]').value;
    }

    handleSubmit(event){
        console.log('Handeling submission!');
        event.preventDefault(); // stop default submissions

        let isValid = true;

        //modify the name field upon updates
        const fields = event.detail.fields; // get the form field values
        fields.Name = fields.Name.split('[')[0].trim();
        fields.Name = fields.Name+`[updated: ${hours}:${minutes}:${seconds} | ${month}/${year}]`; // modify a field

        //add validations
        const phoneField = this.template.querySelector('[data-field="Phone"]');
        const ratingField = this.template.querySelector('[data-field="Rating"]');
        
        // firstly removeing the validations
        phoneField.setCustomValidity(''); // remove validations first
        ratingField.setCustomValidity(''); // remove validations first
   
        fields.Phone = this.phoneValue; // map phone value(input value) to phone field
        fields.Rating = this.ratingValue; // map Rating value(input value) to phone field
        //phone should contains +94 in the begining
        if(fields.Phone && !fields.Phone.startsWith('+94')){
            phoneField.setCustomValidity('Phone should start with +94');
            isValid = false;
        }

        if(fields.Rating && fields.Rating !== 'Warm'){
            ratingField.setCustomValidity('Rating should be warm');
            isValid = false;
        }

        //report validity
        phoneField.reportValidity();
        ratingField.reportValidity();

        if(!isValid)
            return; // don't submit if invalid

        this.template.querySelector('[data-id=recordEditForm]').submit(fields); // re-submit with changes
    }

    handleLoad(event) { //Fires when the form and record data has finished loading on the page.
        const record = event.detail.records; // loaded record data
        const fields = Object.values(record)[0].fields;
            this.phoneValue = fields.Phone?.value || '';
            this.ratingValue = fields.Rating?.value || '';
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