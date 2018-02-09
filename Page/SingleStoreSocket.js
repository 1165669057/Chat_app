
import StoreSocket from './store/StoreSocket';
import StoreManger from './store/StoreManger';
const  storeSocket=new StoreSocket();
const storeManger=new StoreManger(storeSocket);
export {
    storeSocket,
    storeManger,
};