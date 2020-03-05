import logger from '../../../../logger';
import { dispatchEvent } from '../../../../utils/skylinkEventManager';
import { onDataChannelStateChanged } from '../../../../skylink-events';
import PeerConnection from '../../../index';
import { DATA_CHANNEL_STATE } from '../../../../skylink-events/constants';
import Skylink from '../../../../index';

/**
 *
 * @param {Object} params
 * @fires onDataChannelStateChanged
 * @memberOf PeerConnection.PeerConnectionHelpers.CreateDataChannelCallbacks
 */
const onbufferedamountlow = (params) => {
  const {
    dataChannel,
    peerId,
    channelName,
    channelProp,
    channelType,
    roomState,
  } = params;

  const state = Skylink.getSkylinkState(roomState.room.id);
  const { room } = state;
  logger.log.DEBUG([peerId, 'RTCDataChannel', channelProp, 'Datachannel buffering data transfer low']);

  dispatchEvent(onDataChannelStateChanged({
    state: DATA_CHANNEL_STATE.BUFFERED_AMOUNT_LOW,
    room,
    peerId,
    channelName,
    channelType,
    bufferAmount: PeerConnection.getDataChannelBuffer(dataChannel),
  }));
};

export default onbufferedamountlow;
