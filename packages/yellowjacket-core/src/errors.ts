export class YellowJacketError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "YellowJacketError";
  }
}

export class InvalidStateTransitionError extends YellowJacketError {
  constructor(fromState: string | null, toState: string) {
    super(`Invalid YellowJacket state transition: ${fromState ?? "null"} -> ${toState}`);
    this.name = "InvalidStateTransitionError";
  }
}

export class PermissionEnvelopeError extends YellowJacketError {
  constructor(message: string) {
    super(message);
    this.name = "PermissionEnvelopeError";
  }
}
