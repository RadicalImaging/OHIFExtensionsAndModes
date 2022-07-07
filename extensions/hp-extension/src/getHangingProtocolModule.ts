import mpr from './mpr';
import hpHeart from './hpHeart';
import hpMN from './hpMN';

const hangingProtocols = {
  hangingProtocols:[
  {
    name: 'mpr',
    protocols: [mpr],
  },
  {
    name: 'heart',
    protocols: [hpHeart],
  },
  {
    name: 'MN',
    protocols: [hpMN],
  },
],
};

export default function getHangingProtocolModule() {
  console.log("getHangingProtocolModule returning", hangingProtocols.hangingProtocols);
  return hangingProtocols.hangingProtocols;
}
