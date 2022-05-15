import { clock } from './clock'
import { schedule } from './schedule'

export default function mod (nodecg) {
  clock(nodecg)
  schedule(nodecg)
}