/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';

export default class ShowUsbDevices extends LightningElement {

    pictureurl = 'https://sfdcdemofiles.s3.eu-central-1.amazonaws.com/sprctro2guide.png'
    usboffurl = 'https://sfdcdemofiles.s3.eu-central-1.amazonaws.com/usb-off.png'

    @track
    firsttime = true
    
    @track
    vid

    @track
    realdevicename

    @track
    deviceobject

    @api
    handleClick() {        
        console.log('Show USB Debug')
        // Creates the event with the contact ID data.
        const selectedEvent = new CustomEvent('getdevice', { bubbles: true, composed: true })
        // Dispatches the event.
        this.dispatchEvent(selectedEvent)
    }

    @api
    responseEvent(device) {
        if(device){
            console.log('Response Event:' + device)
            console.log('Vendor Id: ' + device.deviceDescriptor.idVendor)
            this.firsttime = false
            this.deviceobject = device
            this.vid = device.deviceDescriptor.idVendor        
            const productNameEvent = new CustomEvent('getdevicename', { bubbles: true, composed: true })
            this.dispatchEvent(productNameEvent)
        } else {
            console.log('No device found')
            this.vid = null
            this.realdevicename = null
            this.deviceobject = null
        }
    }

    @api
    deviceNameResponseEvent(deviceName){
        console.log('Got response for device name: ' + deviceName)
        this.realdevicename = deviceName
    }

    connectedCallback(){
        console.log('Connected Callback called')
    }
}