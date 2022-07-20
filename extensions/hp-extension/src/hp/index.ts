import hpMpr from './hpMpr';
import hpHeart from './hpHeart';
import hpMN from './hpMN';
import hpBreast from './hpBreast';

const hangingProtocols = 
  {
    hangingProtocols: [
      {
        name: 'mpr',
        protocols: [hpMpr],
      },
      {
        name: 'breast',
        protocols: [hpBreast],
      },
      {
        name: 'heart',
        protocols: [hpHeart],
      },
      {
        name: 'MN',
        protocols: hpMN,
      },
    ],
  };

export default function getHangingProtocolModule() {
  return hangingProtocols.hangingProtocols;
}
