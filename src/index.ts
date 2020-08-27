import type { IncomingMessage, ServerResponse } from 'http';
import type { TuftContext } from 'tuft';

import helmet from 'helmet';
import { promisify } from 'util';

/**
 * Type declarations for Helmet options come from the Helmet respository at:
 * https://github.com/helmetjs/helmet
 *
 * They can be removed if the Helmet library starts exporting these declarations
 * in a future release.
 */

interface ContentSecurityPolicyDirectiveValueFunction {
  (req: IncomingMessage, res: ServerResponse): string;
}

type ContentSecurityPolicyDirectiveValue =
  | string
  | ContentSecurityPolicyDirectiveValueFunction;

interface ContentSecurityPolicyDirectives {
  [directiveName: string]: Iterable<ContentSecurityPolicyDirectiveValue>;
}

interface ContentSecurityPolicyOptions {
  directives?: ContentSecurityPolicyDirectives;
  reportOnly?: boolean;
}

interface XDnsPrefetchControlOptions {
  allow?: boolean;
}

interface ExpectCtOptions {
  maxAge?: number;
  enforce?: boolean;
  reportUri?: string;
}

interface XFrameOptionsOptions {
  action?: string;
}

interface StrictTransportSecurityOptions {
  maxAge?: number;
  includeSubDomains?: boolean;
  preload?: boolean;
}

interface XPermittedCrossDomainPoliciesOptions {
  permittedPolicies?: string;
}

interface ReferrerPolicyOptions {
  policy?: string | string[];
}

type MiddlewareOption<T> = false | T;

interface HelmetOptions {
  contentSecurityPolicy?: MiddlewareOption<ContentSecurityPolicyOptions>;
  dnsPrefetchControl?: MiddlewareOption<XDnsPrefetchControlOptions>;
  expectCt?: MiddlewareOption<ExpectCtOptions>;
  frameguard?: MiddlewareOption<XFrameOptionsOptions>;
  hidePoweredBy?: MiddlewareOption<never>;
  hsts?: MiddlewareOption<StrictTransportSecurityOptions>;
  ieNoOpen?: MiddlewareOption<never>;
  noSniff?: MiddlewareOption<never>;
  permittedCrossDomainPolicies?: MiddlewareOption<
    XPermittedCrossDomainPoliciesOptions
  >;
  referrerPolicy?: MiddlewareOption<ReferrerPolicyOptions>;
  xssFilter?: MiddlewareOption<never>;
}

const requestSymbol = Symbol.for('tuft.incomingMessage');
const responseSymbol = Symbol.for('tuft.serverResponse');

export function createHelmetPrehandler(options?: Readonly<HelmetOptions>) {
  const helmetAsync = promisify(helmet(options));

  return async function helmetPrehandler(t: TuftContext) {
    //@ts-expect-error - TS does not support detecting global symbols
    const request: IncomingMessage = t[requestSymbol];
    //@ts-expect-error - TS does not support detecting global symbols
    const response: ServerResponse = t[responseSymbol];

    await helmetAsync(request, response);
  };
}
