import hpMpr from './hpMpr';
import hpHeart from './hpHeart';
import hpMN from './hpMN';
import hpBreast from './hpBreast';
import hpVolume from './hpVolume';
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
      {
        name: 'Volume',
        protocols: hpVolume,
      },
    ],
  });

export default function getHangingProtocolModule() {
  return hangingProtocols.hangingProtocols;
}
