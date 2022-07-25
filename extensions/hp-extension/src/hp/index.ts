import hpMpr from './hpMpr';
import hpHeart from './hpHeart';
import hpMN from './hpMN';
import hpBreast from './hpBreast';
import ConfigPoint from "config-point";

const hangingProtocols = ConfigPoint.createConfiguration("hpExtensionHangingProtocols",
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
  });

export default function getHangingProtocolModule() {
  return hangingProtocols.hangingProtocols;
}
