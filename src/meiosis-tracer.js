import { trace } from "./trace"
import { tracer } from "./tracer"

export const meiosisTracer = params => {
  trace(params)
  tracer(params)
}
