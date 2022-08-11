import { SynchronizerManager, Synchronizer } from '@cornerstonejs/tools';
import { eventTarget } from '@cornerstonejs/core';

function targetEventListener(listener, evt) {
  console.log('targetEventListener', evt, this);
  const { detail } = evt;
  const { viewportId } = detail;
  const { options } = viewportId;
  const viewportInfo = this._viewportMap[viewportId];
  console.log('viewportInfo=', viewportInfo);
  if( !viewportInfo ) return;
  listener.call(options,this,viewportInfo,evt);
}

function add(viewportInfo) {
  const { viewportId } = viewportInfo;

  this._viewportMap[viewportId] = { ...viewportInfo };

  console.log("Add viewport info called for", viewportId);
}

function addEvent(eventName, listener) {
  if( !eventName ) throw new Error(`No event name specified for ${id}`);
  if( this._eventHandlers[eventName] ) {
    console.log("Event", eventName, "already bound");
    return;
  }
  this._eventHandlers[eventName] = targetEventListener.bind(this,listener);
  eventTarget.addEventListener(eventName, this._eventHandlers[eventName]);
}

export default (id, eventName, callback) => {
  const synchronizer = SynchronizerManager.createSynchronizer(id, eventName, callback);

  synchronizer.add = add;
  synchronizer._viewportMap = {};
  synchronizer._eventHandlers = {};
  synchronizer.addEvent = addEvent;
  synchronizer.addEvent(eventName, synchronizer._eventHandler);

  return synchronizer;
}