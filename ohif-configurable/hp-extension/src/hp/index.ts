import hpHeart from './hpHeart';
import hpMN from './hpMN';
import hpBreast from './hpBreast';
import hpVolume from './hpVolume';
import ConfigPoint from "config-point";

console.log("hpVolume=", hpVolume);

const hangingProtocols = ConfigPoint.createConfiguration("hpExtensionHangingProtocols",
  {
    // Include both protocols list and new list
    hangingProtocols: [
      {
        id: '@radicalimaging/hp-extension.breast',
        protocols: [hpBreast],
        protocol: hpBreast,
      },
      {
        id: '@radicalimaging/hp-extension.heart',
        protocols: [hpHeart],
        protocol: hpHeart,
      },
      {
        id: '@radicalimaging/hp-extension.mn',
        protocols: hpMN,
        protocol: hpMN[0],
      },
      // TODO - combine this with the base MN by adding multiple stages, just doesn't work yet.
      {
        id: '@radicalimaging/hp-extension.mn1',
        protocols: [],
        protocol: hpMN[1],
      },
      {
        id: '@radicalimaging/hp-extension.volume',
        protocols: [hpVolume],
        protocol: hpVolume,
      },
    ],
  });

export default function getHangingProtocolModule() {
  return hangingProtocols.hangingProtocols;
}
