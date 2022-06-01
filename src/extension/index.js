import { clock } from './clock'
import { schedule } from './schedule'
import { messages } from './messages'

export default function mod (nodecg) {
  clock(nodecg)
  schedule(nodecg)
  messages(nodecg)
}