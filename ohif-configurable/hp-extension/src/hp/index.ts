import hpHeart from './hpHeart';
import hpMN from './hpMN';
import hpBreast from './hpBreast';
import hpVolume from './hpVolume';
import hpCompare from './hpCompare';
import ConfigPoint from "config-point";

console.log("hpVolume=", hpVolume);

const hangingProtocols = ConfigPoint.createConfiguration("hpExtensionHangingProtocols",
  {
    hangingProtocols: [
      {
        id: '@radicalimaging/hp-extension.breast',
        protocol: hpBreast,
      },
      {
        id: '@radicalimaging/hp-extension.heart',
        protocol: hpHeart,
      },
      {
        id: '@radicalimaging/hp-extension.mn',
        protocol: hpMN[0],
      },
      // TODO - combine this with the base MN by adding multiple stages, just doesn't work yet.
      {
        id: '@radicalimaging/hp-extension.mn1',
        protocol: hpMN[1],
      },
      {
        id: '@radicalimaging/hp-extension.volume',
        protocol: hpVolume,
      },
      // Multi-study comparisons
      {
        id: '@radicalimaging/hp-extension.compare',
        protocol: hpCompare,
      },
    ],
  });

export default function getHangingProtocolModule() {
  return hangingProtocols.hangingProtocols;
}
