import { trace } from "./trace"
import { tracer } from "./tracer"

export const meiosisTracer = params => {
  if (params.streams != null) {
    trace(params)
  }
  if (params.selector != null) {
    return tracer(params)
  }
}
