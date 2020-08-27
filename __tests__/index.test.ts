import { createHelmetPrehandler } from '../src';

const requestSymbol = Symbol.for('tuft.incomingMessage');
const responseSymbol = Symbol.for('tuft.serverResponse');

const mockRequest = {};

const mockResponse: any = {
  _headers: {
    ['X-Powered-By']: 'Tuft',
  },
  setHeader: jest.fn((name, value) => {
    mockResponse._headers[name] = value;
    return mockResponse;
  }),
  removeHeader: jest.fn(name => {
    delete mockResponse._headers[name];
    return mockResponse;
  }),
};

const mockTuftContext: any = {
  [requestSymbol]: mockRequest,
  [responseSymbol]: mockResponse,
};

const expectedHeaders: { [key: string]: string } = {
  'Content-Security-Policy': 'default-src \'self\';base-uri \'self\';block-all-mixed-content;font-src \'self\' https: data:;frame-ancestors \'self\';img-src \'self\' data:;object-src \'none\';script-src \'self\';script-src-attr \'none\';style-src \'self\' https: \'unsafe-inline\';upgrade-insecure-requests',
  'X-DNS-Prefetch-Control': 'off',
  'Expect-CT': 'max-age=0',
  'X-Frame-Options': 'SAMEORIGIN',
  'Strict-Transport-Security': 'max-age=15552000; includeSubDomains',
  'X-Download-Options': 'noopen',
  'X-Content-Type-Options': 'nosniff',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Referrer-Policy': 'no-referrer',
  'X-XSS-Protection': '0'
};

/**
 * createHelmetPrehandler()
 */

describe('Calling createHelmetPrehandler()', () => {
  test('returns a function named \'helmetPrehandler\'', () => {
    const result = createHelmetPrehandler();
    expect(typeof result).toBe('function');
    expect(result.name).toBe('helmetPrehandler');
  });
});

/**
 * helmetPrehandler()
 */

const helmetPrehander = createHelmetPrehandler();

describe('When `helmetPrehander()` is passed a mock Tuft context', () => {
  test('the expected headers are added to the response', async () => {
    const result = helmetPrehander(mockTuftContext);

    await expect(result).resolves.toBeUndefined();

    for (const name in expectedHeaders) {
      const value: string = expectedHeaders[name];
      expect(mockResponse.setHeader).toHaveBeenCalledWith(name, value);
    }

    expect(mockResponse.removeHeader).toHaveBeenCalledWith('X-Powered-By');
  });
});
