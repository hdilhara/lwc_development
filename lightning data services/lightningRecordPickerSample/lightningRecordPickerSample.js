import { LightningElement } from 'lwc';

export default class LightningRecordPickerSample extends LightningElement {

    initialAccValue;
    initialContValue;
    disableContSelect = true;

    get filterConfigCont() {
        if(!this.initialAccValue){
            return null;
        }
        return {
            criteria: [
                {
                    fieldPath: 'AccountId',
                    operator: 'eq',
                    value: this.initialAccValue // ✅ use getter so it's reactive
                }
            ]
        };
    }

    handleAccountChange(event){
        this.initialAccValue = event.detail.recordId;
        if(!this.initialAccValue){ //falsy value | 0 '' undefined null

            // Why this Needs:
            //     value on lightning-record-picker is only used for initial render, it's not a two-way reactive binding
            //     After the component mounts, the only way to clear it programmatically is via the clearSelection() INSIDE method
            //     Always null-check with if (picker) before calling clearSelection() to avoid errors if the component hasn't rendered yet

            //     Never use document.querySelector() in LWC — always use this.template.querySelector() to stay within the component's shadow DOM
            //                 const contactPicker = this.template.querySelector('[data-id="contactPicker"]');
            const contactPicker = this.template.querySelector('[data-id="contactPicker"]');
            if(contactPicker){
                console.log(JSON.stringify(contactPicker));
                contactPicker.clearSelection();
            }
            this.initialContValue = null;
            this.disableContSelect = true;
        }else{
            this.disableContSelect = false;
        }
    }

    handleContactChange(event){

    }

}