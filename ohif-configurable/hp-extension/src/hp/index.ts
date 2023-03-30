import hpHeart from './hpHeart';
import hpMN from './hpMN';
import hpBreast from './hpBreast';
import hpVolume from './hpVolume';
import hpCompare from './hpCompare';
import ConfigPoint from "config-point";

const hangingProtocols = ConfigPoint.createConfiguration("hpExtensionHangingProtocols",
  {
    hangingProtocols: [
      {
        name: '@radicalimaging/hp-extension.breast',
        protocol: hpBreast,
      },
      {
        name: '@radicalimaging/hp-extension.heart',
        protocol: hpHeart,
      },
      {
        name: '@radicalimaging/hp-extension.mn',
        protocol: hpMN,
      },
      {
        name: '@radicalimaging/hp-extension.volume',
        protocol: hpVolume,
      },
      // Multi-study comparisons
      {
        name: '@radicalimaging/hp-extension.compare',
        protocol: hpCompare,
      },
    ],
  });

export default function getHangingProtocolModule() {
  return hangingProtocols.hangingProtocols;
}
